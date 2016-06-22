import {viewApi, getApiList, INITIAL_STATE} from './core'

export default function reducer (state = INITIAL_STATE , action) {
  switch (action.type) {
    case 'VIEW_API':
      return viewApi(state, action.api)
    case 'LIST_API':
      return getApiList()
  }
  return state
}
