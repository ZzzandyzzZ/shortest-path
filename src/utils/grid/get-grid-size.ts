import { type Grid } from '../../types'

export const getGridSize = (grid: Grid) => {
  return {
    gridRows: grid.length,
    gridCols: grid[0].length
  }
}
