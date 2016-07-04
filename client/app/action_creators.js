export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  }
}

export function addApi(title){
  return {
    type: 'ADD_API',
    title
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

export function addApiClass(apiId, apiClass){
  return {
    type: 'ADD_API_CLASS',
    apiId,
    apiClass
  }
}

export function requestDetail(apiId) {
  return {
    type: 'REQUEST_DETAIL',
    apiId
  }
}

