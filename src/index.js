import { DEFAULT_FRECUENCY, DEFAULT_LEVELS } from './constants'
import main from './main'

const minLevel = +(process.argv[2] || DEFAULT_LEVELS.MIN_LEVEL)
const maxLevel = +(process.argv[3] || DEFAULT_LEVELS.MAX_LEVEL)
const frecuency = +(process.argv[4] || DEFAULT_FRECUENCY)
main({ minLevel, maxLevel, frecuency })
