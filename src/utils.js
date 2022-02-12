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

export function getCronDefinition(frequency) {
  const match = /^([1-9]|[1-5]\d|)([ms])$/.exec(frequency)
  if (match === null) {
    throw new Error(
      `Frequency value "${frequency}" is not valid. Try "s" for seconds (10s) or "m" for minutes (5m), and values between 1 and 59`
    )
  }
  switch (match[2]) {
    case 's':
      return `*/${match[1]} * * * * *`

    case 'm':
      return `*/${match[1]} * * * *`
  }
}
