import sqlPG from '../src/pg'

test('shorthand for node-postgres', async () => {
  const sampleBooks = ['book1', 'book2']
  const db = {
    query: async ({ text, values }) => {
      if (text === 'select * from books') {
        return { rows: sampleBooks }
      }
      return { rows: [] }
    }
  }

  const books = await sqlPG(db)`select * from books`
  expect(books).toBe(sampleBooks)
})
