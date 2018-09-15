class SqlContainer {
  public readonly chains: ReadonlyArray<string>
  public readonly expressions: any[]
  constructor(chains: ReadonlyArray<string>, expressions: any[]) {
    this.chains = chains
    this.expressions = expressions
  }
}

interface ISqlOutput {
  _sql?: SqlContainer
  text: string
  values: any[]
}

function sqlText(
  count: number,
  chains: ReadonlyArray<string>,
  expressions: any[]
): ISqlOutput {
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

function sql(chains: ReadonlyArray<string>, ...expressions: any[]): ISqlOutput {
  return sqlText(1, chains, expressions)
}

export = sql
