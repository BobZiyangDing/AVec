import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Menu, { MenuProps } from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined"
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined"
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined"
import { Link } from "@material-ui/icons"
import { Button } from "@material-ui/core"

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

type UserMenuPropsType = {
  anchorEL: any
  setAnchor: any
}

export default function UserMenu(props: UserMenuPropsType) {
  const anchorEl = props.anchorEL
  const setAnchorEl = props.setAnchor

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        elevation={3}
      >
        <StyledMenuItem>
          <Button href={"/userProfile"} size="small">
            <ListItemIcon>
              <FaceOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </Button>
        </StyledMenuItem>
        <StyledMenuItem disabled>
          <Button>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </Button>
        </StyledMenuItem>
        <StyledMenuItem disabled>
          <Button>
            <ListItemIcon>
              <PaymentOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Payment" />
          </Button>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}
