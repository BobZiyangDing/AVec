import { useState } from "react"
import { invalidateQuery, useMutation } from "blitz"
import CreateAddress from "../mutations/createAddress"
import {
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
} from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import ClearIcon from "@material-ui/icons/Clear"
import getAddresses from "app/addresses/queries/getAddresses"

type createAddressFormProps = {
  onSuccess?: () => void
  onAbort?: () => void
}

export const CreateAddressForm = (props: createAddressFormProps) => {
  const [addressName, setAddressName] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [zip, setZip] = useState("")

  const [CreateAddressMutation] = useMutation(CreateAddress, {
    onSuccess: async () => {
      await invalidateQuery(getAddresses)
    },
  })

  return (
    <div>
      <Grid item>
        <Paper elevation={3}>
          <CardHeader
            title={"Create New Address"}
            action={
              <IconButton
                aria-label="clear"
                onClick={async () => {
                  await props.onAbort?.()
                }}
              >
                <ClearIcon />
              </IconButton>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs>
                <h3>Name Your Address</h3>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  variant="filled"
                  label="Address Name"
                  value={addressName}
                  color="primary"
                  onChange={(e) => setAddressName(e.target.value)}
                />
              </Grid>
            </Grid>
            <br />

            <Grid container spacing={0}>
              <Grid item xs>
                <h3>Enter Address Details</h3>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  label="区、街道、楼房、房间号"
                  variant="filled"
                  value={streetAddress}
                  fullWidth
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <TextField
                  label="城市"
                  variant="filled"
                  value={city}
                  fullWidth
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="省"
                  variant="filled"
                  fullWidth
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="邮编"
                  variant="filled"
                  fullWidth
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              onClick={async () => {
                await CreateAddressMutation({
                  name: addressName,
                  streetAddress: streetAddress,
                  city: city,
                  province: province,
                  zip: zip,
                })
                await props.onSuccess?.()
              }}
            >
              Save
            </Button>
          </CardActions>
        </Paper>
      </Grid>
    </div>
  )
}

export default CreateAddressForm
