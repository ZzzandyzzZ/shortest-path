import { linearCongruentialGenerator } from '../lib/linear-congruential-generator'
import { type Node } from '../types'

interface Props {
  grid: Node[][]
  seed: string
}
export const blockRandomCells = ({ grid, seed }: Props) => {
  const log = linearCongruentialGenerator(seed)
  return grid.map(row => row.map(cell => ({
    ...cell,
    blocked: log.next() % 10 < 4
  })))
}
