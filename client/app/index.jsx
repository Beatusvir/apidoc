import React from 'react'
import ReactDOM from 'react-dom'
import Api from './components/apis/apis'
import io from 'socket.io-client'

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

let apiList = ['test', 'test2']

const socket = io(`${location.protocol}//${location.hostname}:8090`)
socket.on('state', state => {
  if (state.methods.length > 0){
    apiList = state.methods
  }
})

const date =  new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDay()

ReactDOM.render(
  <Api apiList={apiList}/>,
  document.getElementById('app')
);