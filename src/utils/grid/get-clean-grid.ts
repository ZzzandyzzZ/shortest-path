const initalNode = {
  visited: false,
  partOfSolution: false,
  blocked: false,
  distance: Infinity
}

interface Props {
  gridRows: number
  gridCols: number
}

export const getCleanGrid = ({ gridRows, gridCols }: Props) => {
  return Array(gridRows).fill(null).map(
    (_, i) => Array(gridCols).fill(null).map(
      (_, j) => ({ ...initalNode, coord: { i, j } })
    )
  )
}
