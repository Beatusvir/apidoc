import React from 'react'
import ReactDOM from 'react-dom'
import Method from './components/method'

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

ReactDOM.render(
  <Method methods={methodsList}/>,
  document.getElementById('app')
);