import React from "react"
import {
  Box,
  CardContent,
  FormControlLabel,
  TextField,
  Slider,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  Radio,
  Switch,
  Typography,
  Divider,
  Grid,
  Button,
  Paper,
  CardActions,
} from "@material-ui/core"
import { useState } from "react"
import { useQuery, useParam, useMutation, Router, invalidateQuery } from "blitz"
import getOrderByNumber from "app/orders/queries/getOrderByNumber"
import { throughputChoices } from "app/core/components/orderRule/throughputChoices"
import { OrderStatusMap } from "./statusBar/orderStatusMap"
import UpdateOrder from "../mutations/updateOrder"
import getOrders from "app/orders/queries/getOrders"
import DeleteOrder from "../mutations/deleteOrder"

type UpdateOrderFormProps = {
  onSuccess?: () => void
}

export default function UpdateOrderForm(props: UpdateOrderFormProps) {
  const [UpdateOrderMutation] = useMutation(UpdateOrder, {
    onSuccess: async () => {
      await invalidateQuery(getOrders)
    },
  })
  const [DeleteOrderMutation] = useMutation(DeleteOrder, {
    onSuccess: async () => {
      await invalidateQuery(getOrders)
    },
  })

  const orderNumber = useParam("orderNumber")
  const [order] = useQuery(getOrderByNumber, { orderNumber: orderNumber })
  if (!order) return

  const user = order.owner
  const userVersion = user.version
  const throughputMarks = throughputChoices[userVersion]

  const [orderName, setOrderName] = useState(order.name) // eslint-disable-line react-hooks/rules-of-hooks
  const [ecoliType, setEcoliType] = useState(order.ecoliType) // eslint-disable-line react-hooks/rules-of-hooks
  const [condition, setCondition] = useState(order.condition) // eslint-disable-line react-hooks/rules-of-hooks
  const [throughputIdx, setThroughputIdx] = useState(
    throughputMarks.findIndex((x) => x.label === order.throughput)
  ) // eslint-disable-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState(order.status) // eslint-disable-line react-hooks/rules-of-hooks
  const [description, setDescription] = useState(order.description) // eslint-disable-line react-hooks/rules-of-hooks
  const [GOI, setGOI] = useState(order.goi) // eslint-disable-line react-hooks/rules-of-hooks
  const [seqType, setSeqType] = useState(order.seqType) // eslint-disable-line react-hooks/rules-of-hooks
  const [hasDataplot, setHasDataplot] = useState(order.hasDataplot) // eslint-disable-line react-hooks/rules-of-hooks
  const [hasDataset, setHasDataset] = useState(order.hasDataset) // eslint-disable-line react-hooks/rules-of-hooks
  const [hasModel, setHasModel] = useState(order.hasModel) // eslint-disable-line react-hooks/rules-of-hooks
  const [needSynth, setNeedSynth] = useState(order.needSynth) // eslint-disable-line react-hooks/rules-of-hooks
  const price = order.price

  return (
    <div>
      <Paper>
        <Grid item>
          <CardContent>
            <Grid container spacing={0} justify="flex-end">
              <Grid item xs>
                <Grid container spacing={0}>
                  <Grid item xs>
                    <h3>Enter Order Details</h3>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <TextField
                      variant="filled"
                      label="Order Name"
                      color="primary"
                      required
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Box alignContent="center">
                  <Typography variant="h3" color="textSecondary">
                    {price}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box
              justifyContent="center"
              paddingLeft="25%"
              paddingRight="25%"
              paddingBottom={2}
              paddingTop={2}
            >
              <br />
              <FormLabel component="legend">Throughput</FormLabel>
              <Slider
                defaultValue={20}
                value={throughputIdx}
                getAriaValueText={(value: number) => `N=${value}`}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="off"
                onChange={(e, value) => setThroughputIdx(value)}
                step={1}
                marks={throughputMarks}
                min={0}
                disabled={true}
                max={throughputMarks.length - 1}
              />
            </Box>

            <Box justifyContent="center" paddingRight="10%">
              <FormLabel component="legend">Current Status</FormLabel>
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                row
              >
                {Object.keys(OrderStatusMap).map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
            </Box>
            <br />

            <Grid container spacing={3}>
              <Grid item xs>
                <FormLabel component="legend">E. Coli Type</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={ecoliType}
                  onChange={(e) => setEcoliType(e.target.value)}
                >
                  {["DH5a", "DH10B", "BL21(DE3)"].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs>
                <FormLabel component="legend">Experiment Condition</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  {["250ml LB 37\u00B0C", "250ml LB 30\u00B0C"].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs>
                <FormLabel component="legend">Results to Order</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        checked
                        disabled
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    }
                    label="Top Sequence"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        onChange={(e) => setHasDataplot(e.target.checked)}
                        disabled={true}
                        checked={hasDataplot}
                      />
                    }
                    label="Ranked Dataplot"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        onChange={(e) => setHasDataset(e.target.checked)}
                        disabled={true}
                        checked={hasDataset}
                      />
                    }
                    label="Full Dataset"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        onChange={(e) => setHasModel(e.target.checked)}
                        disabled={true}
                        checked={hasModel}
                      />
                    }
                    label="Custom Model"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs>
                <h3>Enter Sequence (GOI) Detail</h3>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <FormLabel component="legend">Sequence Type</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={seqType}
                  onChange={(e) => setSeqType(e.target.value)}
                  row
                >
                  {["DNA Sequence", "Protein Sequence"].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs>
                <FormLabel component="legend">Need DNA Synthesis?</FormLabel>
                <Switch checked={needSynth} onChange={(e) => setNeedSynth(e.target.checked)} />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  label="Sequence of Interest"
                  variant="filled"
                  fullWidth
                  required
                  value={GOI}
                  onChange={(e) => setGOI(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  label="Description"
                  variant="filled"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={6}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              await UpdateOrderMutation({
                id: order.id,
                name: orderName,
                number: order.number,
                goi: GOI,
                throughput: order.throughput,
                ecoliType: ecoliType,
                condition: condition,
                description: description,
                seqType: seqType,
                needSynth: needSynth,
                hasDataplot: hasDataplot,
                hasDataset: hasDataset,
                hasModel: hasModel,
                price: price,
                status: status,
              })
              await props.onSuccess?.()
              Router.push("/manageOrder")
            }}
          >
            Update
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={async () => {
              await DeleteOrderMutation({
                id: order.id,
              })
              await props.onSuccess?.()
              Router.push("/manageOrder")
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Paper>
    </div>
  )
}
