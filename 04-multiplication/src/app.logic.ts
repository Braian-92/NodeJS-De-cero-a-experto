import fs, { mkdirSync } from 'fs'

let outputMessage = ''
const base = 6
const headerMessage = `
=======================================
             Tabla del ${base}
=======================================

`

for (let i = 0; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`
}

outputMessage = headerMessage + outputMessage

console.log(outputMessage)

const outputPath = 'outputs'

fs.mkdirSync(outputPath, { recursive: true })
fs.writeFileSync(`${outputPath}/tabla-${base}.log`, outputMessage)
