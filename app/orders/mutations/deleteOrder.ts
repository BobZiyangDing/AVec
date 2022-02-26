import { Ctx } from "blitz"
import db from "db"

type DeleteOrderInputType = {
  id: number
}

export default async function DeleteOrder(input: DeleteOrderInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const order = await db.order.delete({
    where: {
      id: input.id,
    },
  })

  return order
}
