import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

import { useState } from "react"

import CreateOrderForm from "./createOrderForm"
import AttachAddressForm from "./attachAddressForm"
import ReviewAndPayForm from "./reviewAndPayForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { throughputChoices } from "app/core/components/orderRule/throughputChoices"
import { priceDic } from "app/core/components/orderRule/orderPrice"
import PaymentApp from "./paymentApp/paymentApp"

import { invalidateQuery, useMutation } from "blitz"
import CreateOrder from "app/orders/mutations/createOrder"
import getOrders from "app/orders/queries/getOrders"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        A. Vec
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const steps = ["Create Order", "Attach Address", "Review your order", "Payment"]

function getStepContent(step, hooks) {
  switch (step) {
    case 0:
      return <CreateOrderForm hooks={hooks} />
    case 1:
      return <AttachAddressForm hooks={hooks} />
    case 2:
      return <ReviewAndPayForm hooks={hooks} />
    case 3:
      return <PaymentApp />
    default:
      throw new Error("Unknown step")
  }
}

type CheckoutProps = {
  onSuccess?: () => void
}

export default function Checkout(props: CheckoutProps) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

  const [CreateOrderMutation] = useMutation(CreateOrder, {
    onSuccess: async () => {
      await invalidateQuery(getOrders)
    },
  })

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  //=================== Hooks and States =======================

  //============ Order Page =======================
  const [orderName, setOrderName] = useState("My Order Name")
  const [ecoliType, setEcoliType] = useState("DH10B")
  const [condition, setCondition] = useState("250ml LB 37°C")
  const [throughputIdx, setThroughputIdx] = useState(1)
  const [description, setDescription] = useState("")
  const [GOI, setGOI] = useState("")
  const [seqType, setSeqType] = useState("DNA Sequence")
  const [hasDataplot, setHasDataplot] = useState(false)
  const [hasDataset, setHasDataset] = useState(false)
  const [hasModel, setHasModel] = useState(false)
  const [needSynth, setNeedSynth] = useState(true)

  //============ Address Page =======================
  const [selectedAddress, setSelectedAddress] = useState()

  //============ dependent states====================
  const currentUser = useCurrentUser()
  const userVersion = currentUser.version
  const throughputMarks = throughputChoices[userVersion]

  const throughput = throughputMarks[throughputIdx].label

  const GetOrderPriceInput = {
    throughput: throughput,
    hasDataplot: hasDataplot,
    hasDataset: hasDataset,
    hasModel: hasModel,
    needSynth: needSynth,
    userVersion: userVersion,
  }

  type getOrderPriceInputType = {
    throughput: any
    hasDataplot: boolean
    hasDataset: boolean
    hasModel: boolean
    needSynth: boolean
    userVersion: string
  }

  function getOrderPrice(orderInput: getOrderPriceInputType) {
    const throughput = orderInput.throughput
    const hasDataplot = orderInput.hasDataplot
    const hasDataset = orderInput.hasDataset
    const hasModel = orderInput.hasModel
    const needSynth = orderInput.needSynth
    const userVersion = orderInput.userVersion

    const throughputChoice = throughputChoices[userVersion]

    if (throughputChoice[throughputChoice.length - 1].label === throughput) return "SUPER_ORDER"

    const orderPriceMenuList = priceDic[userVersion]
    const orderPriceMenu = orderPriceMenuList[throughput]

    if (orderPriceMenu) {
      let price = orderPriceMenu.topSeq
      price += needSynth ? orderPriceMenu.synth : 0
      price += hasDataplot ? orderPriceMenu.dataplot : 0
      price += hasDataset ? orderPriceMenu.dataset : 0
      price += hasModel ? orderPriceMenu.model : 0

      return {
        topSeq: orderPriceMenu.topSeq,
        synth: needSynth ? orderPriceMenu.synth : 0,
        dataplot: hasDataplot ? orderPriceMenu.dataplot : 0,
        dataset: hasDataset ? orderPriceMenu.dataset : 0,
        model: hasModel ? orderPriceMenu.model : 0,
        total: price,
      }
    }

    return "ERROR"
  }

  function generateOrderNumber() {
    let now = Date.now().toString() // '1492341545873'
    now += now + Math.floor(Math.random() * 10) // pad with extra random digit
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join("-") // format
  }

  const price = getOrderPrice(GetOrderPriceInput)
  const orderNumber = generateOrderNumber()

  //============ Pack all the hooks =======================
  const hooks = {
    // States
    orderName: orderName,
    orderNumber: orderNumber,
    ecoliType: ecoliType,
    condition: condition,
    throughputIdx: throughputIdx,
    description: description,
    GOI: GOI,
    seqType: seqType,
    hasDataplot: hasDataplot,
    hasDataset: hasDataset,
    hasModel: hasModel,
    needSynth: needSynth,
    selectedAddress: selectedAddress,
    price: price,

    // Methods
    setOrderName: setOrderName,
    setEcoliType: setEcoliType,
    setCondition: setCondition,
    setThroughputIdx: setThroughputIdx,
    setDescription: setDescription,
    setGOI: setGOI,
    setSeqType: setSeqType,
    setHasDataplot: setHasDataplot,
    setHasDataset: setHasDataset,
    setHasModel: setHasModel,
    setNeedSynth: setNeedSynth,
    setSelectedAddress: setSelectedAddress,
  }

  //=================== Hooks and States =======================

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order named <strong>{orderName}</strong> has been placed. We have emailed
                  your order confirmation. Please check the Manage Order tab to access or inquire
                  your order.
                </Typography>
                <br />
                <Button href="/manageOrder" color="primary" variant="contained">
                  Manage Order
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, hooks)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep !== steps.length - 1
                        ? handleNext
                        : async () => {
                            await CreateOrderMutation({
                              name: orderName,
                              number: orderNumber,
                              goi: GOI,
                              throughput: throughput,
                              ecoliType: ecoliType,
                              condition: condition,
                              description: description,
                              needSynth: needSynth,
                              seqType: seqType,
                              hasDataplot: hasDataplot,
                              hasDataset: hasDataset,
                              hasModel: hasModel,
                              price: price.total,
                              addressId: selectedAddress.id,
                            })
                            setActiveStep(activeStep + 1)
                            await props.onSuccess?.()
                          }
                    }
                    className={classes.button}
                    disabled={
                      (activeStep === 0 && throughputIdx === throughputMarks.length - 1) ||
                      (activeStep === 1 && !selectedAddress)
                    }
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}
