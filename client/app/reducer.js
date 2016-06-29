import { Map, fromJS } from 'immutable'

function setState (state, newState) {
  return state.merge(newState)
}

const getApis = (state, apiList) => {
  return state.merge({
    apis: fromJS(apiList)
  })
}

function getDetail (state, id) {
  return state.merge(
    {
      apiDetail: []
    }
  )
}

function addItem (state, title) {
  // TODO add api and return new list
  const newApiId = state.get('apis').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1
  const newItem = Map({
    id: newApiId, title: title
  })
  const newState = state.update('apis', (apis) => apis.push(newItem))
  return newState
}

function deleteItem (state, itemId) {
  return state.update('apis',
    (apis) => apis.filterNot(
      (item) => item.get('id') === itemId
    )
  )
}

export default function (state = Map() , action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'GET_APIS':
      return getApis(state, action.apiList)
    case 'GET_DETAIL':
      return getDetail(state, action.apiId)
    case 'ADD_ITEM':
      return addItem(state, action.title)
    case 'DELETE_ITEM':
      return deleteItem(state, action.apiId)
  }
  return state
}
