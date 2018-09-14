const sql = require('./sql')

module.exports = db => {
  const fn = (...args) => db.query(sql(...args))

  fn.one = async (...args) => {
    const {
      rows: [row]
    } = await db.query(sql(...args))
    return row
  }

  fn.many = async (...args) => {
    const { rows } = await db.query(sql(...args))
    return rows
  }

  fn.count = async (...args) => {
    const { rowCount } = await db.query(sql(...args))
    return rowCount
  }

  return fn
}
