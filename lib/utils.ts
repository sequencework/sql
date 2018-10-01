export class SqlContainer {
  public readonly chains: ReadonlyArray<string>
  public readonly expressions: any[]
  public readonly count: number
  constructor(
    chains: ReadonlyArray<string>,
    expressions: any[],
    count: number
  ) {
    this.chains = chains
    this.expressions = expressions
    this.count = count
  }
}

export type TemplateLiteralFunc<T> = (
  chains: ReadonlyArray<string>,
  ...expressions: any[]
) => T

export interface IPGQueryConfig {
  _sql?: SqlContainer
  text: string
  values: any[]
}

export type Sql = TemplateLiteralFunc<IPGQueryConfig> & {
  raw: (rawData: string) => IPGQueryConfig
}

export interface IPGQueryResult {
  rowCount: number
  rows: any[]
}

export interface IPGQueryable<T extends IPGQueryResult = IPGQueryResult> {
  readonly query: (query: IPGQueryConfig) => Promise<T>
}
