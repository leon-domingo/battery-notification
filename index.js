const cron = require('node-cron')
const si = require('systeminformation')
const notifier = require('node-notifier')

function main({ minLevel = 35, maxLevel = 85, frecuency = 5 }) {
  console.log(
    `[minLevel = ${minLevel} | maxLevel = ${maxLevel}] | frecuency = ${frecuency}min`
  )
  cron.schedule(`*/${frecuency} * * * *`, () => {
    si.battery()
      .then(({ percent, isCharging }) => {
        const now = new Date()
        const chargeStatus = isCharging ? 'CHARGING' : 'DISCHARGING'
        console.info(`${now.toISOString()} ${percent}% ${chargeStatus}`)
        if (percent > maxLevel && isCharging) {
          notifier.notify({
            title: 'Battery notification 🔋',
            message: `The current level (${percent}%) is too high 🔥\nUNPLUG THE CABLE`,
            wait: true,
          })
        }

        if (percent < minLevel && !isCharging) {
          notifier.notify({
            title: 'Battery notification 🔋',
            message: `The current level (${percent}%) is too low 😨\nPLUG THE CABLE`,
            wait: true,
          })
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

// node index.js 35 85 5
console.log(process.argv)
const minLevel = +(process.argv[2] || '35')
const maxLevel = +(process.argv[3] || '85')
const frecuency = +(process.argv[4] || '5')
main({ minLevel, maxLevel, frecuency })
