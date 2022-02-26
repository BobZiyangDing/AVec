import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined"
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined"

const IconStyle = {
  color: "#EFEBE9",
}

export const SideBarData = [
  {
    title: "Home",
    path: "/",
    icon: <DashboardOutlinedIcon style={IconStyle} />,
  },
  {
    title: "Make New Order",
    path: "/makeNewOrder",
    icon: <AddShoppingCartOutlinedIcon style={IconStyle} />,
  },
  {
    title: "Manage Order",
    path: "/manageOrder",
    icon: <ShoppingCartOutlinedIcon style={IconStyle} />,
  },
]
