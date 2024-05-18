const { PROCESSOR_ARCHITECTURE, USERPROFILE, USERNAME } = process.env

console.log('🚀 ~ PROCESSOR_ARCHITECTURE:', PROCESSOR_ARCHITECTURE)
console.log('🚀 ~ USERPROFILE:', USERPROFILE)
console.log('🚀 ~ USERNAME:', USERNAME)
console.table({ PROCESSOR_ARCHITECTURE, USERPROFILE, USERNAME })


const [,,batman] = ['Flash', 'Superman', 'Batman']

console.log("🚀 ~ batman:", batman)
