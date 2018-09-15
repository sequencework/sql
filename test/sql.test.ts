import sql = require('../sql')

const trimSpaces = str => str.trim().replace(/\s+/g, ' ')

test('basic usage', () => {
  const yearRange = [1983, 1992]

  const query = sql`
    select * from movies
    where
      year >= ${yearRange[0]}
      and year <= ${yearRange[1]}
  `

  expect(trimSpaces(query.text)).toBe(
    'select * from movies where year >= $1 and year <= $2'
  )
  expect(query.values).toHaveLength(2)
  expect(query.values[0]).toBe(yearRange[0])
  expect(query.values[1]).toBe(yearRange[1])
})

test('ignore expressions returning `undefined`', () => {
  const query = sql`
    select * from books
    ${undefined}
  `

  expect(trimSpaces(query.text)).toBe('select * from books')
  expect(query.values).toHaveLength(0)
})

test('add expressions returning `false`', () => {
  const query = sql`select * from books where read = ${false}`

  expect(trimSpaces(query.text)).toBe('select * from books where read = $1')
  expect(query.values).toHaveLength(1)
  expect(query.values[0]).toBe(false)
})

test('add expressions returning `null`', () => {
  const query = sql`select * from books where author = ${null}`

  expect(trimSpaces(query.text)).toBe('select * from books where author = $1')
  expect(query.values).toHaveLength(1)
  expect(query.values[0]).toBe(null)
})

test('imbricated sql tags', () => {
  const author = 'steinbeck'
  const query = sql`
    select * from books
    ${author && sql`where author = ${author}`}
  `

  expect(trimSpaces(query.text)).toBe('select * from books where author = $1')
  expect(query.values).toHaveLength(1)
  expect(query.values[0]).toBe(author)
})

test('imbricated sql tags (2 levels)', () => {
  const [expr0, expr1, expr2] = ['i', 'like', 'sql']
  const query = sql`
    level 0 ${expr0}
    ${sql`
      level 1 ${expr1}
      ${sql`
        level 2 ${expr2}
      `}
    `}
  `

  expect(trimSpaces(query.text)).toBe('level 0 $1 level 1 $2 level 2 $3')
  expect(query.values).toHaveLength(3)
  expect(query.values[0]).toBe(expr0)
  expect(query.values[1]).toBe(expr1)
  expect(query.values[2]).toBe(expr2)
})

test('json as query parameter', () => {
  const jsonValue = { _sql: { some: 'data' }, item: 'value' }
  const query = sql`select obj from movies where obj = ${jsonValue}`

  expect(trimSpaces(query.text)).toBe('select obj from movies where obj = $1')
  expect(query.values).toHaveLength(1)
  expect(query.values[0]).toBe(jsonValue)
})
