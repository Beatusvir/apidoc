import makeStore from './src/store'
import startServer from './src/server'
import { initDb } from './src/database'

export const store = makeStore()
startServer(store)

initDb()