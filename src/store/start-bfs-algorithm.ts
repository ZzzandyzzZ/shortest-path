import { useStore } from '.'
import { sleep } from '../lib'
import { getGridSize } from '../utils'

export const startBfsAlgorithm = async () => {
  const { startCoord, grid, visitNode, setCurrNode, setIsRunning } = useStore.getState()
  const { gridCols, gridRows } = getGridSize(grid)
  setIsRunning(true)
  const queue = [grid[startCoord.i][startCoord.j]]
  while (queue.length >= 0) {
    const { isRunning } = useStore.getState()
    await sleep(10)
    const currNode = queue.shift()
    if (currNode == null || !isRunning) { console.log('FINISH'); break }
    setCurrNode(currNode)
    const { coord: { i, j } } = currNode
    const directions = [
      { i, j: j + 1 },
      { i, j: j - 1 },
      { i: i - 1, j },
      { i: i + 1, j }
    ]
    directions.forEach(({ i: ci, j: cj }) => {
      const { grid } = useStore.getState()
      if (ci >= gridRows || cj >= gridCols || ci < 0 || cj < 0) return
      const children = grid[ci][cj]
      if (children.visited || children.blocked) return
      visitNode({ i: ci, j: cj, currNode })
      queue.push(children)
    })
  }
  setIsRunning(false)
}
