import { useState } from 'react'

const rows = 20
const columns = 30
const initialGridItems: boolean[][] = Array(rows).fill(null).map(() => Array(columns).fill(false))
export const Grid = () => {
  const [gridItems, setGridItems] = useState(initialGridItems)
  const handleCellClick = (i: number, j: number) => {
    const tempgrid = [...gridItems]
    tempgrid[i][j] = !gridItems[i][j]
    setGridItems(tempgrid)
  }

  return <table className='border-black'>
    <tbody>
    {
      gridItems.map((row, i) => {
        return <tr key={i}>
          {
          row.map((_, j) => {
            return <td key={`${i}-${j}`} onClick={() => { handleCellClick(i, j) }}
            className={`${(gridItems[i][j]) ? 'bg-black' : 'bg-blue-200'} border-black border-2 aspect-square w-[30px] inline-block`}></td>
          })
        }
        </tr>
      })
    }
    </tbody>
  </table>
}
