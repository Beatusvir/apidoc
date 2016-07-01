import { List, Map } from 'immutable'
import { fetchApisFromDb, fetchApiDetailFromDb } from './core'

const initialState = Map(
  {
    apis: List(),
    isFetching: false
  }
)

export default function reducer (state = initialState , action) {
  switch (action.type) {
    case 'REQUEST_APIS':
      fetchApisFromDb()
      return state.merge(Map({
        isFetching: true
      }))
    case 'SEND_APIS':
      return state.merge(Map({
        isFetching: false,
        apis: action.apis
      }))
    case 'ADD_API':
      {
      let apis = []
      if (typeof state.get('apis') != 'undefined') {
        apis = state.get('apis')
      }
      apis.push(action.api)
      return state.merge(Map({
        apis: apis
      }))
      }
    case 'DELETE_API':
      {
      const apis = state.get('apis').filter(apis => apis.id != action.apiId)
      return state.merge(Map({
        apis: apis
      }))
      }

    case 'REQUEST_DETAIL':
      fetchApiDetailFromDb(action.apiId)
      return state.merge(Map({
        isFetching: true
      }))
    case 'SEND_DETAIL':
      return state.merge(Map({
        isFetching: false,
        apiDetail: action.apiDetail
      }))
    default:
      return state
  }
}
