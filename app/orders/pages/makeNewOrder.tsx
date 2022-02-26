import { BlitzPage } from "blitz"
import Checkout from "app/orders/components/createNewOrderForm/Checkout"
import DashboardLayout from "app/core/layouts/DashboardLayout"

const MakeNewOrderPage: BlitzPage = () => {
  return (
    <div>
      <Checkout />
    </div>
  )
}

// MakeNewOrderPage.redirectAuthenticatedTo = "/"
MakeNewOrderPage.authenticate = {
  redirectTo: "/login",
}
MakeNewOrderPage.getLayout = (page) => (
  <DashboardLayout title="Make New Order">{page}</DashboardLayout>
)

export default MakeNewOrderPage
