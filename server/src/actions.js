export function requestApis(){
  return {
    type: 'REQUEST_APIS'
  }
}

export function sendApis(apis){
  return {
    type: 'SEND_APIS',
    apis
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

export function requestDetail(apiId){
  return {
    type: 'REQUEST_DETAIL',
    apiId
  }
}

export function sendDetail(apiDetail){
  return {
    type: 'SEND_DETAIL',
    apiDetail
  }
}