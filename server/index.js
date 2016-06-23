import makeStore from './src/store'
import startServer from './src/server'

export const store = makeStore()
startServer(store)

store.dispatch({
  type: 'SET_METHODS',
  methods: require('./methods.json')
})