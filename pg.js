const sql = require('./sql')

const sqlPG = db => async (...args) => {
  const { rows } = await db.query(sql(...args))
  return rows
}

module.exports = sqlPG
