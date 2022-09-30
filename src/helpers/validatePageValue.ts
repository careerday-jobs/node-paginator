export interface PageValue {
  pageNo: number;
  pageSize: number;
}

export const _MAX_PAGE_SIZE = 100;

export function validatePageValue(
  pageNoParam: number,
  pageSizeParam: number,
  isNoMinResultLimit: boolean
): PageValue {
  const pageNo: number =
    typeof pageNoParam === 'number' ? pageNoParam : Number(pageNoParam);
  let pageSize: number =
    typeof pageSizeParam === 'number' ? pageSizeParam : Number(pageSizeParam);

  if (!Number.isInteger(pageNo) || !Number.isInteger(pageSize)) {
    throw new Error('pageSize or pageNo are not valid integer values.');
  }

  if (pageNo < 1 || pageSize < 1) {
    throw new Error('pageSize or pageNo must be positive numbers.');
  }

  pageSize = isNoMinResultLimit ? Math.min(pageSize, _MAX_PAGE_SIZE) : pageSize;

  const pageValue: PageValue = {
    pageNo,
    pageSize,
  };

  return pageValue;
}
