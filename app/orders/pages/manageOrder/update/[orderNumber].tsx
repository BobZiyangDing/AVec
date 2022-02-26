import DashboardLayout from "app/core/layouts/DashboardLayout"
import UpdateOrderForm from "app/orders/components/updateOrderForm_admin"

const OrderInfoPage = () => {
  return (
    <div>
      <UpdateOrderForm />
    </div>
  )
}

OrderInfoPage.authenticate = {
  redirectTo: "/login",
}
OrderInfoPage.getLayout = (page) => <DashboardLayout title="Manage Order">{page}</DashboardLayout>

export default OrderInfoPage
