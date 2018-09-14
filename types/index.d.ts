// TypeScript Version: 2.9

declare namespace sqlElements {
  interface QueryConfig {
    _sql?: SqlContainer
    text: string
    values: any[]
  }

  class SqlContainer {
    constructor(chains: ReadonlyArray<string>, expressions: any[])
    readonly chains: ReadonlyArray<string>
    readonly expressions: any[]
  }
}

declare module '@sequencework/sql' {
  function sql(
    chains: ReadonlyArray<string>,
    ...expressions: any[]
  ): sqlElements.QueryConfig

  export = sql
}

declare module '@sequencework/sql/pg' {
  type PGResultPromise = Promise<{
    rows: any[]
  }>

  interface PGQueryResult {
    rowCount: number
    rows: any[]
  }

  function sql(db: {
    readonly query: (
      queryExpression: sqlElements.QueryConfig
    ) => Promise<PGQueryResult>
  }): (
    chains: ReadonlyArray<string>,
    ...expressions: any[]
  ) => Promise<PGQueryResult>

  function one(chains: {
    readonly query: (
      queryExpression: sqlElements.QueryConfig
    ) => Promise<PGQueryResult>
  }): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<any>
  namespace one {

  }

  function many(chains: {
    readonly query: (
      queryExpression: sqlElements.QueryConfig
    ) => Promise<PGQueryResult>
  }): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<any[]>
  namespace many {

  }

  function count(chains: {
    readonly query: (
      queryExpression: sqlElements.QueryConfig
    ) => Promise<PGQueryResult>
  }): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<number>
  namespace count {

  }

  export = sql
}
