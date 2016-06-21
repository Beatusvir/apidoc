import {INITIAL_STATE, viewApi} from './core.js'

export default function reducer (state = INITIAL_STATE , action) {
  console.log(action)
  switch (action.type) {
    case 'VIEW_API':
      return viewApi(state, action.api)
  }
  return state
}
