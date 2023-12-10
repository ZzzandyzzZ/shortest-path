import { useStore } from '../store'
import { GridCell } from './grid-cell'

export const Grid = () => {
  const grid = useStore((state) => state.grid)
  const setIsMousePressed = useStore((state) => state.setIsMousePressed)
  return (
    <table
      onMouseLeave={() => { setIsMousePressed(false) }}
      onMouseDown={() => { setIsMousePressed(true) }}
      onMouseUp={() => { setIsMousePressed(false) }}>
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
