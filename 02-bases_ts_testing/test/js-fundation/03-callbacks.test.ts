import { getUserByID } from '../../src/js-fundation/03-callbacks'

describe('js-fundation/03-callbacks', () => {
  test('getUserByID should return an error if users does not exist', () => {
    const id = 10
    getUserByID(id, (err, user) => {
      expect( err ).toBe(`User not found with id ${id}`)
      expect( user ).toBeUndefined()
    })
  })
})
