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
  function sqlPG(chains: {
    readonly query: (
      queryExpression: sqlElements.QueryConfig
    ) => Promise<{
      rows: any[]
    }>
  }): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<any[]>

  export = sqlPG
}
