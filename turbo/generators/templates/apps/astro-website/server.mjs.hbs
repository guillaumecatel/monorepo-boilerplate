// @ts-check

import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import permissionsPolicy from 'permissions-policy'

// @ts-ignore
import { handler } from './dist/server/entry.mjs'

const BASE = '/'
const HOST = '0.0.0.0'
const PORT = Number(process.env.PORT) || 3000

const app = express()

app.disable('x-powered-by')

app.use(compression())

app.use(
  BASE,
  express.static('dist/client/', {
    maxAge: '1y',
    immutable: true,
  }),
)

app.use((_, res, next) => {
  const originalSetHeader = res.setHeader.bind(res)

  res.setHeader = (name, value) => {
    if (name.toLowerCase() === 'content-type' && typeof value === 'string') {
      if (!value.toLowerCase().includes('charset=')) {
        value += ';charset=utf-8'
      }
    }

    return originalSetHeader(name, value)
  }

  next()
})

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        connectSrc: ["'self'"],
      },
    },
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    originAgentCluster: true,
  }),
)

app.use(
  permissionsPolicy({
    features: {
      fullscreen: ['self'],
    },
  }),
)

app.use(handler)

app.listen(PORT, HOST)
