// TypeScript Version: 2.9

declare module '@sequencework/sql' {
  function sql(
    chains: ReadonlyArray<string>,
    ...expressions: any[]
  ): sql.QueryConfig

  namespace sql {
    interface QueryConfig {
      _sql?: SqlContainer
      text: string
      values: any[]
    }

    class SqlContainer {
      constructor(
        chains: ReadonlyArray<string>,
        expressions: any[],
        count: number
      )
      readonly chains: ReadonlyArray<string>
      readonly expressions: any[]
      readonly count: number
    }
  }

  export = sql
}

declare module '@sequencework/sql/pg' {
  import _sql = require('@sequencework/sql')

  function sql(
    chains: ReadonlyArray<string>,
    ...expressions: any[]
  ): sql.QueryConfig

  namespace sql {
    type QueryConfig = _sql.QueryConfig

    interface PGQueryResult {
      rowCount: number
      rows: any[]
    }

    interface queryable<T extends PGQueryResult = PGQueryResult> {
      readonly query: (queryExpression: QueryConfig) => Promise<T>
    }

    function query<T extends PGQueryResult>(
      db: queryable<T>
    ): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<T>

    function one(
      chains: queryable
    ): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<any>

    function many(
      chains: queryable
    ): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<any[]>

    function count(
      chains: queryable
    ): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<number>
  }

  export = sql
}
