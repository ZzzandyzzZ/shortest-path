import { create } from 'zustand'

import { type Coord, type Node } from './types'

interface Store {
  gridRows: number
  gridColumns: number
  grid: Node[][]
  startCoord: Coord
  endCoord: Coord
}

const startCoord = { i: 0, j: 0 }
const endCoord = { i: 0, j: 0 }
const gridRows = 20
const gridColumns = 40
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

export const useStore = create<Store>((set) => ({
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
  }
}))
