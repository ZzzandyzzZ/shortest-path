import { useStore } from '../store'
import { GridCell } from './grid-cell'

export const Grid = () => {
  const grid = useStore((state) => state.grid)
  const currNode = useStore(state => state.currNode)
  const isMousePressed = useStore(state => state.isMousePressed)
  const setIsMousePressed = useStore((state) => state.setIsMousePressed)

  return (
    <table
      onMouseLeave={() => { setIsMousePressed(false) }}
      onMouseDown={() => { setIsMousePressed(true) }}
      onMouseUp={() => { setIsMousePressed(false) }}>
      <tbody >
        {grid.map((row, i) =>
          <tr key={i}>
            {row.map((_, j) => <GridCell key={i + j} i={i} j={j} node={grid[i][j]} isMousePressed={isMousePressed} isCurrNode={currNode?.coord.i === i && currNode?.coord.j === j}/>)}
          </tr>
        )}
      </tbody>
    </table>
  )
}
