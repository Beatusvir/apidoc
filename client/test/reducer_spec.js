import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'
import reducer from '../app/reducers/reducer'

describe('reducer', () => {
  it('handles SET_STATE with undefined state', () => {
    const action = {
      type: 'SET_STATE'
    }

    const nextState = reducer(undefined, action)

    expect(nextState.toJS()).to.deep.equal({
      isFetching: false,
      apis: [],
      selectedApiId: null,
      selectedApiTile: null,
      error: null
    })
  })

  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: Map({
        apis: List.of(
          Map({
            id: 1,
            title: 'API Document 1'
          }),
          Map({
            id: 2,
            title: 'API Document 2'
          })
        )
      })
    }
    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal(fromJS({
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
    }))
  })

  it('handles SET_STATE with plain objects', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        apis: [
          {
            id: 1,
            title: 'API Document 1'
          },
          {
            id: 2,
            title: 'API Document 2'
          }
        ],
        apiDetail: [
          {
            title: 'Method 1',
            description: 'Method content',
            items: [
              {
                title: 'Method item 1',
                content: 'content 1'
              },
              {
                title: 'Method item 2',
                content: 'content 2'
              }
            ]
          },
          {
            title: 'Method 2',
            description: 'Method content 2',
            items: [
              {
                title: 'Method item 1',
                content: 'content 1'
              },
              {
                title: 'Method item 2',
                content: 'content 2'
              }
            ]
          }
        ]
      }
    }

    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal(fromJS({
      apis: [
        {
          id: 1,
          title: 'API Document 1'
        },
        {
          id: 2,
          title: 'API Document 2'
        }
      ],
      apiDetail: [
        {
          title: 'Method 1',
          description: 'Method content',
          items: [
            {
              title: 'Method item 1',
              content: 'content 1'
            },
            {
              title: 'Method item 2',
              content: 'content 2'
            }
          ]
        },
        {
          title: 'Method 2',
          description: 'Method content 2',
          items: [
            {
              title: 'Method item 1',
              content: 'content 1'
            },
            {
              title: 'Method item 2',
              content: 'content 2'
            }
          ]
        }
      ]
    }))
  })
})
