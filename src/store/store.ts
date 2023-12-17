import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { getCleanGrid, getGridSize } from '../utils'

import { type Coord, type Grid, type Node } from '../types'

interface StoreAttributes {
  grid: Grid
  currNode: Node | null
  startCoord: Coord
  endCoord: Coord
  isMousePressed: boolean
  isRunning: boolean
}

interface StoreMethods {
  setCurrNode: (node: Node) => void
  setGrid: (grid: Grid) => void
  blockNode: ({ i, j }: Coord) => void
  visitNode: ({ i, j, currNode }: Coord & { currNode: Node }) => void
  drawShortestPath: () => void
  cleanGrid: (initalGrid: Grid) => void
  setIsMousePressed: (isMousePressed: boolean) => void
  setIsRunning: (isRunning: boolean) => void
}

type Store = StoreAttributes & StoreMethods

const defaultGridRows = 20
const defaultGridCols = 15
// const gridColumns = 66  // Max
// const gridRows = 42
const defaultStartCoord = { i: 0, j: 0 }
const defaultEndCoord = { i: defaultGridRows - 1, j: defaultGridCols - 1 }

export const useStore = create(immer<Store>((set, get) => ({
  grid: getCleanGrid({ gridCols: defaultGridCols, gridRows: defaultGridRows }),
  gridRows: defaultGridRows,
  gridColumns: defaultGridCols,
  startCoord: defaultStartCoord,
  endCoord: defaultEndCoord,
  currNode: null,
  isMousePressed: false,
  isRunning: false,
  setCurrNode: (node: Node) => {
    set({ currNode: node })
  },
  cleanGrid: (initalGrid: Grid) => {
    const { grid } = get()
    const cleanGrid = initalGrid
      .map((row, i) => row.map((cell, j) => ({ ...cell, blocked: grid[i][j].blocked })))
    set({ grid: cleanGrid, currNode: null, isRunning: false })
  },
  setGrid: (grid) => {
    set(state => {
      const { gridCols, gridRows } = getGridSize(grid)
      state.grid = grid
      state.endCoord = { i: gridRows - 1, j: gridCols - 1 }
      state.currNode = null
    })
  },
  visitNode: ({ i, j, currNode }: Coord & { currNode: Node }) => {
    set(state => {
      state.grid[i][j].visited = true
      state.grid[i][j].distance = currNode.distance + 1
      state.grid[i][j].prevCoord = currNode.coord
    })
  },
  blockNode: ({ i, j }: Coord) => {
    set(state => {
      state.grid[i][j].blocked = !state.grid[i][j].blocked
    })
  },
  drawShortestPath: () => {
    set(state => {
      const grid = get().grid
      let currNode = grid[state.endCoord.i][state.endCoord.j]
      while (currNode.prevCoord != null) {
        const { coord: { i, j }, prevCoord } = currNode
        state.grid[i][j].partOfSolution = true
        currNode = grid[prevCoord.i][prevCoord.j]
      }
    })
  },
  setIsMousePressed: (isMousePressed: boolean) => {
    set({ isMousePressed })
  },
  setIsRunning: (isRunning: boolean) => {
    set({ isRunning })
  }
})))
