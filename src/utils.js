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
  const match = /^(\d+)([hms])$/.exec(frequency)
  if (match === null) {
    throw new Error(
      `Frequency value "${frequency}" is not valid. Try "s" for seconds (10s), "m" for minutes (5m) or "h" for hours (1h)`
    )
  }
  switch (match[2]) {
    case 's':
      return `*/${match[1]} * * * * *`

    case 'm':
      return `*/${match[1]} * * * *`

    case 'h':
      return `* */${match[1]} * * *`
  }
}
