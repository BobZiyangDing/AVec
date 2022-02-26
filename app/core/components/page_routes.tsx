import MakeNewOrderPage from "app/orders/pages/makeNewOrder"
import ManageOrderPage from "app/orders/pages/manageOrder"
import OrderInfoPage from "app/orders/pages/manageOrder/[orderNumber]"

export const routes = [
  { path: "/makeNewOrder", name: "MakeNewOrder", component: MakeNewOrderPage },
  { path: "/manageOrder", name: "ManageOrder", component: ManageOrderPage },
  { path: "/manageOrder/[orderNumber]", name: "OrderInfo", component: OrderInfoPage },
]
