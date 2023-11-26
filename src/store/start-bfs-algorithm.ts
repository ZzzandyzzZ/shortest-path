import { useStore } from '.'
import { sleep } from '../lib'

export const startBfsAlgorithm = async () => {
  const { startCoord, gridColumns, gridRows, grid, visitNode } = useStore.getState()
  const queue = [grid[startCoord.i][startCoord.j]]
  while (queue.length >= 0) {
    await sleep(1)
    const currNode = queue.shift()
    if (currNode == null) { console.log('FINISH'); break }
    const { coord: { i, j } } = currNode
    const directions = [
      { i, j: j + 1 },
      { i, j: j - 1 },
      { i: i - 1, j },
      { i: i + 1, j }
    ]
    directions.forEach(({ i: ci, j: cj }) => {
      if (ci >= gridRows || cj >= gridColumns || ci < 0 || cj < 0) return
      const children = grid[ci][cj]
      if (children.visited || children.blocked) return
      visitNode({ i: ci, j: cj, currNode })
      queue.push(children)
    })
  }
}
