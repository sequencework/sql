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
const db = {
  query: async ({ text, values }: { text: string; values: any[] }) => {
    if (text === 'select * from books') {
      return { rows: sampleBooks }
    }
    return { rows: [] }
  }
}
const getBooks = async (): Promise<string[]> => {
  const rows = await sqlPG(db)`select * from books`
  return rows as string[]
}
// $ExpectType Promise<string[]>
getBooks()
