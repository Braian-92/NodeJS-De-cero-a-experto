const fs = require('fs')

const content = fs.readFileSync('README.md', 'utf-8')

const words = content.split(' ')

const reactWordsCount = words.filter(
  // (word) => word.toLowerCase() === 'react'
  (word) => word.toLowerCase().includes('react')
).length

const reactWordsCount2 = content.match(/react/gi ?? []).length

console.log('🚀 ~ wordCount:', words.length)
console.log('🚀 ~ reactWordsCount:', reactWordsCount)
console.log("🚀 ~ reactWordsCount2:", reactWordsCount2)
