import { memo } from 'react'
import { useStore } from '../store'

import type { Node } from '../types'

interface Props {
  i: number
  j: number
  isCurrNode: boolean
  isMousePressed: boolean
  node: Node
}

export const GridCell = memo(({ i, j, isCurrNode, isMousePressed, node: { partOfSolution, visited, blocked } }: Props) => {
  const startCoord = useStore(state => state.startCoord)
  const endCoord = useStore(state => state.endCoord)
  const blockNode = useStore(state => state.blockNode)
  const getBgColor = () => {
    if (blocked) return 'bg-lazuli-900'
    if (i === startCoord.i && j === startCoord.j) return 'bg-green-600'
    if (i === endCoord.i && j === endCoord.j) return 'bg-red-600'
    if (isCurrNode) return 'bg-orange-400'
    if (partOfSolution) return 'bg-lazuli-300'
    if (visited) return 'bg-lazuli-100'
    return 'bg-white'
  }

  const handleMouseEnter = () => {
    if (isMousePressed) { blockNode({ i, j }) }
  }

  return <td key={`${i}-${j}`} onClick={() => { blockNode({ i, j }) }} onMouseEnter={handleMouseEnter}
    className={`${getBgColor()}  border-blue-950 aspect-square h-[15px] min-w-[15px] text-xs`}>
    {/* {gridItems[i][j].distance} */}
    {/* {i}-{j} */}
  </td>
})
