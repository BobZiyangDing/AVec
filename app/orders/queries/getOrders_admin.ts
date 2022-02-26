import { Ctx } from "blitz"
import db from "db"

export default async function getOrdersAdmin(input: undefined, ctx: Ctx) {
  ctx.session.$authorize()
  return db.order.findMany()
}
