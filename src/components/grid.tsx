import { useEffect, useState } from 'react'

import type { Node, Coord } from '../types'

const sleep = async (delay: number) => await new Promise((resolve) => setTimeout(resolve, delay))
const rows = 10
const columns = 15
const startCoords = { i: 6, j: 10 }
const endCoords = { i: 9, j: 14 }

const initalNode = {
  visited: false,
  blocked: false,
  distance: Infinity
}
const initialGridItems: Node[][] = Array(rows).fill(null).map((_, i) => Array(columns).fill(null).map((_, j) => ({ ...initalNode, coord: { i, j } })))
export const Grid = () => {
  const [gridItems, setGridItems] = useState(initialGridItems)

  useEffect(() => {
    const blockedGrid = getRandomBlockedGrid()
    blockedGrid[startCoords.i][startCoords.j].distance = 0
    setGridItems(blockedGrid)
  }, [])

  const getRandomBlockedGrid = () => {
    const tempgrid = gridItems.map(row => row.map(cell => ({
      ...cell,
      blocked: (Math.random() < 0.3)
    })))
    tempgrid[startCoords.i][startCoords.j].blocked = false
    tempgrid[endCoords.i][endCoords.j].blocked = false
    return tempgrid
  }

  const handleCellClick = ({ i, j }: Coord) => {
    const tempgrid = [...gridItems]
    tempgrid[i][j].blocked = !gridItems[i][j].blocked
    setGridItems(tempgrid)
  }

  const BFS = async (startingX: number, startingY: number) => {
    const queue = [gridItems[startingX][startingY]]
    while (queue.length >= 0) {
      await sleep(50)
      const curr = queue.shift()
      if (curr == null) { console.log('FINISH'); return }
      const { coord: { i, j } } = curr
      const directions = [
        { i, j },
        { i, j: j + 1 },
        { i, j: j - 1 },
        { i: i - 1, j }, { i: i + 1, j }
      ]
      directions.forEach(({ i: ci, j: cj }) => {
        if (ci >= rows - 1 || cj >= columns - 1) return
        if (ci <= 0 || cj <= 0) return
        const children = gridItems[ci][cj]
        if (children.visited) return
        if (children.blocked) return
        const tempgrid = [...gridItems]
        tempgrid[ci][cj].visited = true
        tempgrid[ci][cj].distance = tempgrid[i][j].distance + 1
        tempgrid[ci][cj].prevCoord = { i, j }
        setGridItems(tempgrid)
        queue.push(children)
      })
    }
  }

  return <>
  <button onClick={() => { void BFS(startCoords.i, startCoords.j) }}>Iniciar</button>
  <table>
    <tbody >
    {
      gridItems.map((row, i) => {
        return <tr key={i}>
          {
          row.map((_, j) => {
            if (i === 0 || j === 0) return null
            if (i === rows - 1 || j === columns - 1) return null
            const bgColor = getCellBgColor({ i, j })
            return <td key={`${i}-${j}`} onClick={() => { handleCellClick({ i, j }) }}
            className={`${bgColor}  border-blue-950 aspect-square h-[10px] w-[10px] text-xs`}>{gridItems[i][j].distance}</td>
          })
        }
        </tr>
      })
    }
    </tbody>
  </table>
  </>
}
