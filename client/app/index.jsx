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
      apiList: ['Test Api 1', 'Test Api 2']
    }
  }
});

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const routes = <Route component={App}>
  <Route path="/detail" component={MethodsContainer}/>
  <Route path="/" component={ApisContainer}/>
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);