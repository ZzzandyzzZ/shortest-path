import { create } from 'zustand'

import { getRandomString } from '../lib'

import { type Coord, type Node } from '../types'
import { generateRandomGrid } from '../utils/generate-random-grid'

interface Store {
  gridRows: number
  gridColumns: number
  grid: Node[][]
  startCoord: Coord
  endCoord: Coord
  seed: string | null
  generateGrid: (seed?: string) => void
  setGridRows: (rows: number) => void
  setGridColumns: (columns: number) => void
  blockNode: ({ i, j }: Coord) => void
  setSeed: (seed: string) => void
}

const startCoord = { i: 0, j: 0 }
const endCoord = { i: 0, j: 0 }
const gridRows = 6
const gridColumns = 10
const initalNode = {
  visited: false,
  partOfSolution: false,
  blocked: false,
  distance: Infinity
}
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
  seed: null,
  generateGrid: (initalSeed) => {
    const seed = initalSeed ?? getRandomString()
    const startCoord = get().startCoord
    const endCoord = get().endCoord
    const tempGrid = generateRandomGrid({ initialGrid, seed })
    tempGrid[startCoord.i][startCoord.j].distance = 0
    tempGrid[startCoord.i][startCoord.j].visited = true
    tempGrid[startCoord.i][startCoord.j].blocked = false
    tempGrid[endCoord.i][endCoord.j].blocked = false
    set({ grid: tempGrid, seed })
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
  blockNode: ({ i, j }: Coord) => {
    const grid = get().grid
    const tempGrid = [...grid]
    tempGrid[i][j].blocked = !grid[i][j].blocked
    set({ grid: tempGrid })
  }
}))
