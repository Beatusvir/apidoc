import React from 'react';
import ReactDOM from 'react-dom';
import Method from './components/method'

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const items = [
  { title: 'URL', content: 'http://asd.com' },
  { title: 'Method', content: 'ObtenerCliente' }
]

ReactDOM.render(
  <Method title="Test Method" description="Some description in here" apiItems={items}/>,
  document.getElementById('app')
);