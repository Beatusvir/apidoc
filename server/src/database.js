import {
  sendApis,
  sendDetail,
  sendInsertedApiId,
  errorOcurred
} from './actions'
import { store } from '../index'

const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const file = './data/apis.db'

export function initDb() {
  if (!fs.existsSync(file)) {
    const db = new sqlite3.Database(file)
    createTables(db)
  }
  return
}

export function deleteApi(apiId) {
  const db = new sqlite3.Database(file)
  db.run('DELETE FROM apis WHERE apiId = ?', apiId, (err, rows) => {
    if (err) {
      store.dispatch(errorOcurred(err))
      return
    }
    getDbApis()
  })
}

export function addApi(newApi) {
  const db = new sqlite3.Database(file)
  db.run('INSERT INTO apis(apiId, title) VALUES(?, ?)', newApi.apiId, newApi.title, function (err) {
    if (err) {
      store.dispatch(errorOcurred(err))
      return
    }
    getDbApis()
  })
}

export function getDbApis() {
  const db = new sqlite3.Database(file)
  db.all('SELECT apiId, title FROM apis', (err, rows) => {
    if (err) {
      store.dispatch(errorOcurred(err))
      return
    }
    store.dispatch(sendApis(rows))
    return
  })
}

export function getDbApiDetail(apiId) {
  getApiMethods(apiId)
}

export function addApiMethod(apiMethod) {
  const db = new sqlite3.Database(file)
  db.serialize(() => {
    db.run('INSERT INTO methods(methodId, apiId, title, description, method, url, sampleCall, notes)' +
      ' VALUES(?,?,?,?,?,?,?,?)',
      apiMethod.methodId, apiMethod.apiId, apiMethod.title, apiMethod.description, apiMethod.method, apiMethod.url, apiMethod.sampleCall, apiMethod.notes,
      (err, rows) => {
        if (err) {
          store.dispatch(errorOcurred(err))
          return
        }
      })

    apiMethod.successResponseItems.map((item) => {
      db.run('INSERT INTO responses(responseId, methodId, responseId, code, content)' +
        ' VALUES(?,?,?,?,?)',
        item.responseId, apiMethod.methodId, 1, item.code, item.content,
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(err))
            return
          }
        })
    })
    apiMethod.errorResponseItems.map((item) => {
      db.run('INSERT INTO responses(responseId, methodId, responseId, code, content)' +
        ' VALUES(?,?,?,?,?)',
        item.responseId, apiMethod.methodId, 2, item.responseId, item.code, item.content,
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(err))
            return
          }
        })
    })

    apiMethod.urlParams.map((item) => {
      db.run('INSERT INTO parameters(parameterId, methodId, parameterId, content, required)' +
        ' VALUES(?,?,?,?,?)',
        item.parameterId, apiMethod.methodId, 1, item.content, item.required,
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(err))
            return
          }
        })
    })

    apiMethod.dataParams.map((item) => {
      db.run('INSERT INTO parameters(parameterId, methodId, parameterId, content, required)' +
        ' VALUES(?,?,?,?,?)',
        item.parameterId, apiMethod.methodId, 2, item.content, item.required,
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(err))
            return
          }
        })
    })
  })
  db.close()
}

function addMethodResponses(methodId, responses) {
  const db = new sqlite3.Database(file)
  rows.map((item) => {
    db.run('INSERT INTO responses(responseId, methodId, code, content)' +
      ' VALUES(?,?,?,?)',
      item.responseId, methodId, item.code, item.content,
      (err, rows) => {
        if (err) {
          store.dispatch(errorOcurred(err))
          return
        }
      })
  })
  db.close()
}

function addMethodParameters(methodId, parameters) {
  const db = new sqlite3.Database(file)
  rows.map((item) => {
    db.run('INSERT INTO parameters(parameterId, methodId, content, required)' +
      ' VALUES(?,?,?,?)',
      item.parameterId, methodId, item.content, item.required,
      (err, rows) => {
        if (err) {
          store.dispatch(errorOcurred(err))
          return
        }
      })
  })
  db.close()
}

function getApiMethods(apiId) {
  const db = new sqlite3.Database(file)
  db.all(
    'SELECT a.title as apiTitle, ' + 
            'a.apiId as apiId, m.title as methodTitle, ' + 
            'm.description, m.url, m.method, m.sample_call, m.notes ' + 
            'FROM methods m ' + 
            'JOIN apis a ON m.apiId = a.apiId ' + 
            'WHERE a.apiId = ?', apiId, (err, rows) => {
    if (err) {
      store.dispatch(errorOcurred(err))
      return
    }
    // TODO set state with rows
    // TODO get responses by type, and parameters by type
    store.dispatch(sendDetail(rows))
    return
  })
}

function serializeDetail(classes, methods) {
  let apiDetail = []
  classes.forEach((classesItem, classesIndex) => {
    apiDetail.push({
      title: classesItem.title,
      description: classesItem.description
    })
    apiDetail[classesIndex].items = []
    methods.forEach((methodsItem, methodsIndex) => {
      if (methodsItem.classId === classesItem.classId) {
        apiDetail[classesIndex].items.push({
          title: methodsItem.title,
          content: methodsItem.content
        })
      }
    })
  })
  return store.dispatch(sendDetail(apiDetail))
}

function createTables(db) {
  db.serialize(() => {
    db.run('CREATE TABLE apis (apiId TEXT PRIMARY KEY, title TEXT)')
    db.run('CREATE TABLE methods (methodId TEXT PRIMARY KEY, apiId TEXT, title TEXT, description TEXT, method TEXT, url TEXT, sample_call TEXT, notes TEXT, FOREIGN KEY(apiId) REFERENCES apis(apiId) ON DELETE CASCADE)')
    db.run('CREATE TABLE responses (responseId TEXT PRIMARY KEY, methodId TEXT, parameterId INTEGER, code TEXT, content TEXT, FOREIGN KEY(methodId) REFERENCES methods(methodId) ON DELETE CASCADE, FOREIGN KEY(parameterId) REFERENCES parameter_types(parameterId) ON DELETE CASCADE, FOREIGN KEY(responseId) REFERENCES response_types(responseId) ON DELETE CASCADE)')
    db.run('CREATE TABLE response_types (responseId INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)')
    db.run('CREATE TABLE parameters (parameterId TEXT PRIMARY KEY, methodId TEXT, content TEXT, required INTEGER, FOREIGN KEY(methodId) REFERENCES methods(methodId) ON DELETE CASCADE)')
    db.run('CREATE TABLE parameter_types (parameterId INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)')
    db.run('INSERT INTO response_types(description) VALUES("Success Response"),("Error Response")')
    db.run('INSERT INTO parameter_types(description) VALUES("Url Parameters"),("Data Parameters")')
    // db.run('INSERT INTO classes(apiId, title, description) VALUES(1, "Class from Database", "Class description from database"),' +
    //   '(1, "Class 2 from Database", "Class description 2 from database")')
    // db.run('INSERT INTO methods(classId, title, content) VALUES(1, "Method from Database", "Method content from class 1"),' +
    //   '(1, "Method 2 from Database", "Method content 2 from class 1"),' +
    //   '(2, "Method 1 from Database", "Method content from class 2"),' +
    //   '(2, "Method 2 from Database", "Method content 2 from class 2")')
  })
  db.close()
  return
}
