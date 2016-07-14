import { List, Map, fromJS } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils'
import { expect } from 'chai'
import { Api } from '../app/components/apis/apis'
import reducer from '../app/reducers/reducer'

const apis = List.of(
  Map({ title: 'Api 1', apiId: 1 }),
  Map({ title: 'Api 2', apiId: 2 })
)

describe('api', () => {
  it('renders a list of api documents', () => {

    const component = renderIntoDocument(
        <Api apiList={apis} />
    )

    const apiList = scryRenderedDOMComponentsWithClass(component, 'apiList')
    const apiListItem = scryRenderedDOMComponentsWithClass(component, 'api')
    const apiListItemTitle = scryRenderedDOMComponentsWithClass(component, 'title')
    expect(apiList.length).to.equal(1)
    expect(apiListItem.length).to.equal(2)
    expect(apiListItemTitle[0].textContent).to.equal('Api 1')
  })

  // This test pass when using PureRenderMixin
  it('renders as a pure component', () => {
    const apis = fromJS([{ title: 'Test Api 1', id: 1 }, { title: 'Test Api 2', id: 2 }])
    const container = document.createElement('div')
    let component = ReactDOM.render(
      <Api apiList={apis} />,
      container
    )

    let firstMethod = scryRenderedDOMComponentsWithClass(component, 'api')[0]
    expect(firstMethod.textContent).to.equal('Test Api 1')

    apis[0] = 'Test Api 1 -Changed-'
    component = ReactDOM.render(
      <Api apiList={apis} />,
      container
    )
    firstMethod = scryRenderedDOMComponentsWithClass(component, 'api')[0]
    expect(firstMethod.textContent).to.equal('Test Api 1')
  })

  it('filters a list of items', () => {
    const filter = 'some'
    const apis = List.of(
      Map({ apiId: 1, title: 'some api', description: 'description 1' }),
      Map({ apiId: 2, title: 'api', description: 'description 2' }),
      Map({ apiId: 3, title: 'test api', description: 'description 3' }),
      Map({ apiId: 4, title: 'some api 2', description: 'description 4' })
    )
    const container = document.createElement('div')
    let component = ReactDOM.render(
      <Api apiList={apis} filter={filter} />,
      container
    )
    let filteredApis = scryRenderedDOMComponentsWithClass(component, 'api')
    expect(filteredApis.length).to.equal(2)
  })
})
