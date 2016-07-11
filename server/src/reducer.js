import { List, Map } from 'immutable'
import {
  deleteApiFromDb,
  addApiToDb,
  fetchApisFromDb,
  fetchApiDetailFromDb,
  addApiMethodToDb
} from './core'

const initialState = Map(
  {
    apis: List(),
    isFetching: false,
    lastError: ''
  }
)

const addApi = (newApi) => {
  addApiToDb(newApi)
}

export default function reducer (state = initialState , action) {
  switch (action.type) {
    case 'REQUEST_APIS':
      fetchApisFromDb()
      return state.merge(Map({isFetching: true}))
    case 'SEND_APIS':
      return state.merge(Map({
        isFetching: false,
        apis: action.apis
      }))
    case 'ADD_API':
      addApi(action.newApi)
      return state.merge(Map({isFetching: true}))
    case 'DELETE_API':
      const apis = state.get('apis').filter(apis => apis.id != action.apiId)
      deleteApiFromDb(action.apiId)
      return state.merge(Map({
        apis: apis
      }))
    case 'ADD_API_METHOD':
      addApiMethodToDb(action.apiMethod)
      return state
    case 'REQUEST_DETAIL':
      fetchApiDetailFromDb(action.apiId)
      return state.merge(Map({isFetching: true, selectedApiId: action.apiId}))
    case 'SEND_DETAIL':
      return state.merge(Map({
        isFetching: false,
        apiDetail: action.apiDetail
      }))
    case 'LAST_ERROR':
    return state.merge(Map({
      lastError: action.error
    }))
    case 'CLEAR_ERROR': {
      return state.merge(Map({
      lastError: ''
    }))
    }
    default:
      return state
  }
}
