import { Ctx } from "blitz"
import db from "db"

type UpdateOrderInputType = {
  id: number
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
  status: string
}

export default async function UpdateOrder(input: UpdateOrderInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const order = await db.order.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
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
      status: input.status,
    },
  })

  return order
}
