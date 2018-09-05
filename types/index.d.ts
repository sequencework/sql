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
    _sql?: { chains: ReadonlyArray<string>; expressions: any[] }
    text: string
    values: any[]
  }
}
