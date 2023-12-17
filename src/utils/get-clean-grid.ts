const initalNode = {
  visited: false,
  partOfSolution: false,
  blocked: false,
  distance: Infinity
}

export const getCleanGrid = (gridRows: number, gridColumns: number) => {
  return Array(gridRows).fill(null).map(
    (_, i) => Array(gridColumns).fill(null).map(
      (_, j) => ({ ...initalNode, coord: { i, j } })
    )
  )
}
