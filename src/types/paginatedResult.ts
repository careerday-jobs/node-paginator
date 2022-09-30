export class PaginatedResult<T> {
  constructor(
    public pageNo: number,
    public pageSize: number,
    public totalItemNo: number,
    public totalPageNo: number,
    public items: T
  ) {}
}
