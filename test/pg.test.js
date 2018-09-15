const sql = require('../pg')

const sampleBooks = ['book1', 'book2']
const db = {
  query: async ({ text, values }) => {
    if (text === 'select * from books') {
      return { rows: sampleBooks, rowCount: sampleBooks.length }
    }
    return { rows: [], rowCount: 0 }
  }
}

test("sql.query should return pg's query result", async () => {
  const { rows, rowCount } = await sql.query(db)`select * from books`
  expect(rows).toBe(sampleBooks)
  expect(rowCount).toBe(sampleBooks.length)
})

test('sql.one should return the first row', async () => {
  const book = await sql.one(db)`select * from books`
  expect(book).toBe(sampleBooks[0])
})

test('sql.many should return rows', async () => {
  const books = await sql.many(db)`select * from books`
  expect(books).toBe(sampleBooks)
})

test('sql.count should return rowCount', async () => {
  const nbBooks = await sql.count(db)`select * from books`
  expect(nbBooks).toBe(sampleBooks.length)
})
