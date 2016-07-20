import { Map, List, fromJS } from 'immutable'
import { combineReducers } from 'redux'
import {
  SET_STATE, SELECT_API, CLEAR_ERROR,
  API_TITLE_REQUEST, API_TITLE_SUCCESS, API_TITLE_FAILURE,
  APIS_REQUEST, APIS_SUCCESS, APIS_FAILURE,
  APIS_ADD_REQUEST, APIS_ADD_SUCCESS, APIS_ADD_FAILURE,
  APIS_DELETE_REQUEST, APIS_DELETE_SUCCESS, APIS_DELETE_FAILURE,
  APIS_DETAIL_REQUEST, APIS_DETAIL_SUCCESS, APIS_DETAIL_FAILURE,
  APIS_CALL_ADD_REQUEST, APIS_CALL_ADD_SUCCESS, APIS_CALL_ADD_FAILURE,
  APIS_CALL_DELETE_REQUEST, APIS_CALL_DELETE_SUCCESS, APIS_CALL_DELETE_FAILURE,
  APIS_CALL_REQUEST,
  APIS_CALL_EDIT_REQUEST
} from '../actions/actions'

const initialState = Map({
  isFetching: false,
  apis: List(),
  apiId: null,
  apiTitle: null,
  error: null
})

const defaultRequestState = (state) => {
  return state.merge(Map({
    isFetching: true
  }))
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.state)
    case SELECT_API:
      return state.merge(Map({ apiTitle: action.apiTitle }))
    case CLEAR_ERROR:
      return state.merge(Map({ error: null }))
    case APIS_SUCCESS:
      return state.merge(Map({ isFetching: false, apis: action.apis }))
    case APIS_DETAIL_SUCCESS:
      return state.merge(Map({
        apiDetail: action.apiDetail,
        isFetching: false
      }))
    case APIS_DELETE_SUCCESS:
      return state.merge(Map({
        isFetching: false,
        apis: state.get('apis').filter(apis => apis._id !== action.apiId)
      }))
    case APIS_ADD_SUCCESS:
      return state.merge(Map({
        isFetching: false,
        apis: state.get('apis').push(action.newApi),
        apiId: action.newApi._id,
        apiTitle: action.newApi.title
      }))
    case APIS_ADD_FAILURE:
      return state.merge(Map({ isFetching: false, error: action.error.message }))
    case APIS_CALL_ADD_SUCCESS:
      return state.merge(Map({ isFetching: false }))
    case API_TITLE_SUCCESS:
      return state.merge(Map({ isFetching: false, apiId: action.apiId, apiTitle: action.apiTitle }))
    case API_TITLE_FAILURE:
      return state.merge(Map({ isFetching: false, error: action.err }))
    case APIS_CALL_DELETE_SUCCESS:
      return state.merge(Map({ isFetching: false,  apiDetail: state.get('apiDetail').filter(apiDetail => apiDetail._id !== action.callId) }))
    case APIS_CALL_DELETE_FAILURE:
      return state.merge(Map({ isFetching: false, error: action.err }))
    case APIS_REQUEST:
    case APIS_DETAIL_REQUEST:
    case APIS_CALL_ADD_REQUEST:
    case APIS_CALL_DELETE_REQUEST:
    case APIS_DELETE_REQUEST:
    case APIS_CALL_REQUEST:
    case API_TITLE_REQUEST:
      return defaultRequestState(state)

    default:
      return state;
  }
}