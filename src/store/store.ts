import { create } from 'zustand'

import { type Node } from '../types'

const initialGridRows = 20
const initialGridColumns = 40
const initalNode = {
  visited: false,
  partOfSolution: false,
  blocked: false,
  distance: Infinity
}
const initialGrid: Node[][] = Array(initialGridRows).fill(null).map(
  (_, i) => Array(initialGridColumns).fill(null).map(
    (_, j) => ({ ...initalNode, coord: { i, j } })
  )
)

export const useStore = create((set) => ({
  grid: initialGrid,
  gridRows: initialGridRows,
  gridColumns: initialGridColumns,
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
