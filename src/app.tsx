import { useEffect, useMemo, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Grid, InputRange } from './components'
import { DEFAULT_GRID_COLS, DEFAULT_GRID_ROWS, MAX_NUMBER_COL, MAX_NUMBER_ROW } from './constants'
import { getRandomString } from './lib'
import { startBfsAlgorithm, useStore } from './store'
import { getRandomBlockedGrid, getSubGrid, validateAndGetInt } from './utils'

function App() {
  const setGrid = useStore(state => state.setGrid)
  const drawShortestPath = useStore(state => state.drawShortestPath)
  const resetGrid = useStore(state => state.resetGrid)

  const [searchParams, setParams] = useSearchParams()
  const [,startTransition] = useTransition()
  const seed = searchParams.get('seed')
  const gridRows = validateAndGetInt(searchParams.get('grid_rows'), DEFAULT_GRID_ROWS)
  const gridCols = validateAndGetInt(searchParams.get('grid_cols'), DEFAULT_GRID_COLS)
  const baseGrid = useMemo(() => {
    return getRandomBlockedGrid({ seed })
  }, [seed])

  useEffect(() => {
    setParams(prev => {
      prev.set('grid_rows', gridRows.toString())
      prev.set('grid_cols', gridCols.toString())
      return prev
    })
  }, [])

  useEffect(() => {
    const subGrid = getSubGrid({ baseGrid, gridCols, gridRows })
    setGrid(subGrid)
  }, [gridRows, gridCols, seed])

  const genRandomSeed = () => {
    const newSeed = getRandomString()
    setParams(prev => {
      prev.set('seed', newSeed)
      return prev
    })
  }

  const startAlgorithm = async () => {
    await startBfsAlgorithm()
    drawShortestPath()
  }

  const handleStart = () => {
    resetGrid()
    startTransition(() => {
      void startAlgorithm()
    })
  }

  return (
    <>
      <main className='grid grid-cols-12  min-h-screen'>
        <section className='flex flex-col bg-[#DCEEC6] col-span-3 p-3 gap-3'>
          <h1 className="text-2xl text-center font-bold py-5">Shortest Path algorithms</h1>
          <button onClick={handleStart} className='text-white bg-[#188AB0] hover:bg-[#17647e] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Iniciar
          </button>
          <button onClick={resetGrid} className='text-white bg-[#188AB0] hover:bg-[#17647e] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Reiniciar
          </button>
          <button onClick={genRandomSeed} className='text-white bg-[#188AB0] hover:bg-[#17647e] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Generar aleatorio
          </button>
          <InputRange
            handleChange={(e) => {
              setParams(prev => {
                prev.set('grid_rows', e.target.value)
                return prev
              })
            }}
            textLabel='Número de filas'
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
            textLabel='Número de columnas'
            initalValue={gridCols}
            maxValue={MAX_NUMBER_COL}
          />
          <div className="">
            <label htmlFor='algorithm' className="">
              Selecciona Algoritmo
            </label>
            <select id="algorithm" className="">
              <option value="brazil">BFS</option>
              <option value="bucharest">A *</option>
              <option value="washington">Disjktra</option>
            </select>
          </div>
        </section>
        <section className='col-span-9 bg-white flex items-center justify-center'>
          <Grid />
        </section>
      </main>
    </>
  )
}

export default App
