const { getUUID, getAge } = require('../plugins/')

const buildPerson = ({ name, birthdate }) => {
  return {
    id: getUUID(),
    name: name,
    birthdate: birthdate,
    age: getAge(birthdate)
  }
}

const obj = {
  name: 'Braian',
  birthdate: '1992-11-04'
}

const braian = buildPerson(obj)
console.log('🚀 ~ braian:', braian)
