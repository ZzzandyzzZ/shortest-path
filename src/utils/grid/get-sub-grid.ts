import { type Node } from '../../types'

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
  const sliceGrid = baseGrid
    .slice(rowStart, rowStart + gridRows)
    .map(row => row.slice(colStart, colStart + gridCols))
  const subgrid = sliceGrid
    .map((row, i) => row.map((cell, j) => ({ ...cell, coord: { i, j } })))
  const startCoord = { i: 0, j: 0 }
  const endCord = { i: gridRows - 1, j: gridCols - 1 }
  subgrid[startCoord.i][startCoord.j].distance = 0
  subgrid[startCoord.i][startCoord.j].visited = true
  subgrid[startCoord.i][startCoord.j].blocked = false
  subgrid[endCord.i][endCord.j].blocked = false
  return subgrid
}
