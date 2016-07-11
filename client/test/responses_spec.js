import { List, Map, fromJS } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils'
import { expect } from 'chai'
import { Responses } from '../app/components/api_detail/responses'

const responses = List.of(
  Map({ code: 1, content: 'response 1'}),
  Map({ code: 2, content: 'response 2'})
)

describe('renders responses', () => {
  it('renders a list of responses', () => {
    const component = renderIntoDocument(
      <Responses responses={responses} />
    )

    const responseList = scryRenderedDOMComponentsWithClass(component, 'responses')
    const responseListItems = scryRenderedDOMComponentsWithTag(component, 'li')

    expect(responseList.length).to.equal(1)
    expect(responseListItems.length).to.equal(2)
    expect(responseListItems[1].textContent).to.equal('Method 2')
  })
})
