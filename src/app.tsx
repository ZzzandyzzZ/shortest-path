import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Grid, Navbar } from '@/components'
import { DEFAULT_GRID_COLS, DEFAULT_GRID_ROWS } from '@/constants'
import { useStore } from '@/store'
import { getRandomBlockedGrid, getSubGrid, validateAndGetInt } from '@/utils'

function App() {
  const setGrid = useStore(state => state.setGrid)

  const [searchParams, setParams] = useSearchParams()
  const seed = searchParams.get('seed')
  const gridRows = validateAndGetInt(searchParams.get('grid_rows'), DEFAULT_GRID_ROWS)
  const gridCols = validateAndGetInt(searchParams.get('grid_cols'), DEFAULT_GRID_COLS)
  const baseGrid = useMemo(() => {
    return getRandomBlockedGrid({ seed })
  }, [seed])
  const initalGrid = getSubGrid({ baseGrid, gridCols, gridRows })

  useEffect(() => {
    setParams(prev => {
      prev.set('grid_rows', gridRows.toString())
      prev.set('grid_cols', gridCols.toString())
      return prev
    })
  }, [])

  useEffect(() => {
    setGrid(initalGrid)
  }, [gridRows, gridCols, seed])

  return (
    <>
      <main className='grid grid-cols-12 min-h-screen text-white cursor-default'>
        <Navbar />
        <section className='col-span-9 bg-lazuli-800 flex items-center justify-center'>
          <Grid />
        </section>
      </main>
    </>
  )
}

export default App
