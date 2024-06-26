import fs, { mkdirSync } from 'fs'
import { yarg } from './config/plugins/args.plugin'

console.log(yarg)

const { b:base, l:limit, s:showTable } = yarg

let outputMessage = ''
const headerMessage = `
=======================================
             Tabla del ${base}
=======================================

`

for (let i = 0; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`
}

outputMessage = headerMessage + outputMessage
if(showTable){
  console.log(outputMessage)
}

const outputPath = 'outputs'

fs.mkdirSync(outputPath, { recursive: true })
fs.writeFileSync(`${outputPath}/tabla-${base}.log`, outputMessage)
