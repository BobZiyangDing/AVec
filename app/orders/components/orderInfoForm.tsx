import React from "react"
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Container,
  Tooltip,
  IconButton,
  Grid,
  Paper,
  Link,
} from "@material-ui/core"
import PrintRoundedIcon from "@material-ui/icons/PrintRounded"
import SaveRoundedIcon from "@material-ui/icons/SaveRounded"
import { useQuery, useParam } from "blitz"
import getOrderByNumber from "app/orders/queries/getOrderByNumber"

function OrderInfoForm() {
  const orderNumber = useParam("orderNumber")

  const [order] = useQuery(getOrderByNumber, { orderNumber: orderNumber })
  const address = order.address
  const user = order.owner

  return (
    <Container>
      <br />
      <Grid item lg={11} md={11} xl={11} xs={11}>
        <Paper elevation={3}>
          <CardHeader
            action={
              <Grid container>
                <Tooltip title="Print">
                  <IconButton aria-label="print">
                    <PrintRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="save">
                  <IconButton aria-label="save">
                    <SaveRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            }
            title={"Order: " + order.name}
          />
          <Divider />
          <CardContent>
            <Box
              sx={{
                height: 400,
                position: "relative",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs>
                  <Box fontWeight="fontWeightBold">From:</Box>
                  <br />
                  <Box fontWeight="fontWeightBold">深圳寻竹生物科技有限公司</Box>
                  <Box fontSize="fontSize">address line 1: 深圳市光明区</Box>
                  <Box fontSize="fontSize">address line 2: 新湖街道圳美社区卓宏大厦2层</Box>
                  <Box fontSize="fontSize">
                    email: <Link href="mailto:avec@ailurus.bio">avec@ailurus.bio</Link>
                  </Box>
                  <Box fontSize="fontSize">phone: 18817362149</Box>
                </Grid>
                <Grid item xs>
                  <Box fontWeight="fontWeightBold">To:</Box>
                  <br />
                  <Box fontWeight="fontWeightBold">Recipient: {user.name}</Box>
                  <Box fontSize="fontSize">address line 1: {address.streetAddress}</Box>
                  <Box fontSize="fontSize">
                    address line 2: {[address.city, address.province, address.zip].join(", ")}
                  </Box>
                  <Box fontSize="fontSize">
                    email: <Link href="mailto:avec@ailurus.bio">{user.email}</Link>
                  </Box>
                  <Box fontSize="fontSize">phone: {user.phone}</Box> {/*这里要加进来 */}
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box fontWeight="fontWeightBold">Abstract:</Box>
                </Grid>
                <Grid item xs={1}>
                  <Box fontSize="fontSize">Name</Box>
                  <Box fontSize="fontSize">Number</Box>
                  <Box fontSize="fontSize">Created On</Box>
                  <Box fontSize="fontSize">Throughput:</Box>
                  <Box fontSize="fontSize">Status:</Box>
                  <Box fontSize="fontSize">Description:</Box>
                </Grid>
                <Grid item xs>
                  <Box fontSize="fontSize">{order.name}</Box>
                  <Box fontSize="fontSize">{order.number}</Box>
                  <Box fontSize="fontSize">{order.createdAt.toDateString()}</Box>
                  <Box fontSize="fontSize">{order.throughput}</Box>
                  <Box fontSize="fontSize">{order.status}</Box>
                  <Box fontSize="fontSize">{order.description}</Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Paper>
      </Grid>
    </Container>
  )
}

export default OrderInfoForm
