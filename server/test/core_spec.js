import {Map} from 'immutable'
import {viewApi} from '../src/core'
import {expect} from 'chai'

describe('application logic', () => {
  describe('viewApi', () => {
    it('returns api', () => {
      const state = Map()
      const api = viewApi(state, 1)
      expect(api).to.equal(Map({
        api: 1
      }))
    })
  })
})