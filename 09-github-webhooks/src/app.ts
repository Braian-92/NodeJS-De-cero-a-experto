import express from "express"
import { env } from "./config"


( () => {
  main()
})()


function main() {
  const app = express()

  // Middleware para procesar JSON
  app.use(express.json())

  app.post('/api/github', (req, res) => {
    console.log(req.body);
    res.send('Github endpoint');
  });

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
  })
}