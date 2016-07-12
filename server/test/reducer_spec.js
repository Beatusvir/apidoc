import { expect } from 'chai'
import { List, Map, fromJS } from 'immutable'
import reducer from '../src/reducer'
import { APIS_DELETE_SUCCESS } from '../src/actions'

describe('reducer', () => {
  it('handles APIS_DELETE_SUCCESS', () => {
    const state = Map({
      isFetching: true,
      apis: List.if(
        Map({ apiId: 1, title: 'title 1' }),
        Map({ apiId: 2, title: 'title 2' })
      )
    })
    const action = {
      type: APIS_DELETE_SUCCESS,
      apiId: 1
    }

    const newState = reducer(state, action)

    expect(newState.toJS()).to.deep.equal({
      isFetching: false,
      apis: [
        { apiId: 2, title: 'title 2' }
      ]
    })
  })
})
