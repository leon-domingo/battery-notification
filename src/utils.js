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
  switch (match[2]) {
    case 's':
      return `*/${match[1]} * * * * *`

    case 'm':
      return `*/${match[1]} * * * *`

    case 'h':
      return `* */${match[1]} * * *`
  }
}
