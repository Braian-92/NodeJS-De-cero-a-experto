import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.url)

  res.writeHead(200, {'Content-Type': 'text/html'})

  res.write('<h1>Hola mundo!</h1>');
  res.end()
})


server.listen(8080, () => {
  console.log('Server running in PORT 8080')
})