import { linearCongruentialGenerator } from '../lib/linear-congruential-generator'
import { type Node } from '../types'

interface Props {
  initialGrid: Node[][]
  seed: string
}
export const generateRandomGrid = ({ initialGrid, seed }: Props) => {
  const log = linearCongruentialGenerator(seed)
  return initialGrid.map(row => row.map(cell => ({
    ...cell,
    blocked: log.next() % 10 < 4
  })))
}
