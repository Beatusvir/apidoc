import { Map, List, fromJS } from 'immutable'
import { combineReducers } from 'redux'
import {
  SET_STATE, SELECT_API, CLEAR_ERROR,
  APIS_REQUEST, APIS_SUCCESS, APIS_FAILURE,
  APIS_ADD_REQUEST, APIS_ADD_SUCCESS, APIS_ADD_FAILURE,
  APIS_DELETE_REQUEST, APIS_DELETE_SUCCESS, APIS_DELETE_FAILURE,
  APIS_DETAIL_REQUEST, APIS_DETAIL_SUCCESS, APIS_DETAIL_FAILURE,
  APIS_CALL_ADD_REQUEST,
  APIS_CALL_DELETE_REQUEST,
  APIS_CALL_REQUEST,
  APIS_CALL_EDIT_REQUEST
} from '../actions/actions'

const initialState = Map({
  isFetching: false,
  apis: List(),
  selectedApiId: null,
  selectedApiTitle: null,
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
      return state.merge(Map({ selectedApiTitle: action.apiTitle }))
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
        apis: state.get('apis').push(action.newApi),
        selectedApiId: action.newApi._id,
        selectedApiTitle: action.newApi.title
      }))
    case APIS_ADD_FAILURE:
      return state.merge(Map({ error: action.error.message }))
    case APIS_REQUEST:
    case APIS_DETAIL_REQUEST:
    case APIS_CALL_ADD_REQUEST:
    case APIS_CALL_DELETE_REQUEST:
    case APIS_DELETE_REQUEST:
    case APIS_CALL_REQUEST:
      return defaultRequestState(state)

    default:
      return state;
  }
}