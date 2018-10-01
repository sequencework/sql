import sql = require('../lib/pg')

const sampleBooks = ['book1', 'book2']
const db = {
  query: async ({ text, values }) => {
    if (text === 'select * from books where read = $1') {
      return {
        oid: 1,
        rowCount: sampleBooks.length,
        rows: sampleBooks
      }
    }
    return {
      oid: 0,
      rowCount: 0,
      rows: []
    }
  }
}

test('sql should return the query config', async () => {
  const queryConfig = sql`select * from books where read = ${false}`
  expect(queryConfig._sql).toBeTruthy()
})

test("sql.query should return pg's query result", async () => {
  const { rows, rowCount, oid } = await sql.query(
    db
  )`select * from books where read = ${false}`
  expect(rows).toBe(sampleBooks)
  expect(rowCount).toBe(sampleBooks.length)
  expect(oid).toBe(1)
})

test('sql.one should return the first row', async () => {
  const book = await sql.one(db)`select * from books where read = ${false}`
  expect(book).toBe(sampleBooks[0])
})

test('sql.many should return rows', async () => {
  const books = await sql.many(db)`select * from books where read = ${false}`
  expect(books).toBe(sampleBooks)
})

test('sql.count should return rowCount', async () => {
  const nbBooks = await sql.count(db)`select * from books where read = ${false}`
  expect(nbBooks).toBe(sampleBooks.length)
})

test('sql.raw should work with pg shorthand', async () => {
  const tableName = 'books'
  const { rows, rowCount, oid } = await sql.query(db)`select * from ${sql.raw(
    tableName
  )} where read = ${false}`
  expect(rows).toBe(sampleBooks)
  expect(rowCount).toBe(sampleBooks.length)
  expect(oid).toBe(1)
})
