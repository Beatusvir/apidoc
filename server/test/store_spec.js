import {Map, fromJS} from 'immutable'
import {expect} from 'chai'

import makeStore from '../src/store'

describe('store', () => {
  it('is a Redux store configured with correct reducer', () => {
    const store = makeStore()

    expect(store.getState()).to.equal(Map())

    store.dispatch({
      type: 'VIEW_API',
      api: 1
    })

    expect(store.getState()).to.equal(fromJS({
      api: 1
    }))
  })
})