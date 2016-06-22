import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'
import { expect } from 'chai'
import ApiDetail from '../app/components/api_detail/method_list'

describe('Api', () => {
  it('renders a list of api documents', () => {
    const component = renderIntoDocument(
      <ApiDetail apiList={['Test Method 1', 'Test Method 2']}/>
    )

    const apiList = scryRenderedDOMComponentsWithClass(component, 'apiItem')

    expect(apiList.length).to.equal(2)
    expect(apiList[0].textContent).to.equal('Test Method 1')
    expect(apiList[1].textContent).to.equal('Test Method 2')
  })
})

