import { List, Map } from 'immutable'
import { initDb, getDbApis } from './database'

export const INITIAL_STATE = Map()

export function viewApi (state, api) {
  return state.set('api', api)
}

initDb()
const updateState = (err, rows) => {
  if (!err) {

  }
}
getDbApis(updateState)

export function getApis (state) {
  // TODO read apis from database
  return state.set('apis', [
    { id:1, title: 'Api 1'},
    { id:2, title: 'Api 2'}
  ])
}

export function getDetail (state, apiId) {
  // TODO read detail from database using apiId
  return state.set('apiDetail', [
    {
      title: 'AfiliarCliente ' + apiId,
      description: 'Afilia el cliente al sistema de transferencias',
      items: [
        { title: 'Method', content: 'POST' },
        { title: 'Url Params', content: 'asd, asd' },
        { title: 'Some method', content: 'Some method content' }
      ]
    },
    {
      title: 'API Document' + apiId,
      description: 'Some method description',
      items: [
        { title: 'Some method', content: 'Some method content' },
        { title: 'Some method', content: 'Some method content' },
        { title: 'Some method', content: 'Some method content' }
      ]
    }
  ]
  )
}
