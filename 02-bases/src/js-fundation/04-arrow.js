const users = [
  {
    id: 1,
    name: 'Braian Zamudio'
  },
  {
    id: 2,
    name: 'Natalia Techeira'
  }
]

const getUserByID = (id, callback) => {
  // const user = users.find((user) => {
  //   return user.id === id
  // })
  //! metodo resumido
  const user = users.find((user) => user.id === id )
  
  // if (!user) {
    //   return callback(`User not found with id ${id}`)
    // }
    // return callback(null, user)
  //! metodo resumido
  user
    ? callback(null, user)
    : callback(`User not found with id ${id}`)
}

// getUserByID(1)

module.exports = {
  getUserByID
}
