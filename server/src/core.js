import { List, Map } from 'immutable'

export const INITIAL_STATE = Map()

export function viewApi (state, api) {
  return state.set('api', api)
}

export function getApiList () {
  let methods = require('../methods.json')
  return methods
}

export function setMethods (state, methods) {
  const list = List(methods)
  return state.set('methods', list)
    .set('initialMethods', list)
}
