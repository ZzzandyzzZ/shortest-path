import { useRef } from 'react'

import { useStore } from '@/store'
import { GridCell } from './grid-cell'

export const Grid = () => {
  const grid = useStore((state) => state.grid)
  const currNode = useStore(state => state.currNode)
  const isHoldingClickRef = useRef(false)
  return (
    <div className='overflow-auto border-2 cursor-add bg-white'>
      <table
        onMouseLeave={() => { isHoldingClickRef.current = false }}
        onMouseDown={() => { isHoldingClickRef.current = true }}
        onMouseUp={() => { isHoldingClickRef.current = false }}>
        <tbody >
          {grid.map((row, i) =>
            <tr key={i}>
              {row.map((_, j) => <GridCell key={i + j} i={i} j={j} node={grid[i][j]} isHoldingClickRef={isHoldingClickRef} isCurrNode={currNode?.coord.i === i && currNode?.coord.j === j}/>)}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
