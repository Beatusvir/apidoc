export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  }
}

export function addApi(api){
  return {
    type: 'ADD_API',
    api
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

export function requestDetail(apiId) {
  return {
    type: 'REQUEST_DETAIL',
    apiId
  }
}

