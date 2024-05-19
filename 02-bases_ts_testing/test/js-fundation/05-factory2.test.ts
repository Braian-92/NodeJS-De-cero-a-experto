import { buildMakePerson } from '../../src/js-fundation/05-factory2'

describe('js-fundation/05-factory2', () => {
  const getUUID = () => '1234'
  const getAge = () => 31

  test('buildMakePerson should return a function', () => {
    const mekePerson = buildMakePerson({getUUID, getAge})

    expect(typeof mekePerson).toBe('function')
  })

  test('buildMakePerson should return a person', () => {
    const mekePerson = buildMakePerson({getUUID, getAge})
    
    const braianZamudio = mekePerson({
      name: 'Braian Zamudio',
      birthdate: '1992-11-04'
    })

    expect(braianZamudio).toEqual({
      id: '1234',
      name: 'Braian Zamudio',
      birthdate: '1992-11-04',
      age: 31
    })
  })
})
