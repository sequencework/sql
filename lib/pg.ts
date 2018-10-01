import _sql = require('./sql')
import { IPGQueryable, IPGQueryResult, Sql, TemplateLiteralFunc } from './utils'

type PGSql = Sql & {
  query: <T extends IPGQueryResult>(
    db: IPGQueryable<T>
  ) => TemplateLiteralFunc<Promise<T>>
  many: (db: IPGQueryable) => TemplateLiteralFunc<Promise<any[]>>
  one: (db: IPGQueryable) => TemplateLiteralFunc<Promise<any>>
  count: (db: IPGQueryable) => TemplateLiteralFunc<Promise<number>>
}

const sql = ((chains, ...expressions) => _sql(chains, ...expressions)) as PGSql

sql.raw = rawData => _sql.raw(rawData)

sql.query = db => (chains, ...expressions) =>
  db.query(_sql(chains, ...expressions))

sql.one = db => async (chains, ...expressions) => {
  const {
    rows: [row]
  } = await db.query(_sql(chains, ...expressions))
  return row
}

sql.many = db => async (chains, ...expressions) => {
  const { rows } = await db.query(_sql(chains, ...expressions))
  return rows
}

sql.count = db => async (chains, ...expressions) => {
  const { rowCount } = await db.query(_sql(chains, ...expressions))
  return rowCount
}

export = sql
