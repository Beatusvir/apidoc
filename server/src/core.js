import {Map} from 'immutable'
import { deleteApi, addApi, getDbApis, getDbApiDetail } from './database'

export function fetchApisFromDb(){
  getDbApis()
}

export function fetchApiDetailFromDb (apiId) {
  getDbApiDetail(apiId)
}

export function addApiToDb(api){
  addApi(api)
}

export function deleteApiFromDb(apiId){
  deleteApi(apiId)
}