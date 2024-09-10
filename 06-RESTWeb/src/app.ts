import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.url)

  res.write('hola mundo');
  res.end()
})


server.listen(8080, () => {
  console.log('Server running in PORT 8080')
})