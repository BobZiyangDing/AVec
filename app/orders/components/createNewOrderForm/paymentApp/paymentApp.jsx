import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { Container } from "@material-ui/core"

const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

export default function PaymentApp() {
  return (
    <div className="PaymentApp">
      <Container>
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </Container>
    </div>
  )
}
