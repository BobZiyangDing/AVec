import SelectAddressTable from "app/addresses/components/selectAddressTable"

import { Grid, Box } from "@material-ui/core"

type attachAddressFormProps = {
  onSuccess?: () => void
  hooks: any
}

export const AttachAddressForm = (props: attachAddressFormProps) => {
  const selectedAddress = props.hooks.selectedAddress
  const setSelectedAddress = props.hooks.setSelectedAddress

  return (
    <div>
      <Grid item>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Box fontWeight="fontWeightBold" color="textSecondary">
            {selectedAddress ? selectedAddress.streetAddress : "Select Address "}
          </Box>
          <Box fontWeight="fontWeightBold" color="textSecondary">
            {selectedAddress
              ? [selectedAddress.city, selectedAddress.province, selectedAddress.zip].join(", ")
              : "for Potential Delivery"}
          </Box>
        </Grid>
        <Box
          justifyContent="center"
          paddingLeft="15%"
          paddingRight="15%"
          paddingBottom={3}
          paddingTop={3}
        >
          <SelectAddressTable onSelect={setSelectedAddress} selectedAddress={selectedAddress} />
        </Box>
      </Grid>
    </div>
  )
}

export default AttachAddressForm
