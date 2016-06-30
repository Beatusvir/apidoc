const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
var file = './data/apis.db'

export function initDb () {
  var exists = fs.existsSync(file)
  const db = new sqlite3.Database(file)
  if (!exists) {
    createTables(db)
  }
}

export function getDbApis () {
  const db = new sqlite3.Database(file)
    db.all('SELECT * FROM apis', (err, rows) => {
      if (err) {
      }
    })
}

function createTables (db) {
  db.serialize(() => {
    db.run('CREATE TABLE apis (apiId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)')
    db.run('CREATE TABLE classes (classId INTEGER PRIMARY KEY AUTOINCREMENT, apiId INTEGER, title TEXT, description TEXT, FOREIGN KEY(apiId) REFERENCES apis(apiId))')
    db.run('CREATE TABLE methods (methods INTEGER PRIMARY KEY AUTOINCREMENT, classId INTEGER, title TEXT, content TEXT, FOREIGN KEY(classId) REFERENCES classes(classId))')
    db.run('INSERT INTO apis(title) VALUES("Api from Database")')
  })
  db.close()
}
