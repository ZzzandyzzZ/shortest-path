import { create } from 'zustand'

import { getRandomString } from '../lib'

import { type Coord, type Node } from '../types'
import { generateRandomGrid } from '../utils/generate-random-grid'

interface Store {
  gridRows: number
  gridColumns: number
  grid: Node[][]
  currNode: Node | null
  startCoord: Coord
  endCoord: Coord
  seed: string | null
  setCurrNode: (node: Node) => void
  generateGrid: (seed?: string) => void
  setGridRows: (rows: number) => void
  setGridColumns: (columns: number) => void
  blockNode: ({ i, j }: Coord) => void
  setSeed: (seed: string) => void
  visitNode: ({ i, j, currNode }: Coord & { currNode: Node }) => void
  drawShortestPath: () => void
  resetGrid: () => void
}

const gridRows = 40
const gridColumns = 50
const initalNode = {
  visited: false,
  partOfSolution: false,
  blocked: false,
  distance: Infinity
}
const startCoord = { i: 0, j: 0 }
const endCoord = { i: gridRows - 1, j: gridColumns - 1 }
const initialGrid = Array(gridRows).fill(null).map(
  (_, i) => Array(gridColumns).fill(null).map(
    (_, j) => ({ ...initalNode, coord: { i, j } })
  )
)

export const useStore = create<Store>((set, get) => ({
  grid: initialGrid,
  gridRows,
  gridColumns,
  startCoord,
  endCoord,
  currNode: null,
  seed: null,
  setCurrNode: (node: Node) => {
    set({ currNode: node })
  },
  resetGrid: () => {
    const grid = get().grid
    const startCoord = get().startCoord
    const endCoord = get().endCoord
    const tempGrid = grid.map((row) => {
      return row.map(({ blocked, coord }) => {
        return { ...initalNode, blocked, coord }
      })
    })
    tempGrid[startCoord.i][startCoord.j].distance = 0
    tempGrid[startCoord.i][startCoord.j].visited = true
    tempGrid[startCoord.i][startCoord.j].blocked = false
    tempGrid[endCoord.i][endCoord.j].blocked = false
    set({ grid: tempGrid, currNode: null })
  },
  generateGrid: (initalSeed) => {
    const seed = initalSeed ?? getRandomString()
    const startCoord = get().startCoord
    const endCoord = get().endCoord
    const tempGrid = generateRandomGrid({ initialGrid, seed })
    tempGrid[startCoord.i][startCoord.j].distance = 0
    tempGrid[startCoord.i][startCoord.j].visited = true
    tempGrid[startCoord.i][startCoord.j].blocked = false
    tempGrid[endCoord.i][endCoord.j].blocked = false
    set({ grid: tempGrid, seed, currNode: null })
  },
  setGridRows: (rows: number) => {
    set({ gridRows: rows })
  },
  setGridColumns: (columns: number) => {
    set({ gridColumns: columns })
  },
  setSeed: (seed: string) => {
    set({ seed })
  },
  visitNode: ({ i, j, currNode }: Coord & { currNode: Node }) => {
    const grid = get().grid
    const tempGrid = [...grid]
    tempGrid[i][j].visited = true
    tempGrid[i][j].distance = currNode.distance + 1
    tempGrid[i][j].prevCoord = currNode.coord
    set({ grid: tempGrid })
  },
  blockNode: ({ i, j }: Coord) => {
    const grid = get().grid
    const tempGrid = [...grid]
    tempGrid[i][j].blocked = !grid[i][j].blocked
    set({ grid: tempGrid })
  },
  drawShortestPath: () => {
    const endCoord = get().endCoord
    const grid = get().grid
    let currNode = grid[endCoord.i][endCoord.j]
    while (currNode.prevCoord != null) {
      const { coord: { i, j }, prevCoord } = currNode
      const tempGrid = [...grid]
      tempGrid[i][j].partOfSolution = true
      set({ grid: tempGrid })
      currNode = grid[prevCoord.i][prevCoord.j]
    }
  }
}))
