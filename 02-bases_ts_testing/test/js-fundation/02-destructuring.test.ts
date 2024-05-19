import { characters } from "../../src/js-fundation/02-destructuring";

describe('js-fundation/02-destructuring', () => {
  test('characters should contain Flash, Superman', () => {
    expect( characters ).toContain('Flash')
    expect( characters ).toContain('Superman')
  })
  test('characters should be Flash, and second Superman', () => {
    const [flash, superman] = characters
    expect( flash ).toBe('Flash')
    expect( superman ).toBe('Superman')
  })
})