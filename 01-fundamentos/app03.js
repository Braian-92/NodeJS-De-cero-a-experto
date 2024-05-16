const fs = require('fs')

const content = fs.readFileSync('README.md', 'utf-8')

const words = content.split(' ')

const reactWordsCount = words.filter(
  (word) => word.toLowerCase() === 'react'
).length

console.log('🚀 ~ wordCount:', words.length)
console.log('🚀 ~ reactWordsCount:', reactWordsCount)
