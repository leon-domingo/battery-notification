import { DEFAULT_FREQUENCY, DEFAULT_LEVELS } from './constants'
import main from './main'
import commander from 'commander'

commander
  .version('1.0.0', '-v, --version')
  .option(
    '-m, --min-value <value>',
    'Minimum percent level (during discharging) before showing a notification',
    DEFAULT_LEVELS.MIN_LEVEL
  )
  .option(
    '-M, --max-value <value>',
    'Maximum percent level (during charging) before showing a notification',
    DEFAULT_LEVELS.MAX_LEVEL
  )
  .option(
    '-f, --frequency <value>',
    'Frequency the process will watch the battery status. Format must be: <n>s for seconds <n>m for minutes and <n>h for hours. For example, 5s, 10m, 1h, ...',
    DEFAULT_FREQUENCY
  )
  .parse(process.argv)

const options = commander.opts()

const checkLevels = percents => {
  percents.forEach(percent => {
    if (percent < 0 || percent > 100) {
      throw new Error(
        `Level of ${percent}% is not valid. Values must be between 0 and 100`
      )
    }
  })
}

try {
  const minLevel = +options.minValue
  const maxLevel = +options.maxValue

  checkLevels([minLevel, maxLevel])

  const frequency = options.frequency
  main({ minLevel, maxLevel, frequency })
} catch (error) {
  console.error('Error: ' + error?.message)
}
