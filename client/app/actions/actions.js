// Every async call is formed with 3 actions: request, success and failure
// to keep every state of the call in check

export const SET_STATE = 'SET_STATE'

export function setState (state) {
  return { type: SET_STATE, state}
}

export const SELECT_API = 'SELECT_API'

export function selectApi(apiId, apiTitle) {
  return { type: SELECT_API, apiId, apiTitle }
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

export function apisRequest () {
  return { type: APIS_REQUEST }
}

export function apisSuccess (apis) {
  return { type: APIS_SUCCESS, apis}
}

export function apisFailure (error) {
  return { type: APIS_FAILURE, error}
}

export const APIS_ADD_REQUEST = 'APIS_ADD_REQUEST'
export const APIS_ADD_SUCCESS = 'APIS_ADD_SUCCESS'
export const APIS_ADD_FAILURE = 'APIS_ADD_FAILURE'

export function apisAddRequest (newApi) {
  return { type: APIS_ADD_REQUEST, newApi}
}

export function apisAddSuccess (newApi) {
  return { type: APIS_ADD_SUCCESS, newApi}
}

export function apisAddFailure (error) {
  return { type: APIS_ADD_FAILURE, error}
}

export const APIS_DELETE_REQUEST = 'APIS_DELETE_REQUEST'
export const APIS_DELETE_SUCCESS = 'APIS_DELETE_SUCCESS'
export const APIS_DELETE_FAILURE = 'APIS_DELETE_FAILURE'

export function apisDeleteRequest (apiId) {
  return { type: APIS_DELETE_REQUEST, apiId}
}

export function apisDeleteSuccess (apiId) {
  return { type: APIS_DELETE_SUCCESS, apiId}
}

export function apisDeleteFailure (error) {
  return { type: APIS_DELETE_FAILURE, error}
}

export const APIS_DETAIL_REQUEST = 'APIS_DETAIL_REQUEST'
export const APIS_DETAIL_SUCCESS = 'APIS_DETAIL_SUCCESS'
export const APIS_DETAIL_FAILURE = 'APIS_DETAIL_FAILURE'

export function apisDetailRequest (apiId) {
  return { type: APIS_DETAIL_REQUEST, apiId}
}

export function apisDetailSuccess (apis) {
  return { type: APIS_DETAIL_SUCCESS, apis}
}

export function apisDetailFailure (error) {
  return { type: APIS_DETAIL_FAILURE, error}
}

export const APIS_CALL_ADD_REQUEST = 'APIS_CALL_ADD_REQUEST'
export const APIS_CALL_ADD_SUCCESS = 'APIS_CALL_ADD_SUCCESS'
export const APIS_CALL_ADD_FAILURE = 'APIS_CALL_ADD_FAILURE'

export function apisCallAddRequest (apiCall) {
  return { type: APIS_CALL_ADD_REQUEST, apiCall}
}

export function apisCallAddSuccess (apiCall) {
  return { type: APIS_CALL_ADD_SUCCESS, apiCall}
}

export function apisCallAddFailure (error) {
  return { type: APIS_CALL_ADD_FAILURE, error}
}

export const APIS_CALL_DELETE_REQUEST = 'APIS_CALL_DELETE_REQUEST'
export const APIS_CALL_DELETE_SUCCESS = 'APIS_CALL_DELETE_SUCCESS'
export const APIS_CALL_DELETE_FAILURE = 'APIS_CALL_DELETE_FAILURE'

export function apisCallDeleteRequest (callId) {
  return { type: APIS_CALL_DELETE_REQUEST, callId}
}
export function apisCallDeleteSuccess (callId) {
  return { type: APIS_CALL_DELETE_SUCCESS, callId}
}
export function apisCallDeleteFailure (error) {
  return { type: APIS_CALL_DELETE_FAILURE, error}
}
