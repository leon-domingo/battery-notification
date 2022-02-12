import { FRECUENCY, LEVELS } from './constants'
import main from './main'

const minLevel = +(process.argv[2] || LEVELS.MIN_LEVEL)
const maxLevel = +(process.argv[3] || LEVELS.MAX_LEVEL)
const frecuency = +(process.argv[4] || FRECUENCY)
main({ minLevel, maxLevel, frecuency })
