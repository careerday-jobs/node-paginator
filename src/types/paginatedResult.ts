export class PaginatedResult<T> {
  constructor(
    private readonly pageNo: number,
    private readonly pageSize: number,
    private readonly totalItemNo: number,
    private readonly totalPageNo: number,
    private readonly items: T
  ) {}
}
