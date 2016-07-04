import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import { expect } from 'chai'
//import { Api } from '../app/components/apis/apis'

describe('Api', () => {
  it('renders a list of api documents', () => {
    const apis = fromJS([  { title: 'Test Api 1', id: 1 },  { title: 'Test Api 2', id: 2 }])
    // const component = renderIntoDocument(
    //   <Api apiList={apis} />
    // )

    // const apiList = scryRenderedDOMComponentsWithClass(component, 'api')

    // expect(apiList.length).to.equal(2)
    // expect(apiList[0].textContent).to.equal('Test Api 1')
    // expect(apiList[1].textContent).to.equal('Test Api 2')
  })

  // This test pass when using PureRenderMixin
  // it('renders as a pure component', () => {
  //   const apis = fromJS([  { title: 'Test Api 1', id: 1 },  { title: 'Test Api 2', id: 2 }])
  //   const container = document.createElement('div')
  //   let component = ReactDOM.render(
  //     <Api apiList={apis} />,
  //     container
  //   )

  //   let firstMethod = scryRenderedDOMComponentsWithClass(component, 'api')[0]
  //   expect(firstMethod.textContent).to.equal('Test Api 1')

  //   apis[0] = 'Test Api 1 -Changed-'
  //   component = ReactDOM.render(
  //     <Api apiList={apis} />,
  //     container
  //   )
  //   firstMethod = scryRenderedDOMComponentsWithClass(component, 'api')[0]
  //   expect(firstMethod.textContent).to.equal('Test Api 1')
  //  })
})
