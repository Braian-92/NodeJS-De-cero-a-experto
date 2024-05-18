import { buildLogger } from './plugins/logger.plugin'
console.log('Hola mundo')

const logger = buildLogger('app.js')

logger.log('hola mundo')
logger.error('esto es un error.')