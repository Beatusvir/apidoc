import { fetchApisFromDb, fetchApiDetailFromDb, updateApis } from './core'
import { List, Map } from 'immutable'

export default function reducer (state = Map() , action) {
  switch (action.type) {
    case 'GET_DETAIL':
      return fetchApiDetailFromDb(state, action.apiId)
    case 'FETCH_APIS':
      return fetchApisFromDb(state)
    case 'UPDATE_APIS':
      return updateApis(state, action.apis)
  }
  return state
}
