import { List, Map } from 'immutable'
import { deleteApiFromDb, addApiToDb, fetchApisFromDb, fetchApiDetailFromDb,
  addApiCallToDb, getApiTitleFromDb, deleteMethodFromDb } from './core'

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
    case 'SELECT_API': {
      return state.merge(Map({
        selectedApiId: action.apiId,
        selectedApiTitle: action.apiTitle
      }))
    }
    case 'CLEAR_ERROR':
      return state.merge(Map({
        error: null
      }))
    case 'APIS_REQUEST':
      fetchApisFromDb()
      return state.merge(Map({isFetching: true}))
    case 'APIS_SUCCESS':
      return state.merge(Map({
        isFetching: false,
        apis: action.apis
      }))
    case 'APIS_FAILURE':
      return state.merge(Map({
        isFetching: false,
        error: action.error
      }))
    case 'APIS_DELETE_REQUEST':
      deleteApiFromDb(action.apiId)
      return state.merge(Map({
        isFetching: true
      }))
    case 'APIS_DELETE_SUCCESS':
    {
      let newApiList = state.get('apis').filter((apis) => apis.apiId != action.apiId)
      if (newApiList === undefined){
        newApiList = List()
      }
      return state.merge(Map({
        isFetching: false,
        apis: newApiList
      }))
    }
    case 'APIS_DELETE_FAILURE':
      return state.merge(Map({
        isFetching: false,
        error: action.error
      }))
    case 'APIS_ADD_REQUEST':
      addApi(action.newApi)
      return state.merge(Map({
        isFetching: true
      }))
    case 'APIS_ADD_SUCCESS':
      return state.merge(Map({
        isFetching: false,
        apis: state.update('apis', (apis) => apis.push(action.newApi))
      }))

    case 'APIS_CALL_ADD_REQUEST':
      addApiCallToDb(action.apiCall)
      return state.merge(Map({
        isFetching: true
      }))

    case 'APIS_CALL_ADD_SUCCESS':
      return state.merge(Map({
        isFetching: false
      }))
    
    case 'APIS_CALL_DELETE_REQUEST':
      deleteMethodFromDb(action.callId)
      return state.merge(Map({
        isFetching: true
      }))

    case 'APIS_CALL_DELETE_SUCCESS':
      let newCallList = state.get('apiDetail').filter((apiDetail) => apiDetail.methodId != action.methodId)
      if (newCallList === undefined){
        newCallList = List()
      }
      return state.merge(Map({
        isFetching: false,
        apiDetail: newCallList
      }))

    case 'APIS_DETAIL_REQUEST':
      fetchApiDetailFromDb(action.apiId)
      return state.merge(Map({
        isFetching: true
      }))
    case 'APIS_DETAIL_SUCCESS':
      if (action.apiDetail.length === 0){
        return state.merge(Map({
          apiDetail: List(),
          isFetching: false
      }))
      }
      return state.merge(Map({
        apiDetail: action.apiDetail,
        isFetching: false
      }))
// TODO refactor this
    case 'ADD_API':
      addApi(action.newApi)
      return state.merge(Map({isFetching: true}))
    case 'ADD_API_METHOD':
      addApiMethodToDb(action.apiMethod)
      return state
    case 'REQUEST_DETAIL':
      fetchApiDetailFromDb(action.apiId)
      return state.merge(Map({
        isFetching: true,
        selectedApiId: action.apiId
      }))
    case 'SEND_DETAIL':
      return state.merge(Map({
        isFetching: false,
        apiDetail: action.apiDetail
      }))
    case 'LAST_ERROR':
      return state.merge(Map({
        lastError: action.error
      }))
    case 'CLEAR_ERROR':
      {
      return state.merge(Map({
        lastError: ''
      }))
      }
    case 'REQUEST_API_TITLE':
      {
      getApiTitleFromDb(action.apiId)
      return state.merge(Map({isFetching: true}))
      }
    case 'SEND_API_TITLE':
      {
      return state.merge(Map({
        isFetching: false,
        selectedApiTitle: action.apiTitle
      }))
      }
    case 'DELETE_METHOD':
      {
      deleteMethodFromDb(action.methodId)
      return state
      }
    case 'CLEAR_API_DETAIL':
      {
      return state.delete('apiDetail')
      }
    default:
      return state
  }
}
