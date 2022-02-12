export function setWaitingNotification(notification) {
  const waitingNotification = {}
  if (process.platform === 'linux') {
    waitingNotification.timeout = 0
  } else {
    waitingNotification.wait = true
  }

  return {
    ...notification,
    ...waitingNotification,
  }
}

export function getCronDefinition(frecuency) {
  if (process.env.NODE_ENV !== 'dev') {
    // frecuency = minutes
    return `*/${frecuency} * * * *`
  }
  // frecuency = seconds
  return `*/${frecuency} * * * * *`
}
