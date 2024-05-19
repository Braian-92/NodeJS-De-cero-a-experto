import { getUserByID } from '../../src/js-fundation/03-callbacks'

describe('js-fundation/03-callbacks', () => {
  test('getUserByID should return an error if users does not exist', (done) => {
    const id = 10
    getUserByID(id, (err, user) => {
      expect( err ).toBe(`User not found with id ${id}`)
      expect( user ).toBeUndefined()
      done()
    })
  })

  test('getUserByID should return Braian Zamudio', (done) => {
    const id = 1
    getUserByID(id, (err, user) => {
      expect( err ).toBeUndefined()
      expect( user ).toEqual({
        id: 1,
        name: 'Braian Zamudio'
      })
      done()
    })
  })
})
