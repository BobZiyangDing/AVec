import { throughputChoices } from "app/core/components/orderRule/throughputChoices"
import { priceDic } from "app/core/components/orderRule/orderPrice"

type getOrderPriceInputType = {
  throughput: any
  hasDataplot: boolean
  hasDataset: boolean
  hasModel: boolean
  needSynth: boolean
  userVersion: string
}

export const getOrderPrice = (orderInput: getOrderPriceInputType) => {
  const throughput = orderInput.throughput
  const hasDataplot = orderInput.hasDataplot
  const hasDataset = orderInput.hasDataset
  const hasModel = orderInput.hasModel
  const needSynth = orderInput.needSynth
  const userVersion = orderInput.userVersion

  const throughputChoice = throughputChoices[userVersion]

  if (throughputChoice[throughputChoice.length - 1].label === throughput) return "SUPER_ORDER"

  const orderPriceMenuList = priceDic[userVersion]
  const orderPriceMenu = orderPriceMenuList[throughput]

  if (orderPriceMenu) {
    let price = orderPriceMenu.topSeq
    price += needSynth ? orderPriceMenu.synth : 0
    price += hasDataplot ? orderPriceMenu.dataplot : 0
    price += hasDataset ? orderPriceMenu.dataset : 0
    price += hasModel ? orderPriceMenu.model : 0

    return price.toString()
  }

  return "ERROR"
}
