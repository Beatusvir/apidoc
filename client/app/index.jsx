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
store.dispatch({
  type: 'SET_STATE',
  state: {
    apis: {
      apiList: [
        {
          title: 'API Document 1',
          id: 1
        },
        {
          title: 'API Document 2',
          id: 2
        }
      ]
    },
    apiDetail: {
      methods: [
        {
          title: 'Method Title',
          description: 'Method description',
          items: [
            {
              title: 'Method',
              content: 'POST'
            }
          ]
        }
      ]
    }
  }
});

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