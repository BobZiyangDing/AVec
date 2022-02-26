export const throughputChoices = {
  ACADEMIA: [384, 1536, 2500, 5000, 10000, 20000, ">20,000"].map((choice, idx) => {
    return { value: idx, label: choice }
  }),
  ENTERPRISE: [5000, 10000, 20000, ">20,000"].map((choice, idx) => {
    return { value: idx, label: choice }
  }),
}
