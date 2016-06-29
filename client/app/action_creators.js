export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  }
}

export function getDetail(apiId) {
  return {
    type: 'GET_DETAIL',
    apiId: apiId
  }
}
