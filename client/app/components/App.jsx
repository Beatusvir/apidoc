import React from 'react'
import {List} from 'immutable'
import io from 'socket.io-client'

const socket = io(`${location.protocol}//${location.hostname}:8090`)
socket.on('state', state => {
  if (state.methods.length > 0){
    //apiList = state.methods
  }
})

export default React.createClass({
  render: function() {
    return this.props.children
  }
})


