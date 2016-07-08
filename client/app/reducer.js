import { Map, fromJS } from 'immutable'

function setState (state, newState) {
  return state.merge(newState)
}

function addApi (state, title) {
  const newApi = Map({ id: 0, title})
  let newState = state.update('isFetching', (isFetching) => true)
  return newState.update('apis', (apis) => apis.push(newApi))
}

function deleteItem (state, itemId) {
  return state.update('apis',
    (apis) => apis.filterNot(
      (item) => item.get('id') === itemId
    )
  )
}

function insertedId (state, apiId) {
  return state.merge({
    insertedId: apiId
  })
}

function requestApis (state) {
  return state.merge(Map({
    isFetching: true
  }))
}

export default function (state = Map({
    isFetching: false
  }) , action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'ADD_API':
      return addApi(state, action.title)
    case 'DELETE_ITEM':
      return deleteItem(state, action.apiId)
    case 'INSERTED_ID':
      return insertedId(state, action.insertedId)
    case 'REQUEST_APIS':
      return requestApis(state)
    case 'ADD_API_METHOD':
      return state.merge(Map({
        isFetching: true
      }))
  }
  return state
}
