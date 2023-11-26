import { useStore } from '../store'

import { type Coord } from '../types'

interface Props {
  coord: Coord
}
export const GridCell = ({ coord: { i, j } }: Props) => {
  const grid = useStore(state => state.grid)
  const startCoord = useStore(state => state.startCoord)
  const endCoord = useStore(state => state.endCoord)
  const blockNode = useStore(state => state.blockNode)

  const getBgColor = () => {
    if (grid[i][j].blocked) return 'bg-black'
    if (i === startCoord.i && j === startCoord.j) return 'bg-green-600'
    if (i === endCoord.i && j === endCoord.j) return 'bg-red-600'
    if (grid[i][j].partOfSolution) return 'bg-blue-600'
    if (grid[i][j].visited) return 'bg-green-300'
    return 'bg-blue-100'
  }

  return <td key={`${i}-${j}`} onClick={() => { blockNode({ i, j }) }}
    className={`${getBgColor()}  border-blue-950 aspect-square h-[40px] w-[40px] text-xs`}>
    {/* {gridItems[i][j].distance} */}
    {/* {i}-{j} */}
  </td>
}
