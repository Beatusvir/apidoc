import { Map } from 'immutable'
import { addApiMethod, deleteApi, addApi, getDbApis, getDbApiDetail,
  getApiTitle, deleteMethod} from './database'

export function fetchApisFromDb () {
  getDbApis()
}

export function fetchApiDetailFromDb (apiId) {
  getDbApiDetail(apiId)
}

export function addApiToDb (newApi) {
  addApi(newApi)
}

export function deleteApiFromDb (apiId) {
  deleteApi(apiId)
}

export function addApiCallToDb (apiMethod) {
  addApiCall(apiMethod)
}

export function getApiTitleFromDb (apiId) {
  getApiTitle(apiId)
}

export function deleteMethodFromDb (methodId) {
  deleteMethod(methodId)
}
