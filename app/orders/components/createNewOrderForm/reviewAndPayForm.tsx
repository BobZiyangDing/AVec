// import { useState } from "react"
// import { useQuery } from "blitz"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

import { Grid, List, Box, ListItem, ListItemText, Typography } from "@material-ui/core"
import { priceDic } from "app/core/components/orderRule/orderPrice"
import { throughputChoices } from "app/core/components/orderRule/throughputChoices"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
]
const addresses = ["1 Material-UI Drive", "Reactville", "Anytown", "99999", "USA"]

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}))

type ReviewAndPayFormType = {
  onSuccess?: () => void
  hooks: any
}

export const ReviewAndPayForm = (props: ReviewAndPayFormType) => {
  const classes = useStyles()

  const selectedAddress = props.hooks.selectedAddress

  const orderName = props.hooks.orderName
  const ecoliType = props.hooks.ecoliType
  const condition = props.hooks.condition
  const throughputIdx = props.hooks.throughputIdx
  const hasDataplot = props.hooks.hasDataplot
  const hasDataset = props.hooks.hasDataset
  const hasModel = props.hooks.hasModel
  const needSynth = props.hooks.needSynth
  const price = props.hooks.price

  const currentUser = useCurrentUser()
  const userVersion = currentUser.version
  const throughputMarks = throughputChoices[userVersion]
  const throughput = throughputMarks[throughputIdx].label

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Typography gutterBottom>Order Name: {orderName}</Typography>
      <Typography gutterBottom>Experiment Condition: {condition}</Typography>
      <Typography gutterBottom>Ecoli Type: {ecoliType}</Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary={"Top Expression Sequence"}
            secondary={"Throughput = " + throughput}
          />
          <Typography variant="body2">{"￥" + price.topSeq}</Typography>
        </ListItem>

        {needSynth && (
          <ListItem className={classes.listItem}>
            <ListItemText primary={"Sequence Synthesis"} secondary={"Throughput = " + throughput} />
            <Typography variant="body2">{"￥" + price.synth}</Typography>
          </ListItem>
        )}

        {hasDataplot && (
          <ListItem className={classes.listItem}>
            <ListItemText primary={"Ranked Dataplot"} secondary={"Throughput = " + throughput} />
            <Typography variant="body2">{"￥" + price.dataplot}</Typography>
          </ListItem>
        )}
        {hasDataset && (
          <ListItem className={classes.listItem}>
            <ListItemText primary={"Full Dataset"} secondary={"Throughput = " + throughput} />
            <Typography variant="body2">{"￥" + price.dataset}</Typography>
          </ListItem>
        )}
        {hasModel && (
          <ListItem className={classes.listItem}>
            <ListItemText primary={"Custom Model"} secondary={"Throughput = " + throughput} />
            <Typography variant="body2">{"￥" + price.model}</Typography>
          </ListItem>
        )}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {"￥" + price.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Address
          </Typography>
          <Box fontWeight="fontWeightBold" color="textSecondary">
            {selectedAddress ? selectedAddress.streetAddress : "Select Address "}
          </Box>
          <Box fontWeight="fontWeightBold" color="textSecondary">
            {selectedAddress
              ? [selectedAddress.city, selectedAddress.province, selectedAddress.zip].join(", ")
              : "for Potential Delivery"}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ReviewAndPayForm
