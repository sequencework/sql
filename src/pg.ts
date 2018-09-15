import sql = require('./sql')

function sqlPG(db: {
  readonly query: (queryExpression) => Promise<{ rows: any[] }>
}) {
  return async (chains, ...expressions) => {
    const { rows } = await db.query(sql(chains, ...expressions))
    return rows
  }
}

export = sqlPG
