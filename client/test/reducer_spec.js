import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'
import reducer from '../app/reducer'

describe('reducer', () => {
  it('handles SET_STATE', () => {
    // const initialState = Map()
    // const action = {
    //   type: 'SET_STATE',
    //   state: Map({
    //     apis: List.of(
    //       Map({
    //         id: 1,
    //         title: 'API Document 1'
    //       }),
    //       Map({
    //         id: 2,
    //         title: 'API Document 2'
    //       })
    //     ),
    //     apiDetail: List.of(
    //       Map({
    //         title: 'Method 1',
    //         description: 'Method content',
    //         items: List.of(
    //           Map({
    //             title: 'Method item 1',
    //             content: 'content 1'
    //           }),
    //           Map({
    //             title: 'Method item 2',
    //             content: 'content 2'
    //           }))
    //       }),
    //       Map({
    //         title: 'Method 2',
    //         description: 'Method content 2',
    //         items: List.of(
    //           Map({
    //             title: 'Method item 1',
    //             content: 'content 1'
    //           }),
    //           Map({
    //             title: 'Method item 2',
    //             content: 'content 2'
    //           }))
    //       }))
    //   })
    // }
    // const nextState = reducer(initialState, action)
    // expect(nextState).to.deep.equal(fromJS({
    //   apis: [
    //     {
    //       id: 1,
    //       title: 'API Document 1'
    //     },
    //     {
    //       id: 2,
    //       title: 'API Document 2'
    //     }
    //   ],
    //   apiDetail: [
    //     {
    //       title: 'Method 1',
    //       description: 'Method content',
    //       items: [
    //         {
    //           title: 'Method item 1',
    //           content: 'content 1'
    //         },
    //         {
    //           title: 'Method item 2',
    //           content: 'content 2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Method 2',
    //       description: 'Method content 2',
    //       items: [
    //         {
    //           title: 'Method item 1',
    //           content: 'content 1'
    //         },
    //         {
    //           title: 'Method item 2',
    //           content: 'content 2'
    //         }
    //       ]
    //     }
    //   ]
    // }))
  })

  it('handles SET_STATE with plain objects', () => {
    // const initialState = Map()
    // const action = {
    //   type: 'SET_STATE',
    //   state: {
    //     apis: [
    //       {
    //         id: 1,
    //         title: 'API Document 1'
    //       },
    //       {
    //         id: 2,
    //         title: 'API Document 2'
    //       }
    //     ],
    //     apiDetail: [
    //       {
    //         title: 'Method 1',
    //         description: 'Method content',
    //         items: [
    //           {
    //             title: 'Method item 1',
    //             content: 'content 1'
    //           },
    //           {
    //             title: 'Method item 2',
    //             content: 'content 2'
    //           }
    //         ]
    //       },
    //       {
    //         title: 'Method 2',
    //         description: 'Method content 2',
    //         items: [
    //           {
    //             title: 'Method item 1',
    //             content: 'content 1'
    //           },
    //           {
    //             title: 'Method item 2',
    //             content: 'content 2'
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }

    // const nextState = reducer(initialState, action)
    // expect(nextState).to.deep.equal(fromJS({
    //   apis: [
    //     {
    //       id: 1,
    //       title: 'API Document 1'
    //     },
    //     {
    //       id: 2,
    //       title: 'API Document 2'
    //     }
    //   ],
    //   apiDetail: [
    //     {
    //       title: 'Method 1',
    //       description: 'Method content',
    //       items: [
    //         {
    //           title: 'Method item 1',
    //           content: 'content 1'
    //         },
    //         {
    //           title: 'Method item 2',
    //           content: 'content 2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Method 2',
    //       description: 'Method content 2',
    //       items: [
    //         {
    //           title: 'Method item 1',
    //           content: 'content 1'
    //         },
    //         {
    //           title: 'Method item 2',
    //           content: 'content 2'
    //         }
    //       ]
    //     }
    //   ]
    // }))
  })

  it('handles GET_DETAIL', () => {
    // const action = {
    //   type: 'GET_DETAIL',
    //   apiId: 1
    // }

    // const nextState = reducer(undefined, action)

    // expect(nextState.toJS()).to.deep.equal({
    //   isFetching: false,
    //   apiDetail: [
    //     {
    //       title: 'Method title',
    //       description: 'some description',
    //       items: [
    //         { title: 'Some method', content: 'Method content' },
    //         { title: 'Some method', content: 'Method content' }
    //       ]
    //     }
    //   ]
    // })
  })

  it('handles ADD_API', () => {
    // const initialState = Map({
    //   apis: List([
    //     { id: 1, title: 'title api 1' },
    //     { id: 2, title: 'title api 2' }
    //   ])
    // })

    // const action = {
    //   type: 'ADD_API',
    //   api: 'some title'
    // }

    // const nextState = reducer(initialState, action)
    // expect(nextState.toJS()).to.deep.equal(({
    //   apis: [
    //     { id: 1, title: 'title api 1' },
    //     { id: 2, title: 'title api 2' },
    //     { id: 0, title: 'some title' }
    //   ]
    // }))
  })

  it('handles DELETE_ITEM', () => {
    // const initialState = fromJS({
    //   apis: [
    //     { id: 1, title: 'title api 1' },
    //     { id: 2, title: 'title api 2' }
    //   ]
    // })

    // const action = {
    //   type: 'DELETE_ITEM',
    //   apiId: 1
    // }

    // const nextState = reducer(initialState, action)
    // expect(nextState.toJS()).to.deep.equal(({
    //   apis: [
    //     { id: 2, title: 'title api 2' }
    //   ]
    // }))
  })

  it('handles REQUEST_APIS', () => {
    // var initialState = Map()
    // var action = {
    //   type: 'REQUEST_APIS'
    // }
    // var nextState = reducer(initialState, action)

    // expect(nextState.toJS()).to.deep.equal({
    //   isFetching: true
    // })
  })

})
