import { Map, fromJS } from 'immutable'

function setState(state, newState) {
  return state.merge(newState)
}

function addApi(state, api) {
  const newApi = Map({ apiId: 0, text: api })
  return state.update('apis', (apis) => apis.push(newApi)
  )
}

function getDetail(state, id) {
  return state.merge(
    {
      apiDetail: [
        {
          title: 'Method title',
          description: 'some description',
          items: [
            { title: 'Some method', content: 'Method content' },
            { title: 'Some method', content: 'Method content' }
          ]
        }
      ]
    }
  )
}

function deleteItem(state, itemId) {
  return state.update('apis',
    (apis) => apis.filterNot(
      (item) => item.get('id') === itemId
    )
  )
}

function insertedId(state, apiId) {
  return state.merge({
    insertedId: apiId
  })
}


export default function (state = Map({
  isFetching: false
}), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'ADD_API':
      return addApi(state, action.api)
    case 'GET_DETAIL':
      return getDetail(state, action.apiId)
    case 'DELETE_ITEM':
      return deleteItem(state, action.apiId)
    case 'INSERTED_ID':
      return insertedId(state, action.insertedId)
  }
  return state
}
