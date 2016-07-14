export const FILTER = 'FILTER'

export function filter(filter) {
  return { type: FILTER, filter }
}

export const APIS_REQUEST = 'APIS_REQUEST'
export const APIS_SUCCESS = 'APIS_SUCCESS'
export const APIS_FAILURE = 'APIS_FAILURE'

export function apisRequest () {
  return { type: APIS_REQUEST, isFetching: true }
}

export function apisSuccess (apis) {
  return { type: APIS_SUCCESS, apis, isFetching: false}
}

export function apisFailure (error) {
  return { type: APIS_FAILURE, error, isFetching: false}
}

export const APIS_DELETE_REQUEST = 'APIS_DELETE_REQUEST'
export const APIS_DELETE_SUCCESS = 'APIS_DELETE_SUCCESS'
export const APIS_DELETE_FAILURE = 'APIS_DELETE_FAILURE'

export function apisDeleteRequest(apiId){
  return { type: APIS_DELETE_REQUEST, apiId, isFetching: true }
}

export function apisDeleteSuccess(apiId){
  return { type: APIS_DELETE_SUCCESS, apiId, isFetching: false }
}

export function apisDeleteFailure(error){
  return { type: APIS_DELETE_FAILURE, error, isFetching: false }
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

export const APIS_CALL_ADD_REQUEST = 'APIS_CALL_ADD_REQUEST'
export const APIS_CALL_ADD_SUCCESS = 'APIS_CALL_ADD_SUCCESS'
export const APIS_CALL_ADD_FAILURE = 'APIS_CALL_ADD_FAILURE'

export function apisCallAddRequest (apiCall) {
  return { type: APIS_CALL_ADD_REQUEST, apiCall}
}

export function apisCallAddSuccess () {
  return { type: APIS_CALL_ADD_SUCCESS}
}

export function apisCallAddFailure (error) {
  return { type: APIS_CALL_ADD_FAILURE, error}
}

export const APIS_DETAIL_REQUEST = 'APIS_DETAIL_REQUEST'
export const APIS_DETAIL_SUCCESS = 'APIS_DETAIL_SUCCESS'
export const APIS_DETAIL_FAILURE = 'APIS_DETAIL_FAILURE'

export function apisDetailRequest (apiId) {
  return { type: APIS_DETAIL_REQUEST, apiId}
}

export function apisDetailSuccess (apiDetail) {
  return { type: APIS_DETAIL_SUCCESS, apiDetail}
}

export function apisDetailFailure (error) {
  return { type: APIS_DETAIL_FAILURE, error}
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

//  TODO refactoring this

export function addApi (api) {
  return { type: 'ADD_API', api}
}

export function deleteApi (apiId) {
  return { type: 'DELETE_API', apiId}
}

export function requestDetail (apiId) {
  return { type: 'REQUEST_DETAIL', apiId}
}

export function sendDetail (apiDetail) {
  return { type: 'SEND_DETAIL', apiDetail}
}

export function errorOcurred(error) {
  return { type: 'LAST_ERROR', error}
}

export function sendApiTitle(apiTitle){
  return { type: 'SEND_API_TITLE', apiTitle }
}

export function clearApiDetail() {
  return { type: 'CLEAR_API_DETAIL' }
}
