import {Map} from 'immutable'
import { getDbApis } from './database'

export function updateApis(state, apis){
  return state.set('apis', apis)
}

export function fetchApisFromDb(state){
  // TODO return api list from db
  return state.set('apis', [])
}

export function fetchApiDetailFromDb (state, apiId) {
  // TODO return api detail from db
  return state.set('apiDetail', [
    {
      title: 'AfiliarCliente ',
      description: 'Afilia el cliente al sistema de transferencias',
      items: [
        { title: 'Method', content: 'POST' },
        { title: 'Url Params', content: 'asd, asd' },
        { title: 'Some method', content: 'Some method content' }
      ]
    },
    {
      title: 'AfilicarCuenta',
      description: 'Afilia una cuenta al cliente',
      items: [
        { title: 'Method', content: 'POST' },
        { title: 'Url Params', content: 'asd, asd' },
        { title: 'Some method', content: 'Some method content' }
      ]
    }
  ]
  )
}