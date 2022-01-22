export interface IGraphQLStoreRecord {
  [key: string]: string;
}
export class GraphQLStore {
  private records: IGraphQLStoreRecord = {};

  public put(hash: string, value: string, timeout: number = 10000) {
    this.records[hash] = value;

    setTimeout(() => {
      Reflect.deleteProperty(this.records, hash);
    }, timeout);
  }

  public delete(hash: string): string {
    const val = this.records[hash];
    Reflect.deleteProperty(this.records, hash);
    return val || "";
  }

  public at(hash: string): string {
    return this.records[hash];
  }

  public check(hash: string): boolean {
    return !!this.records[hash];
  }
}
