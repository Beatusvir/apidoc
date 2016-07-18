// Every async call is formed with 3 actions: request, success and failure
// to keep every state of the call in check
import fetch from 'isomorphic-fetch'

export const SET_STATE = 'SET_STATE'

export function setState(state) {
  return { type: SET_STATE, state }
}

export const SELECT_API = 'SELECT_API'

export function selectApi(apiTitle) {
  return { type: SELECT_API, apiTitle }
}

export const FILTER = 'FILTER'

export function filter(filter) {
  return { type: FILTER, filter }
}

export const CLEAR_ERROR = 'CLEAR_ERROR'

export function clearError() {
  return { type: CLEAR_ERROR }
}

export const APIS_REQUEST = 'APIS_REQUEST'
export const APIS_SUCCESS = 'APIS_SUCCESS'
export const APIS_FAILURE = 'APIS_FAILURE'

export function apisRequest() {
  return { type: APIS_REQUEST }
}

export function apisSuccess(apis) {
  return { type: APIS_SUCCESS, apis }
}

export function apisFailure(error) {
  return { type: APIS_FAILURE, error }
}

export function fetchApis() {
  return dispatch => {
    dispatch(apisRequest())
    return fetch('http://localhost:8081/api/apis')
      .then(response => response.json())
      .then(apis => dispatch(apisSuccess(apis)))
      .catch(err => dispatch(apisFailure(err)))
  }
}

export const APIS_ADD_REQUEST = 'APIS_ADD_REQUEST'
export const APIS_ADD_SUCCESS = 'APIS_ADD_SUCCESS'
export const APIS_ADD_FAILURE = 'APIS_ADD_FAILURE'

export function apisAddRequest(newApi) {
  return { type: APIS_ADD_REQUEST, newApi }
}

export function apisAddSuccess(newApi) {
  return { type: APIS_ADD_SUCCESS, newApi }
}

export function apisAddFailure(error) {
  return { type: APIS_ADD_FAILURE, error }
}

export function fetchAddApi(newApi) {
  return dispatch => {
    dispatch(apisAddRequest(newApi))
    return fetch('http://localhost:8081/api/apis', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newApi)
    })
      .then(response => response.json())
      .then(result => dispatch(apisAddSuccess(result.newApi)) )
      .catch(err => dispatch(apisAddFailure(err)))
  }
}

export const APIS_DELETE_REQUEST = 'APIS_DELETE_REQUEST'
export const APIS_DELETE_SUCCESS = 'APIS_DELETE_SUCCESS'
export const APIS_DELETE_FAILURE = 'APIS_DELETE_FAILURE'

export function apisDeleteRequest(apiId) {
  return { type: APIS_DELETE_REQUEST, apiId }
}

export function apisDeleteSuccess(apiId) {
  return { type: APIS_DELETE_SUCCESS, apiId }
}

export function apisDeleteFailure(error) {
  return { type: APIS_DELETE_FAILURE, error }
}

export function fetchDeleteApi(apiId) {
  return dispatch => {
    dispatch(apisDeleteRequest(apiId))
    return fetch(`http://localhost:8081/api/apis/${apiId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(apis => dispatch(apisDeleteSuccess(apiId)))
      .catch(err => dispatch(apisDeleteFailure(err)))
  }
}

export const APIS_DETAIL_REQUEST = 'APIS_DETAIL_REQUEST'
export const APIS_DETAIL_SUCCESS = 'APIS_DETAIL_SUCCESS'
export const APIS_DETAIL_FAILURE = 'APIS_DETAIL_FAILURE'

export function apisDetailRequest(apiId) {
  return { type: APIS_DETAIL_REQUEST, apiId }
}

export function apisDetailSuccess(apiDetail) {
  return { type: APIS_DETAIL_SUCCESS, apiDetail }
}

export function apisDetailFailure(error) {
  return { type: APIS_DETAIL_FAILURE, error }
}

export function fetchApisDetail(apiId) {
  return dispatch => {
    dispatch(apisDetailRequest(apiId))
    return fetch(`http://localhost:8081/api/apis/${apiId}`)
      .then(response => response.json())
      .then(apiDetail => dispatch(apisSuccess(apiDetail)))
  }
}

export const APIS_CALL_ADD_REQUEST = 'APIS_CALL_ADD_REQUEST'
export const APIS_CALL_ADD_SUCCESS = 'APIS_CALL_ADD_SUCCESS'
export const APIS_CALL_ADD_FAILURE = 'APIS_CALL_ADD_FAILURE'

export function apisCallAddRequest(apiCall) {
  return { type: APIS_CALL_ADD_REQUEST, apiCall }
}

export function apisCallAddSuccess(apiCall) {
  return { type: APIS_CALL_ADD_SUCCESS, apiCall }
}

export function apisCallAddFailure(error) {
  return { type: APIS_CALL_ADD_FAILURE, error }
}

export const APIS_CALL_DELETE_REQUEST = 'APIS_CALL_DELETE_REQUEST'
export const APIS_CALL_DELETE_SUCCESS = 'APIS_CALL_DELETE_SUCCESS'
export const APIS_CALL_DELETE_FAILURE = 'APIS_CALL_DELETE_FAILURE'

export function apisCallDeleteRequest(callId) {
  return { type: APIS_CALL_DELETE_REQUEST, callId }
}
export function apisCallDeleteSuccess(callId) {
  return { type: APIS_CALL_DELETE_SUCCESS, callId }
}
export function apisCallDeleteFailure(error) {
  return { type: APIS_CALL_DELETE_FAILURE, error }
}

export const APIS_CALL_REQUEST = 'APIS_CALL_REQUEST'
export const APIS_CALL_SUCCESS = 'APIS_CALL_SUCCESS'
export const APIS_CALL_FAILURE = 'APIS_CALL_FAILURE'

export function apisCallRequest(callId) {
  return { type: APIS_CALL_REQUEST, callId }
}
export function apisCallSuccess(callId) {
  return { type: APIS_CALL_SUCCESS, callId }
}
export function apisCallFailure(error) {
  return { type: APIS_CALL_FAILURE, error }
}

export const APIS_CALL_EDIT_REQUEST = 'APIS_CALL_EDIT_REQUEST'
export const APIS_CALL_EDIT_SUCCESS = 'APIS_CALL_EDIT_SUCCESS'
export const APIS_CALL_EDIT_FAILURE = 'APIS_CALL_EDIT_FAILURE'

export function apisCallEditRequest(callId) {
  return { type: APIS_CALL_EDIT_REQUEST, callId }
}
export function apisCallEditSuccess(call) {
  return { type: APIS_CALL_EDIT_SUCCESS, call }
}
export function apisCallEditFailure(error) {
  return { type: APIS_CALL_EDIT_FAILURE, error }
}

