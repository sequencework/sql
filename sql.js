const sqlText = (count, chains, expressions) => {
  let text = chains[0]
  const values = []

  for (let i = 0; i < expressions.length; i++) {
    const expression = expressions[i]

    if (expression === undefined) {
      // if expression is undefined, just skip it
      text += chains[i + 1]
    } else if (expression && expression._sql instanceof SqlContainer) {
      // if expression is a sub `sql` template literal
      const { text: _text, values: _values } = sqlText(
        count,
        expression._sql.chains,
        expression._sql.expressions
      )
      text += _text + chains[i + 1]
      values.push(..._values)
    } else {
      // if expression is a simple value
      text += `$${count}` + chains[i + 1]
      values.push(expression)
      count++
    }
  }

  return {
    _sql: new SqlContainer(chains, expressions),
    text,
    values
  }
}

const sql = (chains, ...expressions) => {
  // if first argument is a db, then the tag is used like this :
  // sql(db)`...`
  if (chains.query) {
    const db = chains
    return async (chains, ...expressions) => {
      const { rows } = await db.query(sqlText(1, chains, expressions))
      return rows
    }
  }

  // basic usage
  // sql`...`
  return sqlText(1, chains, expressions)
}

class SqlContainer {
  constructor(chains, expressions) {
    this.chains = chains
    this.expressions = expressions
  }
}

module.exports = sql
