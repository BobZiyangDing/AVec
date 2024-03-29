import React, { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Container } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import styles from "style/paymentApp.module.css"

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const user = useCurrentUser()
  const [email, setEmail] = useState(user.email)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <CardElement id={styles["card-element"]} options={cardStyle} onChange={handleChange} />
        <button
          className={styles.button}
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className={styles["card-error"]} role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? styles["result-message"] : styles["result-message"]}>
          Payment succeeded, see the result in your
          <a className={styles.a} href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
    </Container>
  )
}
