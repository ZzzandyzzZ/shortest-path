import { useEffect, useMemo, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button, InputRange } from '@/components'
import { DEFAULT_GRID_COLS, DEFAULT_GRID_ROWS, MAX_NUMBER_COL, MAX_NUMBER_ROW } from '@/constants'
import { useGrid } from '@/context'
import { getRandomString } from '@/lib'
import { startBfsAlgorithm, useStore } from '@/store'
import { getRandomBlockedGrid, getSubGrid, validateAndGetInt } from '@/utils'
import { Dropdown } from './dropdown'

export const Navbar = () => {
  const setGrid = useStore(state => state.setGrid)
  const drawShortestPath = useStore(state => state.drawShortestPath)
  const cleanGrid = useStore(state => state.cleanGrid)

  const { enBlockingCell, disBlockingCell } = useGrid()
  const [searchParams, setParams] = useSearchParams()
  const [,startTransition] = useTransition()
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

  const genRandomSeed = () => {
    setParams(prev => {
      prev.set('seed', getRandomString())
      return prev
    })
  }

  const startAlgorithm = async () => {
    await startBfsAlgorithm()
    drawShortestPath()
  }

  const handleStart = () => {
    cleanGrid(initalGrid)
    startTransition(() => {
      void startAlgorithm()
    })
  }
  return (
    <nav className='flex flex-col bg-lazuli-900 col-span-3 p-3 gap-3 text-sm'>
      <h1 className="text-3xl text-center py-5 font-black">Shortest Path Algorithms</h1>
      <Button onClick={handleStart}>
        Iniciar
      </Button>
      <Dropdown />
      <Button onClick={() => { cleanGrid(initalGrid) }}>
        Limpiar
      </Button>
      <Button onClick={genRandomSeed}>
        Generar aleatorio
      </Button>
      <Button onClick={enBlockingCell}>
        Bloquear celdas
      </Button>
      <Button onClick={disBlockingCell}>
        Desloquear celdas
      </Button>
      <InputRange
        handleChange={(e) => {
          setParams(prev => {
            prev.set('grid_rows', e.target.value)
            return prev
          })
        }}
        textLabel='Filas'
        initalValue={gridRows}
        maxValue={MAX_NUMBER_ROW}
      />
      <InputRange
        handleChange={(e) => {
          setParams(prev => {
            prev.set('grid_cols', e.target.value)
            return prev
          })
        }}
        textLabel='Columnas'
        initalValue={gridCols}
        maxValue={MAX_NUMBER_COL}
      />
      {/* <div className='flex '>
        <button className='w-40' title='Bloquear todo'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
          </svg>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zM17.625 16.125H13.5a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 0-1.5h-2.625zM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6zM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
        </svg>
      </div> */}

    </nav>
  )
}
