import { expect } from 'chai'
import { List, Map, fromJS } from 'immutable'
import reducer from '../src/reducer'

describe('reducer', () => {
  it('handles VIEW_API', () => {
    const initialState = Map()
    const action = {type: 'VIEW_API', api: 1}
    const viewApi = reducer(initialState, action)

    expect(viewApi).to.equal(fromJS({
      api: 1
    }))
  })

  it('handles SET_METHODS', () => {
    const state = Map()
    const action = {
      type: 'SET_METHODS',
      methods: ['ActivarCliente']
    }
    const result = reducer(state, action)

    expect(result).to.equal(fromJS({
      methods: ['ActivarCliente'],
      initialMethods: ['ActivarCliente']
    }))
  })

})