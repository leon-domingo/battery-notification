export const DEFAULT_LEVELS = {
  MIN_LEVEL: 35,
  MAX_LEVEL: 85,
}

export const DEFAULT_FRECUENCY = 5

export const MESSAGES = {
  TITLE: 'Battery notification 🔋',
  OK: "Everything's ok 👍",
  logLine: (percent, chargeStatus) => {
    const now = new Date()
    return `${now.toISOString()} ${percent}% ${chargeStatus}`
  },
  okTitle: (percent, chargeStatus) =>
    `Battery notification 🔋 (${percent}%)\n${chargeStatus.toLowerCase()}`,
  unplugCable: percent =>
    `The current level (${percent}%) is too high 🔥\nUNPLUG THE CABLE`,
  plugCable: percent =>
    `The current level (${percent}%) is too low 😨\nPLUG THE CABLE`,
}

export const CHARGE_STATUS = {
  CHARGING: 'CHARGING',
  DISCHARGING: 'DISCHARGING',
}
