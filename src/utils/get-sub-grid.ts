import { type Node } from '../types'

interface Props {
  baseGrid: Node[][]
  gridCols: number
  gridRows: number
}

/**
 * Retrieves a subgrid from a base grid, starting on the specified central point defined by columns and rows.
*/
export const getSubGrid = ({ baseGrid, gridCols, gridRows }: Props) => {
  const maxRows = baseGrid.length
  const maxCols = baseGrid[0].length
  const rowStart = maxRows / 2 - gridRows / 2
  const colStart = maxCols / 2 - gridCols / 2
  return baseGrid.slice(rowStart, rowStart + gridRows).map(row => row.slice(colStart, colStart + gridCols))
}
