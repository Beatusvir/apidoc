// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, hashHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

// Components
import { ApisContainer } from './components/apis/apis'
import { MethodsContainer } from './components/api_detail/method_list'
import { ApiAddContainer } from './components/api_add/api_add'
import { ApiAddDetailContainer } from './components/api_add_detail/api_add_detail'
import App from './components/app'

// Reducer, actions, store
import remoteActionMiddleware from './remote_action_middleware'
import { setState, apisRequest, apisDetailRequest } from './actions/actions'
import reducer from './reducers/reducer'

const socket = io(`${location.protocol}//${location.hostname}:8090`)
// Loading state from server
socket.on('state', state => {
  store.dispatch(setState(state))
})

const createStoreWithMiddlewate = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)
export const store = createStoreWithMiddlewate(reducer)

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}

const handleEnterHome = () => {
  store.dispatch(apisRequest())
}

const handleLeaveViewApi = () => {
  // store.dispatch(clearDetail())
}

const handleEnterAddDetail = (nextState) => {
  
}

const handleEnterView = (nextState) => {
  store.dispatch(apisDetailRequest(nextState.params.apiId))
}

const routes = <Route component={App}>
  <Route path="/" component={ApisContainer} onEnter={handleEnterHome}/>
  <Route path="/view/:apiId" component={MethodsContainer} onEnter={handleEnterView}/>
  <Route path="/add/" component={ApiAddContainer}/>
  <Route path="/add/detail/" component={ApiAddDetailContainer} onEnter={handleEnterAddDetail}/>
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)