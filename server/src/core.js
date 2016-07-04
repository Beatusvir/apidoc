import {Map} from 'immutable'
import { addApiClass, deleteApi, addApi, getDbApis, getDbApiDetail } from './database'

export function fetchApisFromDb(){
  getDbApis()
}

export function fetchApiDetailFromDb (apiId) {
  getDbApiDetail(apiId)
}

export function addApiToDb(api, callback){
  addApi(api, callback)
}

export function deleteApiFromDb(apiId){
  deleteApi(apiId)
}

export function addApiClassToDb(apiClass){
  addApiClass(apiClass)
}