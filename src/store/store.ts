import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { getRandomString } from '../lib'
import { blockRandomCells, generateCleanGrid } from '../utils'

import { type Coord, type Node } from '../types'

interface StoreAttributes {
  gridRows: number
  gridColumns: number
  grid: Node[][]
  currNode: Node | null
  startCoord: Coord
  endCoord: Coord
  seed: string | null
  isMousePressed: boolean
  isRunning: boolean
}

interface StoreMethods {
  setCurrNode: (node: Node) => void
  generateGrid: (seed?: string) => void
  setGridRows: (rows: number) => void
  setGridColumns: (columns: number) => void
  blockNode: ({ i, j }: Coord) => void
  setSeed: (seed: string) => void
  visitNode: ({ i, j, currNode }: Coord & { currNode: Node }) => void
  drawShortestPath: () => void
  resetGrid: () => void
  setIsMousePressed: (isMousePressed: boolean) => void
  setIsRunning: (isRunning: boolean) => void
}

type Store = StoreAttributes & StoreMethods

const defaultGridRows = 20
const defaultGridColumns = 15
// const gridColumns = 66  // Max
// const gridRows = 42
const defaultStartCoord = { i: 0, j: 0 }
const defaultEndCoord = { i: defaultGridRows - 1, j: defaultGridColumns - 1 }

export const useStore = create(immer<Store>((set, get) => ({
  grid: generateCleanGrid(defaultGridRows, defaultGridColumns),
  gridRows: defaultGridRows,
  gridColumns: defaultGridColumns,
  startCoord: defaultStartCoord,
  endCoord: defaultEndCoord,
  currNode: null,
  seed: null,
  isMousePressed: false,
  isRunning: false,
  setCurrNode: (node: Node) => {
    set({ currNode: node })
  },
  resetGrid: () => {
    set(state => {
      const { gridRows, gridColumns, startCoord, endCoord, grid } = state
      const cleanGrid = generateCleanGrid(gridRows, gridColumns)
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
  generateGrid: (initalSeed) => {
    const seed = initalSeed ?? getRandomString()
    set(state => {
      const { gridRows, gridColumns, startCoord, endCoord } = state
      const cleanGrid = generateCleanGrid(gridRows, gridColumns)
      const randomGrid = blockRandomCells({ grid: cleanGrid, seed })
      randomGrid[startCoord.i][startCoord.j].distance = 0
      randomGrid[startCoord.i][startCoord.j].visited = true
      randomGrid[startCoord.i][startCoord.j].blocked = false
      randomGrid[endCoord.i][endCoord.j].blocked = false
      state.endCoord = { i: gridRows - 1, j: gridColumns - 1 }
      state.grid = randomGrid
      state.seed = seed
      state.currNode = null
    })
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
