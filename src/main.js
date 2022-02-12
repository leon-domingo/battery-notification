import cron from 'node-cron'
import si from 'systeminformation'
import notifier from 'node-notifier'
import { FRECUENCY, LEVELS } from './constants'
import { getCronDefinition, setWaitingNotification } from './utils'

function main({
  minLevel = LEVELS.MIN_LEVEL,
  maxLevel = LEVELS.MAX_LEVEL,
  frecuency = FRECUENCY,
}) {
  console.log(
    `[minLevel = ${minLevel} | maxLevel = ${maxLevel}] | frecuency = ${frecuency}min`
  )
  cron.schedule(getCronDefinition(frecuency), () => {
    si.battery()
      .then(({ percent, isCharging }) => {
        const now = new Date()
        const chargeStatus = isCharging ? 'CHARGING' : 'DISCHARGING'
        console.log(`${now.toISOString()} ${percent}% ${chargeStatus}`)
        if (percent > maxLevel && isCharging) {
          const notification = {
            title: 'Battery notification 🔋',
            subtitle: 'This is the subtitle',
            message: `The current level (${percent}%) is too high 🔥\nUNPLUG THE CABLE`,
          }
          notifier.notify(setWaitingNotification(notification))
        }

        if (percent < minLevel && !isCharging) {
          const notification = {
            title: 'Battery notification 🔋',
            message: `The current level (${percent}%) is too low 😨\nPLUG THE CABLE`,
            wait: true,
          }
          notifier.notify(setWaitingNotification(notification))
        }

        if (
          (percent < maxLevel && !isCharging) ||
          (percent > minLevel && isCharging)
        ) {
          notifier.notify({
            title: `Battery notification 🔋 (${percent}%)\n${chargeStatus.toLowerCase()}`,
            message: "Everything's ok 👍",
            sound: false,
          })
        }
      })
      .catch(error => console.error(error))
  })
}

export default main
