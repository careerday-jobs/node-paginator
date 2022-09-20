export class PaginatedResult<T> {
  constructor(
    public readonly pageNo: number,
    public readonly pageSize: number,
    public readonly totalItemNo: number,
    public readonly totalPageNo: number,
    public readonly items: T
  ) {}
}
