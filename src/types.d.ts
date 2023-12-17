export type Grid = Node[][]
export interface Node {
  visited: boolean
  blocked: boolean
  partOfSolution: boolean
  distance: number
  coord: Coord
  prevCoord?: Coord | null
}

export interface Coord {
  i: number
  j: number
}
