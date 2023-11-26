import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import type { Coord, Node } from '../types'

const sleep = async (delay: number) => await new Promise((resolve) => setTimeout(resolve, delay))
const rows = 30
const columns = 40
const startCoords = { i: 1, j: 1 }
const endCoords = { i: rows - 2, j: columns - 2 }

const initalNode = {
  visited: false,
  partOfSolution: false,
  blocked: false,
  distance: Infinity
}

function linearCongruentialGenerator(seed: string) {
  const a = 1664525
  const c = 1013904223
  const m = Math.pow(2, 32)

  let value = 0
  for (let i = 0; i < seed.length; i++) {
    value += seed.charCodeAt(i)
  }

  return {
    next: function () {
      value = (a * value + c) % m
      return value
    }
  }
}

const defaultSearchParams = {
  seed: Math.random().toString()
}
export const Grid = () => {
  const initialGridItems: Node[][] = Array(rows).fill(null).map((_, i) => Array(columns).fill(null).map((_, j) => ({ ...initalNode, coord: { i, j } })))
  const [gridItems, setGridItems] = useState(initialGridItems)
  const [params] = useSearchParams(defaultSearchParams)
  const seed = params.get('seed') as string
  useEffect(() => {
    const blockedGrid = getRandomBlockedGrid()
    blockedGrid[startCoords.i][startCoords.j].distance = 0
    blockedGrid[startCoords.i][startCoords.j].visited = true
    setGridItems(blockedGrid)
  }, [seed])

  const log = linearCongruentialGenerator(seed)

  const getRandomBlockedGrid = () => {
    const tempgrid = gridItems.map(row => row.map(cell => ({
      ...cell,
      blocked: log.next() % 10 < 4
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

  const getCellBgColor = ({ i, j }: Coord) => {
    if (gridItems[i][j].blocked) return 'bg-black'
    if (i === startCoords.i && j === startCoords.j) return 'bg-green-600'
    if (i === endCoords.i && j === endCoords.j) return 'bg-red-600'
    if (gridItems[i][j].partOfSolution) return 'bg-blue-600'
    if (gridItems[i][j].visited) return 'bg-green-300'
    return 'bg-blue-100'
  }
  const updateCell = ({ i, j, currNode }: Coord & { currNode: Node }) => {
    const tempgrid = [...gridItems]
    tempgrid[i][j].visited = true
    tempgrid[i][j].distance = currNode.distance + 1
    tempgrid[i][j].prevCoord = currNode.coord
    setGridItems(tempgrid)
  }

  const drawShortestPath = () => {
    let currNode = gridItems[endCoords.i][endCoords.j]
    while (currNode.prevCoord != null) {
      const { coord: { i, j }, prevCoord } = currNode
      const tempgrid = [...gridItems]
      tempgrid[i][j].partOfSolution = true
      setGridItems(tempgrid)
      currNode = gridItems[prevCoord.i][prevCoord.j]
    }
  }

  const BFS = async ({ i: startingX, j: startingY }: Coord) => {
    const queue = [gridItems[startingX][startingY]]
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
        if (ci >= rows - 1 || cj >= columns - 1 || ci <= 0 || cj <= 0) return
        const children = gridItems[ci][cj]
        if (children.visited || children.blocked) return
        updateCell({ i: ci, j: cj, currNode })
        queue.push(children)
      })
    }
    drawShortestPath()
  }

  return <>
  <button onClick={() => { void BFS(startCoords) }}>Iniciar</button>
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
            className={`${bgColor}  border-blue-950 aspect-square h-[10px] w-[10px] text-xs`}>
              {/* {gridItems[i][j].distance} */}
              {/* {i}-{j} */}
              </td>
          })
        }
        </tr>
      })
    }
    </tbody>
  </table>
  </>
}
