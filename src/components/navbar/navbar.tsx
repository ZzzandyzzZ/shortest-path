import { useEffect, useMemo, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button, InputRange } from '../../components'
import { DEFAULT_GRID_COLS, DEFAULT_GRID_ROWS, MAX_NUMBER_COL, MAX_NUMBER_ROW } from '../../constants'
import { getRandomString } from '../../lib'
import { startBfsAlgorithm, useStore } from '../../store'
import { getRandomBlockedGrid, getSubGrid, validateAndGetInt } from '../../utils'
import { Dropdown } from './dropdown'

export const Navbar = () => {
  const setGrid = useStore(state => state.setGrid)
  const drawShortestPath = useStore(state => state.drawShortestPath)
  const cleanGrid = useStore(state => state.cleanGrid)

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
      <Button onClick={() => { cleanGrid(initalGrid) }}>
            Limpiar
      </Button>
      <Button onClick={genRandomSeed}>
            Generar aleatorio
      </Button>
      <Dropdown />
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

    </nav>
  )
}
