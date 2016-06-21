import {expect} from 'chai'
import {Map, fromJS} from 'immutable'
import {reducer} from '../src/reducer'

describe('reducer', () => {
  it('handles VIEW_API', () => {
    const initialState = Map()
    const action = {type: 'VIEW_API', api: 1}
    const viewApi = reducer(initialState, action)

    expect(viewApi).to.equal(fromJS({
      api: 1
    }))
  })

})