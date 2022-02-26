import { Ctx } from "blitz"
import db from "db"

export default async function getAddresses(input: undefined, ctx: Ctx) {
  ctx.session.$authorize()

  const userID = ctx.session.userId
  const user = await db.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      addresses: true,
    },
  })

  return user.addresses
}
