var sqlite3 = require('sqlite3').verbose()
var options = require('../../options')

var sqLiteDB = new sqlite3.Database('./data/' + options.sqliteDB, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.log(options.sqliteDB)
    console.log(err.message)
  } else console.log('Connected to sqlite database.')
})

exports.getRegionList = (req, res) => {
  let sql = 'SELECT regionID, regionName FROM mapRegions'
  sqLiteDB.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    } else {
      res.json(rows)
    }
  })
}

exports.getSystemList = (req, res) => {
  let sql = 'SELECT regionID, constellationID, solarSystemID, solarSystemName FROM mapSolarSystems ORDER BY solarSystemName'
  sqLiteDB.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    } else {
      res.json(rows)
    }
  })
}

exports.getSystemListNoWH = (req, res) => {
  let sql = 'SELECT regionID, constellationID, solarSystemID, solarSystemName FROM mapSolarSystems ORDER BY solarSystemName'
  sqLiteDB.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    } else {
      var results = []
      rows.forEach((row) => {
        if (!/J(\d){6}/.test(row.solarSystemName)) results.push(row)
      })
      res.json(results)
    }
  })
}
