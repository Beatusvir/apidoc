import { List, Map, fromJS } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils'
import { expect } from 'chai'
import { Methods } from '../app/components/api_detail/method_list'

const apiDetail = List.of(
  Map({ methodTitle: 'Method 1', parameters: List.of(), responses: List.of() }),
  Map({ methodTitle: 'Method 2', parameters: List.of(), responses: List.of() }))

describe('api detail', () => {
  it('renders a list of methods', () => {
    const component = renderIntoDocument(
      <Methods methods={apiDetail} />
    )

    const methodList = scryRenderedDOMComponentsWithClass(component, 'method')
    const methodHeadings = scryRenderedDOMComponentsWithTag(component, 'h1')
    const methodDetail = scryRenderedDOMComponentsWithClass(component, 'apiDetailItem')
    const methodDetailHeadings = scryRenderedDOMComponentsWithTag(component, 'h3')

    expect(methodList.length).to.equal(2)
    expect(methodHeadings[0].textContent).to.equal('Method 1')
    expect(methodHeadings[1].textContent).to.equal('Method 2')
    expect(methodDetail.length).to.equal(18)
    expect(methodDetailHeadings[0].textContent).to.equal('URL')
    expect(methodDetailHeadings[3].textContent).to.equal('Data Params')
  })
})
