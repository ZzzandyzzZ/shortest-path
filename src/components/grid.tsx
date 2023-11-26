import { useStore } from '../store'
import { GridCell } from './grid-cell'

export const Grid = () => {
  const grid = useStore((state) => state.grid)
  return (
    <table>
      <tbody >
        {grid.map((row, i) =>
          <tr key={i}>
            {row.map((_, j) => <GridCell key={i + j} coord={{ i, j }} />)}
          </tr>
        )}
      </tbody>
    </table>
  )
}
