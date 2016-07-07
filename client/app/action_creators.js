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

export function addApiClass(apiClass){
  return {
    type: 'ADD_API_CLASS',
    apiClass
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

