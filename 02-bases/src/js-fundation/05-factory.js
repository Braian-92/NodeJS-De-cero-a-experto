

const buildPerson = ({ name, birthdate }) => {
  return {
    id: new Date().getTime(),
    name: name,
    birthdate: birthdate,
    age: new Date().getFullYear() - new Date(birthdate).getFullYear()
  }
}

const obj = {
  name: 'Braian',
  birthdate: '1992-11-04'
}

const braian = buildPerson(obj)
console.log("🚀 ~ braian:", braian)
