import express, { Application } from 'express'
import logger from './utils/logger'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './trpc';

const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const port = process.env.PORT
app.listen(port, () => {
    logger.info(`Listening on port http://localhost:${port}`) 
})

export type AppRouter = typeof appRouter;
