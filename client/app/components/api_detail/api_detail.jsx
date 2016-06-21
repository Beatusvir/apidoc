import React from 'react'
import ReactDOM from 'react-dom'
import Method from './components/method'

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const apiItems1 = [
  {
    title: 'Method', content: 'Post'
  },
  {
    title: 'URL Params', content: 'Post'
  },
  {
    title: 'Data Params', content: 'Post'
  },
  {
    title: 'Success Response', content: 'Post'
  },
  {
    title: 'Error Response', content: 'Post'
  },
  {
    title: 'Sample Call', content: 'Post'
  }
]

const methodsList = [
  {
    title: 'Activar Cuenta', description: 'Cambia el estatus de la cuenta del cliente a activa', apiItems: apiItems1
  },
  {
    title: 'Actualizar Clave', description: 'Cambiar la clave del cliente', apiItems: apiItems1
  }
]

ReactDOM.render(
  <Method methods={methodsList}/>,
  document.getElementById('app')
);