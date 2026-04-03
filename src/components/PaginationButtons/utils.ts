const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function getVisiblePages(
  currentPageNumber: number,
  totalPages: number,
  boundaryCount = 1,
  siblingCount = 1,
): (number | "start-ellipsis" | "end-ellipsis")[] {
  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      currentPageNumber - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(
      currentPageNumber + siblingCount,
      boundaryCount + siblingCount * 2 + 2,
    ),
    totalPages - boundaryCount - 1,
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (["start-ellipsis"] as const)
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? (["end-ellipsis"] as const)
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),
    ...endPages,
  ];
}
