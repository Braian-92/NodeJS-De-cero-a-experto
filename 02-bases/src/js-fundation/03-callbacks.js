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

function getUserByID(id, callback) {
  const user = users.find(function (user) {
    return user.id === id
  })
  if (!user){
    return callback(`User not found with id ${id}`)
  }
  return callback(null, user)
}

// getUserByID(1)

module.exports = {
  getUserByID
}
