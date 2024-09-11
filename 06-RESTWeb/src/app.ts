import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {
  console.log(req.url)

  // res.writeHead(200, {'Content-Type': 'text/html'})
  // res.write(`<h1>Hola mundo! ${req.url}</h1>`);
  // res.end()

  // const data = {
  //   name: 'braian',
  //   age: 31,
  //   city: 'Buenos Aires'
  // }
  // res.writeHead(200, { 'Content-type': 'aplication/json' })
  // res.end( JSON.stringify(data) )

  if(req.url === '/'){
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end( htmlFile )
    return;
  }
  // else{
  //   res.writeHead(404, { 'Content-type': 'text/html' })
  //   res.end()
  // }

  if(req.url?.includes('.js')){
    res.writeHead(200, { 'Content-type': 'aplication/javascript' })
  }else if(req.url?.includes('.css')){
    res.writeHead(200, { 'Content-type': 'text/css' })
  }
  try {
    const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8')
    res.end( responseContent )
  } catch (error) {
    res.writeHead(404, { 'Content-type': 'text/html' })
    res.end()
  }
  
})


server.listen(8080, () => {
  console.log('Server running in PORT 8080')
})