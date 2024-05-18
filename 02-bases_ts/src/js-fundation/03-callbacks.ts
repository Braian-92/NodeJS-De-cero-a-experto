interface User {
  id: number
  name: string
}
const users: User[] = [
  {
    id: 1,
    name: 'Braian Zamudio'
  },
  {
    id: 2,
    name: 'Natalia Techeira'
  }
]

export function getUserByID(
  id: number,
  callback: (err?: string, user?: User) => void
) {
  const user = users.find(function (user) {
    return user.id === id
  })
  if (!user) {
    return callback(`User not found with id ${id}`)
  }
  return callback(undefined, user)
}

