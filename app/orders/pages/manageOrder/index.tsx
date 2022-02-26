import { BlitzPage } from "blitz"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import OrderTable from "app/orders/components/orderTable"
import OrderTableAdmin from "app/orders/components/orderTable_admin"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import React from "react"
import { Grid, Button, Container } from "@material-ui/core"
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded"

const ManageOrderPage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const isAdmin = currentUser.role === "ADMIN"

  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button
              href="/makeNewOrder"
              variant="contained"
              color="primary"
              startIcon={<AddBoxRoundedIcon />}
            >
              Make New Order
            </Button>
          </Grid>
          <br />
          <Grid item xs={12}>
            {isAdmin ? <OrderTableAdmin /> : <OrderTable />}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

ManageOrderPage.authenticate = {
  redirectTo: "/login",
}
ManageOrderPage.getLayout = (page) => <DashboardLayout title="Manage Order">{page}</DashboardLayout>

export default ManageOrderPage
