import { emailTemplete } from '../../src/js-fundation/01-templete'

describe('js-fundation/01-templete.test.ts', () => {
  test('email should contain a greeting', () => {
    expect( emailTemplete ).toContain('Hi, ')
  })

  test('email should contain {{name}} and {{orderID}}', () => {
    expect( emailTemplete ).toMatch(/{{name}}/)
    expect( emailTemplete ).toMatch(/{{orderId}}/)
  })
})