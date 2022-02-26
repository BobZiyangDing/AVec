export const OrderStatusMap = {
  "order received": 10,
  "performing experiment": 30,
  sequencing: 70,
  "retrieved results": 95,
  completed: 100,
}

// export const OrderStatusMap =
//   ["order received", "performing experiment", "sequencing", "retrieved results", "completed"].map((choice, idx) => {
//     return { value: idx, label: choice }
//   })
