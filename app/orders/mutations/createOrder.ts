import { Ctx } from "blitz"
import db from "db"

type CreateOrderInputType = {
  name: string // user inputted
  number: string
  goi: string // user inputted
  throughput: number // user inputted
  ecoliType: string // user inputted
  condition: string // user inputted
  description: string // user inputted
  seqType: string // user inputted
  needSynth: boolean // user inputted
  hasDataplot: boolean // user inputted
  hasDataset: boolean // user inputted
  hasModel: boolean // user inputted
  price: number
  addressId: number
}

export default async function CreateOrder(input: CreateOrderInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const order = await db.order.create({
    data: {
      name: input.name,
      number: input.number,
      goi: input.goi,
      throughput: input.throughput,
      ecoliType: input.ecoliType,
      condition: input.condition,
      description: input.description,
      needSynth: input.needSynth,
      seqType: input.seqType,
      hasDataplot: input.hasDataplot,
      hasDataset: input.hasDataset,
      hasModel: input.hasModel,
      price: input.price,
      addressId: input.addressId,
      userId: ctx.session.userId,
    },
  })

  return order
}
