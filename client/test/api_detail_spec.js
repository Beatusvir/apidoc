import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils'
import { expect } from 'chai'
import { Methods } from '../app/components/api_detail/method_list'

const items = [
  {
    title: 'Test Method 1',
    description: 'Test method description',
    detail: [
      {
        title: 'Method',
        content: 'Post'
      },
      {
        title: 'URL Params',
        content: 'Post'
      },
      {
        title: 'Data Params',
        content: 'Post'
      },
      {
        title: 'Success Response',
        content: 'Post'
      },
      {
        title: 'Error Response',
        content: 'Post'
      },
      {
        title: 'Sample Call',
        content: 'Post'
      }
    ]
  },
  {
    title: 'Test Method 2',
    description: 'Test method description',
    detail: [
      {
        title: 'Method',
        content: 'Post'
      },
      {
        title: 'URL Params',
        content: 'Post'
      },
      {
        title: 'Data Params',
        content: 'Post'
      },
      {
        title: 'Success Response',
        content: 'Post'
      },
      {
        title: 'Error Response',
        content: 'Post'
      },
      {
        title: 'Sample Call',
        content: 'Post'
      }
    ]
  }
]

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
    expect(methodHeadings[0].textContent).to.equal('Test Method 1')
    expect(methodHeadings[1].textContent).to.equal('Test Method 2')
    expect(methodDetail.length).to.equal(12)
    expect(methodDetailHeadings[0].textContent).to.equal('Method')
    expect(methodDetailHeadings[11].textContent).to.equal('Sample Call')

    // expect(apiList[0].textContent).to.equal('Test Method 1')
    // expect(apiList[1].textContent).to.equal('Test Method 2')
  })

})
