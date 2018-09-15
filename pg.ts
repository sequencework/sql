import _sql = require('./sql')

const sql: any = _sql

sql.query = db => (...args) => db.query(sql(...args))

sql.one = db => async (...args) => {
  const {
    rows: [row]
  } = await db.query(sql(...args))
  return row
}

sql.many = db => async (...args) => {
  const { rows } = await db.query(sql(...args))
  return rows
}

sql.count = db => async (...args) => {
  const { rowCount } = await db.query(sql(...args))
  return rowCount
}

export = sql
