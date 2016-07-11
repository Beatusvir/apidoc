export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  }
}

export function addApi(newApi){
  return {
    type: 'ADD_API',
    newApi
  }
}

export function insertedId(){
  return {
    type: 'INSERTED_ID',
    insertedId
  }
}

export function deleteApi(apiId){
  return {
    type: 'DELETE_API',
    apiId
  }
}

export function requestApis() {
  return {
    type: 'REQUEST_APIS'
  }
}

export function addApiMethod(apiMethod){
  return {
    type: 'ADD_API_METHOD',
    apiMethod
  }
}

export function requestDetail(apiId) {
  return {
    type: 'REQUEST_DETAIL',
    apiId
  }
}

export function clearError() {
  return {
    type: 'CLEAR_ERROR'
  }
}

export function requestApiTitle(apiId) {
  return {
    type: 'REQUEST_API_TITLE',
    apiId
  }
}

export function deleteMethod(methodId){
  return { type: 'DELETE_METHOD', methodId }
}

export function clearDetail() {
  return { type: 'CLEAR_API_DETAIL' }
}

export function clearApiTitle() {
  return { type: 'CLEAR_API_TITLE' }
}