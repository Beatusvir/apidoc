import {Map} from 'immutable'
import { addApiMethod, deleteApi, addApi, getDbApis, getDbApiDetail } from './database'

export function fetchApisFromDb(){
  getDbApis()
}

export function fetchApiDetailFromDb (apiId) {
  getDbApiDetail(apiId)
}

export function addApiToDb(newApi){
  addApi(newApi)
}

export function deleteApiFromDb(apiId){
  deleteApi(apiId)
}

export function addApiMethodToDb(apiMethod){
  addApiMethod(apiMethod)
}