export class SqlContainer {
  public readonly chains: ReadonlyArray<string>
  public readonly expressions: any[]
  constructor(chains: ReadonlyArray<string>, expressions: any[]) {
    this.chains = chains
    this.expressions = expressions
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

export interface IPGQueryResult {
  rowCount: number
  rows: any[]
}

export interface IPGQueryable {
  readonly query: (query: IPGQueryConfig) => Promise<IPGQueryResult>
}
