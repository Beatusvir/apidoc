import { sendApis, sendDetail, sendInsertedApiId, errorOcurred, sendApiTitle, clearApiDetail } from './actions'
import { store } from '../index'

const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const file = './data/apis.db'

export function initDb () {
  if (!fs.existsSync(file)) {
    const db = new sqlite3.Database(file)
    createTables(db)
  }
  return
}

export function deleteApi (apiId) {
  if (apiId === undefined){
    store.dispatch(errorOcurred('Error in [deleteApi]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  db.serialize(() => {
    db.run('DELETE FROM methods WHERE apiId = ?', apiId, (err, rows) => {
      if (err) {
        store.dispatch(errorOcurred(`Error in [deleteApi - deleting methods]:${err}`))
        return
      }
    })
    db.run('DELETE FROM apis WHERE apiId = ?', apiId, (err, rows) => {
      if (err) {
        store.dispatch(errorOcurred(`Error in [deleteApi - deleting apis]:${err}`))
        return
      }
      getDbApis()
    })
  })
  db.close()
}

export function addApi (newApi) {
  if (newApi === undefined){
    store.dispatch(errorOcurred('Error in [addApi]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  db.run('INSERT INTO apis(apiId, title) VALUES(?, ?)', newApi.apiId, newApi.title, function (err) {
    if (err) {
      store.dispatch(errorOcurred(`Error in [addApi]:${err}`))
      return
    }
    getDbApis()
  })
}

export function getDbApis () {
  const db = new sqlite3.Database(file)
  db.all('SELECT apiId, title FROM apis', (err, rows) => {
    if (err) {
      store.dispatch(errorOcurred(`Error in [getDbApis]:${err}`))
      return
    }
    store.dispatch(sendApis(rows))
    return
  })
}

export function getDbApiDetail (apiId) {
  if (apiId === undefined){
    store.dispatch(errorOcurred('Error in [getDbApiDetail]: Paramter(s) undefined'))
    return
  }
  getApiMethods(apiId)
}

function getApiMethods (apiId) {
  if (apiId === undefined){
    store.dispatch(errorOcurred('Error in [getApiMethods]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  db.all('SELECT a.title as apiTitle, ' +
    'a.apiId as apiId, m.title as methodTitle, ' +
    'm.description, m.url, m.method, m.sample_call, m.notes, m.methodId ' +
    'FROM methods m ' +
    'JOIN apis a ON m.apiId = a.apiId ' +
    'WHERE a.apiId = ?', apiId, (err, rows) => {
      if (err) {
        store.dispatch(errorOcurred(`Error in [getApiMethods]:${err}`))
        return
      }
      getMethodResponses(rows)
    })
  db.close()
}

function getMethodResponses (methods) {
  if (methods === undefined){
    store.dispatch(errorOcurred('Error in [getMethodResponses]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  methods.map((item, index, array) => {
    db.all('SELECT code, content, type FROM responses WHERE methodId = ?', item.methodId, (err, rows) => {
      if (err) {
        store.dispatch(errorOcurred(`Error in [getMethodResponses]:${err}`))
        return
      }
      item.successResponses = rows.filter((row) => {
        return row.type === 'SUCCESS'
      })
      item.errorResponses = rows.filter((row) => {
        return row.type === 'ERROR'
      })
      // If it's the last item in the array, get parameters
      if (array.length === ++index) {
        getMethodParameters(methods)
      }
    })
  })
  db.close()
}

function getMethodParameters (methods) {
  if (methods === undefined){
    store.dispatch(errorOcurred('Error in [getMethodParameters]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  methods.map((item, index, array) => {
    db.all('SELECT content, required, type FROM parameters WHERE methodId = ?', item.methodId, (err, rows) => {
      if (err) {
        store.dispatch(errorOcurred(`Error in [getMethodParameters]:${err}`))
        return
      }
      item.urlParameters = rows.filter((row) => {
        return row.type === 'URL'
      })
      item.dataParameters = rows.filter((row) => {
        return row.type === 'DATA'
      })
      // If it's the last item in the array, send the result
      if (array.length === ++index) {
        store.dispatch(sendDetail(methods))
      }
    })
  })
  db.close()
}

export function addApiMethod (apiMethod) {
  if (apiMethod === undefined){
    store.dispatch(errorOcurred('Error in [addApiMethod]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  db.serialize(() => {
    db.run('INSERT INTO methods(methodId, apiId, title, description, method, url, sample_call, notes)' +
    ' VALUES(?,?,?,?,?,?,?,?)',
      apiMethod.methodId, apiMethod.apiId, apiMethod.title, apiMethod.description, apiMethod.method, apiMethod.url, apiMethod.sampleCall, apiMethod.notes,
      (err, rows) => {
        if (err) {
          store.dispatch(errorOcurred(`Error in [addApiMethod - insert methods]:${err}`))
          return
        }
      })

    apiMethod.successResponseItems.map((item) => {
      // console.log('trying to add response: ', item.responseId, apiMethod.methodId, item.code, item.content, 'SUCCESS')
      db.run('INSERT INTO responses(responseId, methodId, code, content, type)' +
      ' VALUES(?,?,?,?,?)',
        item.responseId, apiMethod.methodId, item.code, item.content, 'SUCCESS',
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(`Error in [addApiMethod - insert responses 1]:${err}`))
            return
          }
        })
    })

    apiMethod.errorResponseItems.map((item) => {
      // console.log('trying to add response: ', item.responseId, apiMethod.methodId, item.code, item.content, 'ERROR');
      db.run('INSERT INTO responses(responseId, methodId, code, content, type)' +
      ' VALUES(?,?,?,?,?)',
        item.responseId, apiMethod.methodId, item.code, item.content, 'ERROR',
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(`Error in [addApiMethod - insert responses 2]:${err}`))
            return
          }
        })
    })

    apiMethod.urlParams.map((item) => {
      // console.log('trying to add parameter: ', item.parameterId, apiMethod.methodId, item.content, item.required === 'on' ? 1 : 0, 'URL');
      db.run('INSERT INTO parameters(parameterId, methodId, content, required, type)' +
      ' VALUES(?,?,?,?,?)',
        item.parameterId, apiMethod.methodId, item.content, item.required ? 1 : 0, 'URL',
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(`Error in [addApiMethod - insert parameters 1]:${err}`))
            return
          }
        })
    })

    apiMethod.dataParams.map((item) => {
      // console.log('trying to add parameter: ', item.parameterId, apiMethod.methodId, item.content, item.required === 'on' ? 1 : 0, 'DATA')
      db.run('INSERT INTO parameters(parameterId, methodId, content, required, type)' +
      ' VALUES(?,?,?,?,?)',
        item.parameterId, apiMethod.methodId, item.content, item.required ? 1 : 0, 'DATA',
        (err, rows) => {
          if (err) {
            store.dispatch(errorOcurred(`Error in [addApiMethod - insert parameters 2]:${err}`))
            return
          }
        })
    })
  })
  db.close()
}

