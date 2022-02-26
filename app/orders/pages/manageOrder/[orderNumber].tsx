import DashboardLayout from "app/core/layouts/DashboardLayout"

import OrderInfoForm from "app/orders/components/orderInfoForm"

const OrderInfoPage = () => {
  return (
    <div>
      <OrderInfoForm />
    </div>
  )
}

OrderInfoPage.authenticate = {
  redirectTo: "/login",
}
OrderInfoPage.getLayout = (page) => <DashboardLayout title="Manage Order">{page}</DashboardLayout>

export default OrderInfoPage
