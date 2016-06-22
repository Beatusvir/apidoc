import { List, Map } from 'immutable'
import { viewApi, getApiList, setMethods } from '../src/core'
import { expect } from 'chai'

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

      expect(result).to.deep.equal(methods)
    })
  })

  describe('setMethods', () => {
    it('can set a list of methods', () => {
      const state = Map()
      const methods = List.of(require('../methods.json'))
      const nextState = setMethods(state, methods)

      expect(nextState).to.equal(Map({
        methods: List.of(require('../methods.json')),
        initialMethods: List.of(require('../methods.json'))
      }))
    })
  })
})
