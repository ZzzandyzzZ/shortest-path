import { type Node } from '../../types'

export const getGridSize = (grid: Node[][]) => {
  return {
    gridRows: grid.length,
    gridCols: grid[0].length
  }
}
