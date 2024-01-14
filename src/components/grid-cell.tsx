import { memo } from 'react'

import LocationIcon from '../assets/icons/location.svg'
import UserIcon from '../assets/icons/user.svg'
import { useStore } from '../store'

import { useGrid } from '@/context'
import type { Node } from '../types'

interface Props {
  i: number
  j: number
  isCurrNode: boolean
  isHoldingClickRef: React.MutableRefObject<boolean> // Use ref to avoids render all grid cells
  node: Node
}

export const GridCell = memo(({ i, j, isCurrNode, isHoldingClickRef, node: { partOfSolution, visited, blocked } }: Props) => {
  const { isBlockingCellRef } = useGrid()
  const startCoord = useStore(state => state.startCoord)
  const endCoord = useStore(state => state.endCoord)
  const lockNode = useStore(state => state.lockNode)
  const unlockNode = useStore(state => state.unlockNode)
  const getBgColor = () => {
    if (blocked) return 'bg-lazuli-900'
    if (i === startCoord.i && j === startCoord.j) return 'bg-lazuli-300'
    if (i === endCoord.i && j === endCoord.j) return 'bg-lazuli-300'
    if (isCurrNode) return 'bg-orange-400'
    if (partOfSolution) return 'bg-lazuli-300'
    if (visited) return 'bg-lazuli-100'
    return 'bg-white'
  }
  const handleblocking = () => {
    if (isBlockingCellRef.current) {
      lockNode({ i, j })
    } else {
      unlockNode({ i, j })
    }
  }
  const handleMouseEnter = () => {
    // Just render the current grid with the ref
    if (!isHoldingClickRef.current) return
    handleblocking()
  }

  return <td key={`${i}-${j}`} onClick={handleblocking} onMouseEnter={handleMouseEnter}
    className={`${getBgColor()}  border-blue-950 aspect-square h-[20px] min-w-[20px] text-xs`}>
    {(i === startCoord.i && j === startCoord.j) && <img src={UserIcon}/>}
    {(i === endCoord.i && j === endCoord.j) && <img src={LocationIcon}/>}
    {/* {gridItems[i][j].distance} */}
    {/* {i}-{j} */}
  </td>
})
