import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, hashHistory } from 'react-router'
import { ApisContainer } from './components/apis/apis'
import { MethodsContainer } from './components/api_detail/method_list'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
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
store.dispatch(action)

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const routes = <Route component={App}>
  <Route path="/" component={ApisContainer}/>
  <Route path="/detail/:apiId" component={MethodsContainer}/>
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);