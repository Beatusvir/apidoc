import {Map} from 'immutable'
import {viewApi, getApiList} from '../src/core'
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

  describe('apiList', () => {
    it('return list of apis', () => {
      const methods = require('../methods.json')

      const result = getApiList()

      expect(result).to.equal(methods)
    })
  })
})