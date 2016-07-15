import { Map, List, fromJS } from 'immutable'
import { combineReducers } from 'redux'
import {
  SET_STATE, SELECT_API, CLEAR_ERROR,
  APIS_REQUEST,
  APIS_ADD_REQUEST,
  APIS_DELETE_REQUEST,
  APIS_DETAIL_REQUEST,
  APIS_CALL_ADD_REQUEST,
  APIS_CALL_DELETE_REQUEST,
  APIS_CALL_REQUEST,
  APIS_CALL_EDIT_REQUEST
} from '../actions/actions'

const initialState = Map({
  isFetching: false,
  apis: List(),
  selectedApiId: null,
  selectedApiTile: null,
  error: null
})

const defaultRequestState = (state) => {
  return state.merge(Map({
    isFetching: true
  }))
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_STATE:
      return state.merge(action.state)
    case APIS_REQUEST:
    case APIS_DETAIL_REQUEST:
    case APIS_CALL_ADD_REQUEST:
    case APIS_CALL_DELETE_REQUEST:
    case APIS_DELETE_REQUEST:
    case APIS_CALL_REQUEST:
    APIS_CALL_EDIT_REQUEST
      return defaultRequestState(state)

    default:
      return state;
  }
}