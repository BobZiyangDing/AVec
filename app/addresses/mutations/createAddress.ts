import { Ctx } from "blitz"
import db from "db"

type CreateAddressType = {
  name: string
  streetAddress: string
  city: string
  province: string
  zip: string
}

export default async function CreateAddress(input: CreateAddressType, ctx: Ctx) {
  ctx.session.$authorize()

  const address = await db.address.create({
    data: {
      name: input.name,
      streetAddress: input.streetAddress,
      city: input.city,
      province: input.province,
      zip: input.zip,
      userId: ctx.session.userId,
    },
  })

  return address
}
