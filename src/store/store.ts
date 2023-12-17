import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { getCleanGrid } from '../utils'

import { type Coord, type Node } from '../types'

interface StoreAttributes {
  grid: Node[][]
  currNode: Node | null
  startCoord: Coord
  endCoord: Coord
  isMousePressed: boolean
  isRunning: boolean
}

interface StoreMethods {
  setCurrNode: (node: Node) => void
  setGrid: (grid: Node[][], gridRows: number, gridCols: number) => void
  blockNode: ({ i, j }: Coord) => void
  visitNode: ({ i, j, currNode }: Coord & { currNode: Node }) => void
  drawShortestPath: () => void
  resetGrid: () => void
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
  resetGrid: () => {
    set(state => {
      const { gridRows, gridColumns, startCoord, endCoord, grid } = state
      const cleanGrid = getCleanGrid(gridRows, gridColumns)
      grid.forEach((row, i) => {
        row.forEach(({ blocked }, j) => {
          if (blocked) {
            cleanGrid[i][j].blocked = true
          }
        })
      })
      cleanGrid[startCoord.i][startCoord.j].distance = 0
      cleanGrid[startCoord.i][startCoord.j].visited = true
      cleanGrid[startCoord.i][startCoord.j].blocked = false
      cleanGrid[endCoord.i][endCoord.j].blocked = false
      state.grid = cleanGrid
      state.currNode = null
      state.isRunning = false
    })
  },
  setGrid: (grid, gridRows, gridCols) => {
    set(state => {
      const { startCoord } = state
      const newEndCord = { i: gridRows - 1, j: gridCols - 1 }
      state.grid = grid
      state.grid[startCoord.i][startCoord.j].distance = 0
      state.grid[startCoord.i][startCoord.j].visited = true
      state.grid[startCoord.i][startCoord.j].blocked = false
      state.grid[newEndCord.i][newEndCord.j].blocked = false
      state.endCoord = newEndCord
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
