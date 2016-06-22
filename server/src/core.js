import {Map} from 'immutable'

export const INITIAL_STATE = Map()

const methods = [
  { title: 'ActivarCliente', description: 'Activar cliente en el sistemas de transferencias' },
  { title: 'ActualizarClave', description: 'Cambiar la clave del cliente' }
]

export function viewApi(state, api){
  return state.set('api', api)
}

export function getApiList(){
  return methods
}