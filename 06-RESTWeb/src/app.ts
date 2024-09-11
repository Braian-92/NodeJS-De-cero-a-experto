import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.url)

  // res.writeHead(200, {'Content-Type': 'text/html'})
  // res.write(`<h1>Hola mundo! ${req.url}</h1>`);
  // res.end()

  const data = {
    name: 'braian',
    age: 31,
    city: 'Buenos Aires'
  }

  res.writeHead(200, { 'Content-type': 'aplication/json' })
  res.end( JSON.stringify(data) )

})


server.listen(8080, () => {
  console.log('Server running in PORT 8080')
})