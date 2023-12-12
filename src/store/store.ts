import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
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
  isMousePressed: boolean
  isRunning: boolean
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

const gridRows = 20
const gridColumns = 15
// const gridColumns = 66  // Max
// const gridRows = 42
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

export const useStore = create(immer<Store>((set, get) => ({
  grid: initialGrid,
  gridRows,
  gridColumns,
  startCoord,
  endCoord,
  currNode: null,
  seed: null,
  isMousePressed: false,
  isRunning: false,
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
    set({ grid: tempGrid, currNode: null, isRunning: false })
  },
  generateGrid: (initalSeed) => {
    const seed = initalSeed ?? getRandomString()
    const startCoord = get().startCoord
    const endCoord = get().endCoord
    set(state => {
      state.grid = generateRandomGrid({ initialGrid, seed })
      state.grid[startCoord.i][startCoord.j].distance = 0
      state.grid[startCoord.i][startCoord.j].visited = true
      state.grid[startCoord.i][startCoord.j].blocked = false
      state.grid[endCoord.i][endCoord.j].blocked = false
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
