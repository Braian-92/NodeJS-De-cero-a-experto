import express from "express"
import { env } from "./config"
import { GithubController } from "./presentation/github/controller"
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware"


( () => {
  main()
})()


function main() {
  const app = express()
  const githubController = new GithubController();
  // Middleware para procesar JSON
  app.use(express.json())
  app.use(GithubSha256Middleware.verifyGithubSignature)

  // app.post('/api/github', (req, res) => {
  //   console.log(req.body);
  //   res.send('Github endpoint');
  // });
  app.post('/api/github', githubController.webhookHandler);

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
  })
}