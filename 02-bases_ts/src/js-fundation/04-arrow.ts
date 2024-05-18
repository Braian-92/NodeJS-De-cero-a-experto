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

export const getUserByID = (
  id: number,
  callback: (err?: string, user?: User) => void
) => {esumido
  const user = users.find((user) => user.id === id)
  user ? callback(undefined, user) : callback(`User not found with id ${id}`)
}