import { List, Map, fromJS } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils'
import { expect } from 'chai'
import { Methods } from '../app/components/api_detail/method_list'

const items = List.of(
          Map({
            title: 'Method 1',
            description: 'Method content',
            items: List.of(
              Map({
                title: 'Method item 1',
                content: 'content 1'
              }),
              Map({
                title: 'Method item 2',
                content: 'content 2'
              }))
          }),
          Map({
            title: 'Method 2',
            description: 'Method content 2',
            items: List.of(
              Map({
                title: 'Method item 1',
                content: 'content 1'
              }),
              Map({
                title: 'Method item 2',
                content: 'content 2'
              }))
          }))

describe('Api Detail', () => {
  it('renders a list of methods', () => {
    const component = renderIntoDocument(
      <Methods methods={items} />
    )

    const methodList = scryRenderedDOMComponentsWithClass(component, 'method')
    const methodHeadings = scryRenderedDOMComponentsWithTag(component, 'h1')
    const methodDetail = scryRenderedDOMComponentsWithClass(component, 'apiDetailItem')
    const methodDetailHeadings = scryRenderedDOMComponentsWithTag(component, 'h3')

    expect(methodList.length).to.equal(2)
    expect(methodHeadings[0].textContent).to.equal('Method 1')
    expect(methodHeadings[1].textContent).to.equal('Method 2')
    expect(methodDetail.length).to.equal(4)
    expect(methodDetailHeadings[0].textContent).to.equal('Method item 1')
    expect(methodDetailHeadings[3].textContent).to.equal('Method item 2')

  })

})
