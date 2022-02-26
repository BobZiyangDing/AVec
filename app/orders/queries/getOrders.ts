import { Ctx } from "blitz"
import db from "db"

export default async function getOrders(input: undefined, ctx: Ctx) {
  ctx.session.$authorize()

  const userID = ctx.session.userId

  return db.order.findMany({
    where: {
      userId: userID,
    },
  })
}
