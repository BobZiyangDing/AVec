import React from "react"
import { Theme, createStyles, makeStyles, withStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import { Grid, Box, Backdrop, Container, Button } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { useQuery } from "blitz"
import { useState } from "react"
import getAddresses from "app/addresses/queries/getAddresses"
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined"
import CreateAddressForm from "./createAddressForm"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
)

export default function AddressTable() {
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const classes = useStyles()
  const [addresses] = useQuery(getAddresses, undefined)

  const handleClose = () => {
    setOpenBackdrop(false)
  }
  const handleToggle = () => {
    setOpenBackdrop(!openBackdrop)
  }

  return (
    <div className={classes.root}>
      <div>
        <>
          {addresses.map((address) => (
            <Accordion elevation={1}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{address.name}</Typography>
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
          ))}
        </>
        <br />
        <Button color="primary" startIcon={<AddBoxOutlinedIcon />} onClick={handleToggle}>
          Add New Address
        </Button>
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
