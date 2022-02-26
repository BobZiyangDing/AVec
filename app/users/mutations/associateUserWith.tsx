import { Ctx } from "blitz"
import db from "db"

export async function AssociateUserWithAddress(input: { addressId: number }, ctx: Ctx) {
  ctx.session.$authorize()

  const addressId = input.addressId

  const user = await db.user.update({
    where: {
      id: ctx.session.userId,
    },
    data: {
      addresses: {
        connect: {
          id: addressId,
        },
      },
    },
  })

  return user
}

export async function AssociateUserWithOrder(input: { orderId: number }, ctx: Ctx) {
  ctx.session.$authorize()

  const orderId = input.orderId

  const user = await db.user.update({
    where: {
      id: ctx.session.userId,
    },
    data: {
      addresses: {
        connect: {
          id: orderId,
        },
      },
    },
  })

  return user
}
