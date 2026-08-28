/**
 * Node entry point for hosts that run the app themselves (GoDaddy Node.js
 * Hosting and anything else that does `npm start` on a port it assigns).
 *
 * Vercel does not use this file — its Next.js builder compiles the app into
 * its own serverless output and ignores both `main` and the `start` script —
 * so having it here costs that deployment nothing.
 *
 * The port MUST come from process.env.PORT. The previous start script pinned
 * -p 3317, so the app listened on a port the host was not probing and the
 * deployment was marked unhealthy no matter how cleanly it had built.
 */
const { createServer } = require('node:http')
const next = require('next')

const port = Number.parseInt(process.env.PORT ?? '3000', 10)
// 0.0.0.0, not localhost: a managed host routes to the container from outside,
// and a server bound to the loopback interface is unreachable to it.
const hostname = process.env.HOST ?? '0.0.0.0'

const app = next({ dev: false, hostname, port })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((err) => {
        console.error('request failed:', req.url, err)
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }).listen(port, hostname, () => {
      console.log(`> Haus of Pong ready on http://${hostname}:${port}`)
    })
  })
  .catch((err) => {
    console.error('failed to start Next:', err)
    process.exit(1)
  })
