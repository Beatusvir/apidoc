import makeStore from './src/store'
import startServer from './src/server'
import { initDb } from './src/database'

initDb()

export const store = makeStore()
startServer(store)

store.dispatch({
  type: 'FETCH_APIS'
})