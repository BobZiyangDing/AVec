export function disabledDataplot(throughputIdx: number, userVersion: string) {
  if (userVersion === "ACADEMIA") {
    if ([0].includes(throughputIdx)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function disabledDataset(throughputIdx: number, userVersion: string) {
  if (userVersion === "ACADEMIA") {
    if ([0, 1].includes(throughputIdx)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function disabledModel(throughputIdx: number, userVersion: string) {
  if (userVersion === "ACADEMIA") {
    if ([0, 1, 2].includes(throughputIdx)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
