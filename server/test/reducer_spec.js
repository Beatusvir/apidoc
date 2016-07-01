import { expect } from 'chai'
import { List, Map, fromJS } from 'immutable'
import reducer from '../src/reducer'

describe('reducer', () => {
  it('handles REQUEST_APIS', () => {
    const action = {
      type: 'REQUEST_APIS'
    }
    const state = Map()
    const newState = reducer(state, action)
    expect(newState.toJS()).to.deep.equal({
      isFetching: true
    })
  })

  it('handles SEND_APIS', () => {
    const state = Map()
    const action = {
      type: 'SEND_APIS',
      apis: []
    }
    const newState = reducer(state, action)

    expect(newState.toJS()).to.deep.equal({
      isFetching: false,
      apis: []
    })
  })

  it('handles ADD_API without apis', () => {
    const state = Map()
    const action = {
      type: 'ADD_API',
      api: {
        id: 1,
        title: 'some title'
      }
    }
    const newState = reducer(state, action)

    expect(newState.toJS()).to.deep.equal({
      apis: [
        { id: 1, title: 'some title' }
      ]
    })
  })

  it('handles ADD_API with existing apis', () => {
    const state = Map({
      apis: [
        { id: 1, title: 'some title' },
        { id: 2, title: 'some title 2' }
      ]
    })
    const action = {
      type: 'ADD_API',
      api: {
        id: 3,
        title: 'some title 3'
      }
    }
    const newState = reducer(state, action)

    expect(newState.toJS()).to.deep.equal({
      apis: [
        { id: 1, title: 'some title' },
        { id: 2, title: 'some title 2' },
        { id: 3, title: 'some title 3' }
      ]
    })
  })

  it('handles DELETE_API', () => {
    const state = Map({
      apis: [
        { id: 1, title: 'some title' },
        { id: 2, title: 'some title 2' },
        { id: 3, title: 'some title 3' }
      ]
    })
    const action = {
      type: 'DELETE_API',
      apiId: 2
    }
    const newState = reducer(state, action)

    expect(newState.toJS()).to.deep.equal({
      apis: [
        { id: 1, title: 'some title' },
        { id: 3, title: 'some title 3' }
      ]
    })
  })

  it('handles REQUEST_DETAIL', () => {
    const action = {
      type: 'REQUEST_DETAIL'
    }
    const state = Map()
    const newState = reducer(state, action)
    expect(newState.toJS()).to.deep.equal({
      isFetching: true
    })
  })

  it('handles SEND_DETAIL', () => {
    const state = Map()
    const action = {
      type: 'SEND_DETAIL',
      apiDetail: []
    }
    const newState = reducer(state, action)

    expect(newState.toJS()).to.deep.equal({
      isFetching: false,
      apiDetail: []
    })
  })
})
