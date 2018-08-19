const sql = require('../sql')

test('should work with the simple use case', () => {
  const author = 'hamsun'

  const query = sql`
    select * from books
    where author = ${author}
  `

  expect(query.text).toBe(`
    select * from books
    where author = $1
  `)
  expect(query.values).toHaveLength(1)
  expect(query.values[0]).toBe(author)
})

const findBookByAuthor = author => sql`
  select * from books
  ${author && sql`where author = ${author}`}
`

test('should work with imbricated sql tagged templates literals', () => {
  const query = findBookByAuthor('john')

  expect(query.text).toBe(`
  select * from books
  where author = $1
`)
  expect(query.values).toHaveLength(1)
  expect(query.values[0]).toBe('john')
})

test('should work with imbricated 2', () => {
  const query = findBookByAuthor()

  expect(query.text).toBe(`
  select * from books
  
`)
  expect(query.values).toHaveLength(0)
})

test('should work with imbricated 3', async () => {
  const db = {
    query: async ({ text, values }) => {
      if (text === 'select * from books') {
        return { rows: true }
      }
      return { rows: false }
    }
  }

  const books = await sql(db)`select * from books`

  expect(books).toBe(true)
})
