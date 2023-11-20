export interface Node {
  visited: boolean
  blocked: boolean
  partOfSolution: boolean
  distance: number
  coord: Coord
  prevCoord?: Coord
}

export interface Coord {
  i: number
  j: number
}
