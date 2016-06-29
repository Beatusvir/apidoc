import { List, Map, toJS } from 'immutable'
import { viewApi, getApis, setMethods } from '../src/core'
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
      const state = Map()
      const result = getApis(state)

      expect(result.toJS()).to.deep.equal({
        apis: [
          {
            id: 1,
            title: 'API Document 1'
          },
          {
            id: 2,
            title: 'API Document 2'
          }
        ]
      })
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
