import React from 'react'
import ReactDOM from 'react-dom'
import Api from './components/apis/apis'

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const date =  new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDay()

const apiList = [
  { title: 'CobecaAPI', description: 'Exponer servicios de transferencias bancarias con el banco Venezolano de Crédito', created: date, updated: date },
  { title: 'Sitio de Clientes', description: 'Portal web para operaciones de clientes', created: date, updated: date }
]

ReactDOM.render(
  <Api apiList={apiList}/>,
  document.getElementById('app')
);