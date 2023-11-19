import { useEffect, useState } from 'react'

import type { Node, Coord } from '../types'

const sleep = async (delay: number) => await new Promise((resolve) => setTimeout(resolve, delay))
const rows = 20
const columns = 40
const startingX = 1
const startingY = 1
const initalNode = {
  visited: false,
  blocked: false,
  distance: Infinity
}
const initialGridItems: Node[][] = Array(rows).fill(null).map(() => Array(columns).fill(null).map(() => ({ ...initalNode })))
export const Grid = () => {
  const [gridItems, setGridItems] = useState(initialGridItems)
  const [shortestPath, setShortestPath] = useState<Coord[]>([{ i: startingX, j: startingY }])
  useEffect(() => {
    const tempgrid = [...gridItems]
    tempgrid[startingX][startingY].distance = 0
    setGridItems(tempgrid)
    blockRandomCells()
  }, [])
  const blockRandomCells = () => {
    const tempgrid = gridItems.map(row => row.map(cell => ({
      ...cell,
      blocked: (Math.random() < 0.3)
    })))
    tempgrid[startingX][startingY].blocked = false
    // tempgrid[startingX][startingY].blocked = false

    setGridItems(tempgrid)
  }
  const handleCellClick = (i: number, j: number) => {
    const tempgrid = [...gridItems]
    tempgrid[i][j].blocked = !gridItems[i][j].blocked
    setGridItems(tempgrid)
  }

  const BFS = async (i: number, j: number) => {
    if (i >= rows - 1 || j >= columns - 1) return
    if (i <= 0 || j <= 0) return
    if (gridItems[i][j].visited) return
    if (gridItems[i][j].blocked) return
    const tempgrid = [...gridItems]
    tempgrid[i][j].visited = true
    const directions = [
      { i, j },
      { i, j: j + 1 },
      { i, j: j - 1 },
      { i: i - 1, j }, { i: i + 1, j }
    ]
    let shortestCoord = { i, j }
    let shortestDistance = tempgrid[i][j].distance
    directions.forEach(({ i: h, j: k }) => {
      if (tempgrid[i][j].distance > tempgrid[h][k].distance) {
        shortestCoord = { i: h, j: k }
        shortestDistance = tempgrid[h][k].distance
      }
    })
    // const shortestDistance = Math.min(
    //   tempgrid[i][j].distance,
    //   tempgrid[i][j + 1].distance,
    //   tempgrid[i][j - 1].distance,
    //   tempgrid[i - 1][j].distance,
    //   tempgrid[i + 1][j].distance)
    console.log('agregando', shortestCoord)
    setShortestPath([...shortestPath, shortestCoord])
    tempgrid[i][j].distance = (1 + shortestDistance)
    setGridItems(tempgrid)
    await sleep(50)
    void BFS(i, j + 1)
    void BFS(i, j - 1)
    void BFS(i + 1, j)
    void BFS(i - 1, j)
    // console.log({ shortestPath })
  }

  return <>
  <button onClick={() => { void BFS(startingX, startingY) }}>Iniciar</button>
  <table>
    <tbody >
    {
      gridItems.map((row, i) => {
        return <tr key={i}>
          {
          row.map((_, j) => {
            if (i === 0 || j === 0) return null
            if (i === rows - 1 || j === columns - 1) return null
            let bgColor = 'bg-blue-100'
            if (gridItems[i][j].blocked) {
              bgColor = 'bg-black'
            }
            if (gridItems[i][j].visited) {
              bgColor = 'bg-green-300'
            }
            return <td key={`${i}-${j}`} onClick={() => { handleCellClick(i, j) }}
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
