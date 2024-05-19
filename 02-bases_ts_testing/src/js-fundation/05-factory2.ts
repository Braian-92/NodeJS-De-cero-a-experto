interface buildMakePersonOptions {
  getUUID: () => string
  getAge: (birthdate: string) => number
}

interface PersonOptions {
  name: string
  birthdate: string
}

export const buildMakePerson = ({getUUID, getAge}: buildMakePersonOptions) => {

  return ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name: name,
      birthdate: birthdate,
      age: getAge(birthdate)
    }
  }
}