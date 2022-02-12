import cron from 'node-cron'
import si from 'systeminformation'
import notifier from 'node-notifier'
import {
  CHARGE_STATUS,
  DEFAULT_FRECUENCY,
  DEFAULT_LEVELS,
  MESSAGES,
} from './constants'
import { getCronDefinition, setWaitingNotification } from './utils'

function main({
  minLevel = DEFAULT_LEVELS.MIN_LEVEL,
  maxLevel = DEFAULT_LEVELS.MAX_LEVEL,
  frecuency = DEFAULT_FRECUENCY,
}) {
  console.log(
    `[minLevel = ${minLevel} | maxLevel = ${maxLevel}] | frecuency = ${frecuency}min`
  )
  cron.schedule(getCronDefinition(frecuency), () => {
    si.battery()
      .then(({ percent, isCharging }) => {
        const chargeStatus = isCharging
          ? CHARGE_STATUS.CHARGING
          : CHARGE_STATUS.DISCHARGING
        console.log(MESSAGES.logLine(percent, chargeStatus))
        if (percent > maxLevel && isCharging) {
          const notification = {
            title: MESSAGES.TITLE,
            message: MESSAGES.unplugCable(percent),
          }
          notifier.notify(setWaitingNotification(notification))
        }

        if (percent < minLevel && !isCharging) {
          const notification = {
            title: MESSAGES.TITLE,
            message: MESSAGES.plugCable(percent),
            wait: true,
          }
          notifier.notify(setWaitingNotification(notification))
        }

        if (
          (percent < maxLevel && !isCharging) ||
          (percent > minLevel && isCharging)
        ) {
          notifier.notify({
            title: MESSAGES.okTitle(percent, chargeStatus),
            message: MESSAGES.OK,
            sound: false,
          })
        }
      })
      .catch(error => console.error(error))
  })
}

export default main
