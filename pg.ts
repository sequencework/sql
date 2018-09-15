import {
  IPGQueryable,
  IPGQueryConfig,
  IPGQueryResult,
  TemplateLiteralFunc
} from './lib/utils'
import _sql = require('./sql')

type PGSqlHelper<T> = (db: IPGQueryable) => TemplateLiteralFunc<Promise<T>>

type PGSql = TemplateLiteralFunc<IPGQueryConfig> & {
  query: PGSqlHelper<IPGQueryResult>
  many: PGSqlHelper<any[]>
  one: PGSqlHelper<any>
  count: PGSqlHelper<number>
}

const sql = ((chains, ...expressions) => _sql(chains, ...expressions)) as PGSql

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
