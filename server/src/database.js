import { 
  sendApis, 
  sendDetail, 
  sendInsertedApiId } from './actions'
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

export function deleteApi(apiId){
  const db = new sqlite3.Database(file)
  db.run('DELETE FROM apis WHERE apiId = ?', apiId, (err, rows) => {
    if (err){
      console.log(err)
      return
    }
    getDbApis()
  })
}

export function addApi (newApi) {
  const db = new sqlite3.Database(file)
  db.run('INSERT INTO apis(apiId, title) VALUES(?, ?)', newApi.apiId, newApi.title, function(err){
    if (err){
      console.log(err)
      return
    }
    getDbApis()
  })
}

export function getDbApis () {
  const db = new sqlite3.Database(file)
  db.all('SELECT apiId, title FROM apis', (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
    store.dispatch(sendApis(rows))
    return
  })
}

export function getDbApiDetail (apiId) {
  getApiClasses(apiId)
}

export function addApiClass (apiClass) {
  const db = new sqlite3.Database(file)
  db.run('INSERT INTO classes(apiId, title, description) VALUES(?,?,?)', apiClass.apiId, apiClass.title, apiClass.description, (err, rows) => {
    if (err){
      console.log(err)
      return
    }
    return
  })
}

function getApiClasses (apiId) {
  const db = new sqlite3.Database(file)
  db.all('SELECT classId, title, description FROM classes WHERE apiId = ?', apiId, (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
    getClassMethods(rows)
    return
  })
}

function getClassMethods (classes) {
  let classesIds = []
  classes.forEach((classItem, classIndex) => {
    classesIds.push(classItem.classId)
  })
  const db = new sqlite3.Database(file)
  db.all('SELECT classId, title, content FROM methods WHERE classId IN (' + classesIds.toString() + ')', (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
    serializeDetail(classes, rows)
    return
  })
}

function serializeDetail (classes, methods) {
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

function createTables (db) {
  db.serialize(() => {
    db.run('CREATE TABLE apis (apiId TEXT PRIMARY KEY, title TEXT)')
    db.run('CREATE TABLE classes (classId TEXT PRIMARY KEY, apiId TEXT, title TEXT, description TEXT, FOREIGN KEY(apiId) REFERENCES apis(apiId) ON DELETE CASCADE)')
    db.run('CREATE TABLE methods (methodId TEXT PRIMARY KEY, classId TEXT, title TEXT, content TEXT, FOREIGN KEY(classId) REFERENCES classes(classId) ON DELETE CASCADE)')
    // db.run('INSERT INTO apis(title) VALUES("Api from Database")')
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
