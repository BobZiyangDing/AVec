export type OrderType = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  number: string

  goi: string
  throughput: string
  ecoliType: string
  condition: string
  description: string

  status: string
  price: number
  payment: string
  seqType: string
  needSynth: Boolean

  hasDataplot: Boolean
  hasDataset: Boolean
  hasModel: Boolean

  topSequence?: String
  dataplot?: any
  dataset?: any
  model?: any

  userId?: number
  addressId?: number
}
