import * as React from "react"
import Box from "@material-ui/core/Box"
import {
  Grid,
  Paper,
  Button,
  Divider,
  CardContent,
  CardHeader,
  Backdrop,
  Radio,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import MuiAccordion from "@material-ui/core/Accordion"
import MuiAccordionSummary from "@material-ui/core/AccordionSummary"
import MuiAccordionDetails from "@material-ui/core/AccordionDetails"
import { useQuery } from "blitz"
import getAddresses from "../queries/getAddresses"
import { AddressType } from "./type"
import { useState } from "react"
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined"
import CreateAddressForm from "./createAddressForm"
import { Container } from "react-bootstrap"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails)

type AddressCardInputType = {
  selectedAddress: AddressType
  address: AddressType
  onClick: any
}

export function AddressRow(props: AddressCardInputType) {
  const address = props.address

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box fontWeight="fontWeightBold" fontSize={16}>
          <Radio onClick={() => props.onClick(address)} />
          {address.name.toString()}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item xs>
          <Box fontSize="fontSize">
            <strong>Address line 1: </strong>
            {address.streetAddress}
          </Box>
          <Box fontSize="fontSize">
            <strong>Address line 2: </strong>
            {[address.city, address.province, address.zip].join(", ")}
          </Box>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

type AddressTablePropsType = {
  onSelect: any
  selectedAddress: AddressType
}

export default function SelectAddressTable(props: AddressTablePropsType) {
  const [openBackdrop, setOpenBackdrop] = useState(false)

  const handleClose = () => {
    setOpenBackdrop(false)
  }
  const handleToggle = () => {
    setOpenBackdrop(!openBackdrop)
  }

  const [addresses] = useQuery(getAddresses, undefined)

  return (
    <div>
      <div>
        <Paper variant="outlined">
          <CardHeader title={"Select Address"} color="#3E2723" />
          <Divider />
          <>
            {addresses.map((address) => (
              <AddressRow address={address} onClick={props.onSelect} />
            ))}
          </>
          <CardContent>
            <Button color="primary" startIcon={<AddBoxOutlinedIcon />} onClick={handleToggle}>
              Add New Address
            </Button>
          </CardContent>
        </Paper>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        style={{ zIndex: 2 }}
      >
        <Container>
          <CreateAddressForm onSuccess={handleClose} onAbort={handleClose} />
        </Container>
      </Backdrop>
    </div>
  )
}
