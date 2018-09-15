// This contains sample code which tests the typings. This code does not run, but it is type-checked.
// See https://github.com/DefinitelyTyped/DefinitelyTyped

import sql = require('@sequencework/sql')
import sqlPG = require('@sequencework/sql/pg')

const yearRange = [1983, 1992]

// basic usage
// $ExpectType QueryConfig
sql`
  select * from movies
  where
    year >= ${yearRange[0]}
    and year <= ${yearRange[1]}
`

// expressions returning undefined
// $ExpectType QueryConfig
sql`
  select * from books
  ${undefined}
`

// expressions returning booleans
// $ExpectType QueryConfig
sql`select * from books where read = ${false}`

// expressions returning null
// $ExpectType QueryConfig
sql`select * from books where author = ${null}`

// imbricated sql tags
const author = 'steinbeck'
// $ExpectType QueryConfig
sql`
  select * from books
  ${author && sql`where author = ${author}`}
`

// imbricated sql tags (2 levels)
const [expr0, expr1, expr2] = ['i', 'like', 'sql']
// $ExpectType QueryConfig
sql`
  level 0 ${expr0}
  ${sql`
    level 1 ${expr1}
    ${sql`
      level 2 ${expr2}
    `}
  `}
`

// shorthand for node-postgres
const sampleBooks = ['book1', 'book2']
interface CustomQueryResult {
  rows: any[]
  rowCount: number
  oid: number
}
const db: sqlPG.queryable<CustomQueryResult> = {
  query: async ({ text, values }) => {
    if (text === 'select * from books') {
      return {
        rows: sampleBooks,
        rowCount: sampleBooks.length,
        oid: Math.random()
      }
    }
    return { rows: [], rowCount: 0, oid: Math.random() }
  }
}
// sqlPG.query should return pg's query result
// $ExpectType Promise<CustomQueryResult>
sqlPG.query(db)`select * from books`

// sqlPG.one should return the first row
// $ExpectType Promise<any>
sqlPG.one(db)`select * from books`

// sqlPG.many should return rows
// $ExpectType Promise<any[]>
sqlPG.many(db)`select * from books`

// sqlPG.count should return rowCount
// $ExpectType Promise<number>
sqlPG.count(db)`select * from books`

// sqlPG should return PGQueryConfig
// $ExpectType QueryConfig
sqlPG`select * from books`
