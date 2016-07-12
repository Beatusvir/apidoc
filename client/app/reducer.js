import { Map, List, fromJS } from 'immutable'

function setState(state, newState) {
  return state.merge(newState)
}

function addApi(state, newApi) {
  if (state.get('apis') === undefined){
    return state.merge(Map({
      apis: List.of(newApi)
    }))
  }
  return state.update('apis', (apis) => apis.push(newApi))
}

function deleteApi(state, apiId) {
  return state.update('apis',
    (apis) => apis.filterNot(
      (item) => item.get('id') === apiId
    )
  )
}

function insertedId(state, apiId) {
  return state.merge({
    insertedId: apiId
  })
}

function requestApis(state) {
  return state.merge(Map({
    isFetching: true
  }))
}

function getDetail(state, apiId) {
  return state.merge(Map({
    isFetching: false,
    apiDetail: List.of(
      Map({
        title: 'Method title',
        description: 'some description',
        items: List.of(
          Map({ title: 'Some method', content: 'Method content' }),
          Map({ title: 'Some method', content: 'Method content' })
        )
      })
    )
  }))
}

function deleteMethod(state, methodId) {
  return state.update('apiDetail',
    (apiDetail) => apiDetail.filterNot(
      (item) => item.get('methodId') === methodId
    )
  )
}

function addApiMethod(state, apiMethod){
  if (state.get('apiDetail') === undefined) {
    return state.merge(Map({
      apiDetail: List.of(apiMethod)
    }))
  }
  return state.update('apiDetail', (apiDetail) => apiDetail.push(apiMethod))
}

export default function (state = Map({
  isFetching: false
}), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'GET_DETAIL':
      {
        return getDetail(state, action.apiId)
      }
    case 'ADD_API':
      return addApi(state, action.newApi)
    case 'DELETE_API':
      return deleteApi(state, action.apiId)
    case 'INSERTED_ID':
      return insertedId(state, action.insertedId)
    case 'REQUEST_APIS':
      return requestApis(state)
    case 'ADD_API_METHOD':
      return addApiMethod(state, action.apiMethod)
    case 'CLEAR_API_DETAIL':
      {
        return state.delete('apiDetail')
      }
    case 'CLEAR_API_TITLE':
      {
        return state.merge(Map({
          selectedApiTitle: ''
        }))
      }
    case 'DELETE_METHOD':
      return deleteMethod(state, action.methodId)
    case 'SET_SELECTED_API':
      return state.merge(Map({
        selectedApiId: action.apiId,
        selectedApiTitle: action.apiTitle
      }))
  }
  return state
}
