import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, hashHistory } from 'react-router'
import { ApisContainer } from './components/apis/apis'
import { MethodsContainer } from './components/api_detail/method_list'
import { ApiAddContainer } from './components/api_add/api_add'
import { ApiAddDetailContainer } from './components/api_add_detail/api_add_detail'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import remoteActionMiddleware from './remote_action_middleware'
import { requestApis, setState, requestDetail } from './action_creators';
import reducer from './reducer'
import io from 'socket.io-client'

const socket = io(`${location.protocol}//${location.hostname}:8090`)
// Loading state from server
socket.on('state', state => {
  store.dispatch(setState(state))
})

const createStoreWithMiddlewate = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)
export const store = createStoreWithMiddlewate(reducer)

// Load detail
const fetchApiDetail = (e) => {
  store.dispatch(requestDetail(e.params.apiId))
}

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}

const routes = <Route component={App}>
  <Route path="/" component={ApisContainer}/>
  <Route path="/add/" component={ApiAddContainer}/>
  <Route path="/add/detail/:apiId" component={ApiAddDetailContainer}/>
  <Route path="/view/:apiId" component={MethodsContainer} onEnter={fetchApiDetail}/>
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)