function addMethodResponses (methodId, responses) {
  if (methodId === undefined || responses === undefined){
    store.dispatch(errorOcurred('Error in [addMethodResponses]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  responses.map((item) => {
    db.run('INSERT INTO responses(responseId, methodId, code, content, type)' +
    ' VALUES(?,?,?,?)',
      item.responseId, methodId, item.code, item.content,
      (err, rows) => {
        if (err) {
          store.dispatch(errorOcurred(`Error in [addMethodResponses]:${err}`))
          return
        }
      })
  })
  db.close()
}

function addMethodParameters (methodId, parameters) {
  if (methodId === undefined || parameters === undefined){
    store.dispatch(errorOcurred('Error in [addMethodParameters]: Paramter(s) undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  parameters.map((item) => {
    db.run('INSERT INTO parameters(parameterId, methodId, content, required)' +
    ' VALUES(?,?,?,?)',
      item.parameterId, methodId, item.content, item.required,
      (err, rows) => {
        if (err) {
          store.dispatch(errorOcurred(`Error in [addMethodParameters]:${err}`))
          return
        }
      })
  })
  db.close()
}

export function getApiTitle (apiId) {
  if (apiId === undefined){
    store.dispatch(errorOcurred('Error in [getApiTitle]: Paramter undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  db.get('SELECT title FROM apis WHERE apiId = ?', apiId, (err, row) => {
    if (err) {
      store.dispatch(errorOcurred(`Error in [getApiTitle]:${err}`))
      return
    }
    if (row) {
      store.dispatch(sendApiTitle(row.title))
      return
    }
  })
}

export function deleteMethod (methodId) {
  if (methodId === undefined){
    store.dispatch(errorOcurred('Error in [deleteMethod]: Paramter undefined'))
    return
  }
  const db = new sqlite3.Database(file)
  let apiId = ''
  db.serialize(() => {
    db.get('SELECT apiId from methods WHERE methodId = ?', methodId, (err, row) => {
      if (err){
        store.dispatch(errorOcurred(`Error in [deleteMethod - getting apiId]:${err}`))
      }
      apiId = row.apiId
    })
    db.run('DELETE FROM methods WHERE methodId = ?', methodId, (err) => {
      if (err) {
        store.dispatch(errorOcurred(`Error in [deleteMethod - deleting method]:${err}`))
      }
      getDbApiDetail(apiId)
    })
    db.get('SELECT methodId from methods WHERE apiId = ?', apiId, (err, row) => {
      if (err){
        store.dispatch(errorOcurred(`Error in [deleteMethod - getting methods after deleting]:${err}`))
      }
      console.log(row)
      if (!row) {
        console.log('clearing apidetila');
        store.dispatch(clearApiDetail)
      }
    })
  })
}

function createTables (db) {
  db.serialize(() => {
    db.run('CREATE TABLE apis (apiId TEXT PRIMARY KEY, title TEXT)')
    db.run('CREATE TABLE methods (methodId TEXT PRIMARY KEY, apiId TEXT, title TEXT, description TEXT, method TEXT, url TEXT, sample_call TEXT, notes TEXT, FOREIGN KEY(apiId) REFERENCES apis(apiId) ON DELETE CASCADE)')
    db.run('CREATE TABLE responses (responseId TEXT PRIMARY KEY, methodId TEXT, code TEXT, content TEXT, type TEXT, FOREIGN KEY(methodId) REFERENCES methods(methodId) ON DELETE CASCADE)')
    db.run('CREATE TABLE parameters (parameterId TEXT PRIMARY KEY, methodId TEXT, content TEXT, required INTEGER, type TEXT, FOREIGN KEY(methodId) REFERENCES methods(methodId) ON DELETE CASCADE)')
  })
  db.close()
  return
}
