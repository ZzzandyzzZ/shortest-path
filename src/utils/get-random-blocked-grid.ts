import { getCleanGrid } from '.'
import { MAX_NUMBER_COL, MAX_NUMBER_ROW } from '../constants'
import { linearCongruentialGenerator } from '../lib/linear-congruential-generator'

interface Props {
  seed: string | null
}

export const getRandomBlockedGrid = ({ seed }: Props) => {
  const initialGrid = getCleanGrid({ gridCols: MAX_NUMBER_COL, gridRows: MAX_NUMBER_ROW })
  if (seed == null) return initialGrid
  const log = linearCongruentialGenerator(seed)
  return initialGrid.map(row => row.map(cell => ({
    ...cell,
    blocked: log.next() % 10 < 4
  })))
}
