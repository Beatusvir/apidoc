import 'babel-polyfill'
// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, hashHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// Components
import { ApisContainer } from './components/apis/apis'
import { MethodsContainer } from './components/api_detail/method_list'
import { ApiAddContainer } from './components/api_add/api_add'
import { ApiAddDetailContainer } from './components/api_add_detail/api_add_detail'
import App from './components/app'

// Reducer, actions, store
import { fetchApis, fetchApiDetail, fetchApiTitle } from './actions/actions'
import reducer from './reducers/reducer'

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}

const handleEnterHome = () => {
  store.dispatch(fetchApis())
}

const handleEnterView = (nextState) => {
  store.dispatch(fetchApiDetail(nextState.params.apiId))
}

const handleEnterDetail = (nextState) => {
  store.dispatch(fetchApiTitle(nextState.params.apiId))
}

const routes = <Route component={App}>
  <Route path="/" component={ApisContainer} onEnter={handleEnterHome}/>
  <Route path="/view/:apiId" component={MethodsContainer} onEnter={handleEnterView}/>
  <Route path="/add/" component={ApiAddContainer}/>
  <Route path="/add/detail/:apiId" component={ApiAddDetailContainer} onEnter={handleEnterDetail}/>
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)