import { List, Map } from 'immutable'
import { deleteApiFromDb, addApiToDb, fetchApisFromDb, fetchApiDetailFromDb, addApiClassToDb } from './core'

const initialState = Map(
  {
    apis: List(),
    isFetching: false
  }
)

const addApi = (title) => {
  addApiToDb(title)
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
      addApi(action.title)
      return state.merge(Map({isFetching: true}))
    case 'DELETE_API':
      const apis = state.get('apis').filter(apis => apis.id != action.apiId)
      deleteApiFromDb(action.apiId)
      return state.merge(Map({
        apis: apis
      }))
    case 'INSERTED_ID':
      return state.merge(Map({
        isFetching: false,
        insertedId: action.apiId
      }))
    case 'ADD_API_CLASS':
      addApiClassToDb(action.apiClass)
      return state
    case 'REQUEST_DETAIL':
      fetchApiDetailFromDb(action.apiId)
      return state.merge(Map({isFetching: true}))
    case 'SEND_DETAIL':
      return state.merge(Map({
        isFetching: false,
        apiDetail: action.apiDetail
      }))
    default:
      return state
  }
}
