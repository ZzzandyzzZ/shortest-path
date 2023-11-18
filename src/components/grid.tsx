import { useEffect, useState } from 'react'

import type { Node } from '../types'

const sleep = async (delay) => await new Promise((resolve) => setTimeout(resolve, delay))
const rows = 10
const columns = 15
const initalNode = {
  visited: false,
  blocked: false,
  distance: Infinity
}
const initialGridItems: Node[][] = Array(rows).fill(null).map(() => Array(columns).fill(null).map(() => ({ ...initalNode })))
export const Grid = () => {
  const [gridItems, setGridItems] = useState(initialGridItems)
  const startingX = 1
  const startingY = 1
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
    tempgrid[i][j].distance = (1 + Math.min(
      tempgrid[i][j].distance,
      tempgrid[i][j + 1].distance,
      tempgrid[i][j - 1].distance,
      tempgrid[i - 1][j].distance,
      tempgrid[i - 1][j + 1].distance,
      tempgrid[i - 1][j - 1].distance,
      tempgrid[i + 1][j - 1].distance,
      tempgrid[i + 1][j].distance,
      tempgrid[i + 1][j + 1].distance))
    setGridItems(tempgrid)
    await sleep(500)
    void BFS(i, j + 1)
    void BFS(i, j - 1)
    void BFS(i + 1, j)
    void BFS(i + 1, j + 1)
    void BFS(i + 1, j - 1)
    void BFS(i - 1, j)
    void BFS(i - 1, j + 1)
    void BFS(i - 1, j - 1)
  }

  return <>
  <button onClick={() => { void BFS(startingX, startingY) }}>Iniciar</button>
  <table className=''>
    <tbody>
    {
      gridItems.map((row, i) => {
        return <tr key={i}>
          {
          row.map((_, j) => {
            // if (i === 0 || j === 0) return null
            // if (i === rows - 1 || j === columns - 1) return null
            let bgColor = 'bg-blue-100'
            if (gridItems[i][j].blocked) {
              bgColor = 'bg-black'
            }
            if (gridItems[i][j].visited) {
              bgColor = 'bg-green-300'
            }
            return <td key={`${i}-${j}`} onClick={() => { handleCellClick(i, j) }}
            className={`${bgColor}  border-blue-950 border-2 aspect-square w-[30px] inline-block`}>{gridItems[i][j].distance}</td>
          })
        }
        </tr>
      })
    }
    </tbody>
  </table>
  </>
}
