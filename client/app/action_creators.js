export function setState(state) {
  return {
    type: 'SET_STATE',
    state
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

