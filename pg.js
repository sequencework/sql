const sql = require('./sql')

module.exports = db => (...args) => db.query(sql(...args))

module.exports.one = db => async (...args) => {
  const {
    rows: [row]
  } = await db.query(sql(...args))
  return row
}

module.exports.many = db => async (...args) => {
  const { rows } = await db.query(sql(...args))
  return rows
}

module.exports.count = db => async (...args) => {
  const { rowCount } = await db.query(sql(...args))
  return rowCount
}
