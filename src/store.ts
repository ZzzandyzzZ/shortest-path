import { create } from 'zustand'

import { type Coord, type Node } from './types'

interface Store {
  gridRows: number
  gridColumns: number
  grid: Node[][]
  startCoord: Coord
  endCoord: Coord
  resetGrid: () => void
  setGridRows: (rows: number) => void
  setGridColumns: (columns: number) => void
  blockNode: ({ i, j }: Coord) => void
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
  resetGrid: () => {
    set({ grid: initialGrid })
  },
  setGridRows: (rows: number) => {
    set({ gridRows: rows })
  },
  setGridColumns: (columns: number) => {
    set({ gridColumns: columns })
  },
  blockNode: ({ i, j }: Coord) => {
    const grid = get().grid
    const tempGrid = [...grid]
    tempGrid[i][j].blocked = !grid[i][j].blocked
    set({ grid: tempGrid })
  }
}))
