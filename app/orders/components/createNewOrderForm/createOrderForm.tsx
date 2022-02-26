import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { throughputChoices } from "app/core/components/orderRule/throughputChoices"
import {
  disabledDataplot,
  disabledDataset,
  disabledModel,
} from "app/core/components/orderRule/disabledResultChoice"

import {
  Box,
  CardContent,
  Checkbox,
  Grid,
  Typography,
  TextField,
  FormLabel,
  Slider,
  RadioGroup,
  Radio,
  FormControlLabel,
  Switch,
  FormGroup,
} from "@material-ui/core"

type createAddressFormProps = {
  onSuccess?: () => void
  hooks: any
}

export const CreateOrderForm = (props: createAddressFormProps) => {
  const currentUser = useCurrentUser()
  const userVersion = currentUser.version
  const throughputMarks = throughputChoices[userVersion]

  const orderName = props.hooks.orderName
  const ecoliType = props.hooks.ecoliType
  const condition = props.hooks.condition
  const throughputIdx = props.hooks.throughputIdx
  const description = props.hooks.description
  const GOI = props.hooks.GOI
  const seqType = props.hooks.seqType
  const hasDataplot = props.hooks.hasDataplot
  const hasDataset = props.hooks.hasDataset
  const hasModel = props.hooks.hasModel
  const needSynth = props.hooks.needSynth
  const price = props.hooks.price

  const setOrderName = props.hooks.setOrderName
  const setEcoliType = props.hooks.setEcoliType
  const setCondition = props.hooks.setCondition
  const setThroughputIdx = props.hooks.setThroughputIdx
  const setDescription = props.hooks.setDescription
  const setGOI = props.hooks.setGOI
  const setSeqType = props.hooks.setSeqType
  const setHasDataplot = props.hooks.setHasDataplot
  const setHasDataset = props.hooks.setHasDataset
  const setHasModel = props.hooks.setHasModel
  const setNeedSynth = props.hooks.setNeedSynth

  const dataplotDisabled = disabledDataplot(throughputIdx, userVersion)
  const datasetDisabled = disabledDataset(throughputIdx, userVersion)
  const modelDisabled = disabledModel(throughputIdx, userVersion)

  return (
    <div>
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
                  {price.total}
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
              max={throughputMarks.length - 1}
            />
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
                      disabled={dataplotDisabled}
                      checked={hasDataplot && !dataplotDisabled}
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
                      disabled={datasetDisabled}
                      checked={hasDataset && !datasetDisabled}
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
                      disabled={modelDisabled}
                      checked={hasModel && !modelDisabled}
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
    </div>
  )
}

export default CreateOrderForm
