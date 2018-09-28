import { IPGQueryConfig, SqlContainer, TemplateLiteralFunc } from './utils'

function sqlText(
  count: number,
  chains: ReadonlyArray<string>,
  expressions: any[]
): IPGQueryConfig {
  let text = chains[0]
  const values = []

  for (let i = 0; i < expressions.length; i++) {
    const expression = expressions[i]

    if (expression === undefined) {
      // if expression is undefined, just skip it
      text += chains[i + 1]
    } else if (expression && expression._sql instanceof SqlContainer) {
      // if expression is a sub `sql` template literal
      const {
        text: _text,
        values: _values,
        _sql: { count: _count }
      } = sqlText(count, expression._sql.chains, expression._sql.expressions)
      count = _count
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
    _sql: new SqlContainer(chains, expressions, count),
    text,
    values
  }
}

const sql: TemplateLiteralFunc<IPGQueryConfig> = (chains, ...expressions) =>
  sqlText(1, chains, expressions)

export = sql
