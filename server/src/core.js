import {Map} from 'immutable'

export const INITIAL_STATE = Map()

export function viewApi(state, api){
  return state.set('api', api)
}