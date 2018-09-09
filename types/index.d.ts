// TypeScript Version: 2.9

export = sql

declare function sql(chains: {
  readonly query: (
    queryExpression: sql.QueryConfig
  ) => Promise<{
    rows: any[]
  }>
}): (chains: ReadonlyArray<string>, ...expressions: any[]) => Promise<any[]>

declare function sql(
  chains: ReadonlyArray<string>,
  ...expressions: any[]
): sql.QueryConfig

declare namespace sql {
  interface QueryConfig {
    _sql?: SqlContainer
    text: string
    values: any[]
  }
}

declare class SqlContainer {
  constructor(chains: ReadonlyArray<string>, expressions: any[])
  readonly chains: ReadonlyArray<string>
  readonly expressions: any[]
}
