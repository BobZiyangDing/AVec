import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const GetOrderByNumber = z.object({ orderNumber: z.string() })

export default async function getOrderByNumber(input: z.infer<typeof GetOrderByNumber>, ctx: Ctx) {
  // Validate the input
  const data = GetOrderByNumber.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const userId = ctx.session.userId
  const isAdmin = ctx.session.role === "ADMIN"

  if (isAdmin) {
    const order = await db.order.findFirst({
      where: {
        number: data.orderNumber,
      },
      include: {
        address: true,
        owner: true,
      },
    })

    return order
  } else {
    const order = await db.order.findFirst({
      where: {
        number: data.orderNumber,
        userId: userId,
      },
      include: {
        address: true,
        owner: true,
      },
    })

    return order
  }
}
