import { List, Map, fromJS } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils'
import { expect } from 'chai'
import Parameters from '../app/components/api_detail/parameters'

const parameters = List.of(
  Map({ content: 'parameter 1', required: true}),
  Map({ content: 'parameter 2', required: false})
)

describe('parameters', () => {
  it('renders a list of parameters', () => {
    const component = renderIntoDocument(
      <Parameters parameters={parameters} />
    )

    const parameterList = scryRenderedDOMComponentsWithClass(component, 'parameters')
    const parameterListItems = scryRenderedDOMComponentsWithClass(component, 'parameter')
    expect(parameterList.length).to.equal(1)
    expect(parameterListItems.length).to.equal(2)
    expect(parameterListItems[1].textContent).to.equal('parameter 2')
  })
})
