import { getDetail, getApis, INITIAL_STATE } from './core'

export default function reducer (state = INITIAL_STATE , action) {
  switch (action.type) {
    case 'GET_DETAIL':
      return getDetail(state, action.apiId)
    case 'SET_APIS':
      return getApis(state)
  }
  return state
}
