import { useEffect, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Grid } from './components'
import { getRandomString } from './lib'
import { startBfsAlgorithm, useStore } from './store'

function App() {
  const generateGrid = useStore(state => state.generateGrid)
  const setSeed = useStore(state => state.setSeed)
  const drawShortestPath = useStore(state => state.drawShortestPath)
  const resetGrid = useStore(state => state.resetGrid)

  const [searchParams, setParams] = useSearchParams()
  const [,startTransition] = useTransition()
  const seed = searchParams.get('seed')

  useEffect(() => {
    if (seed != null) {
      setSeed(seed)
      generateGrid(seed)
    }
  }, [])

  const handleReset = () => {
    generateGrid()
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
          <button onClick={handleReset} className='text-white bg-[#188AB0] hover:bg-[#17647e] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Generar aleatorio
          </button>
          <div className=''>
            <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de filas</label>
            <input id="steps-range" type="range" min="4" max="60" step="2" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div className=''>
            <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de columnas</label>
            <input id="steps-range" type="range" min="4" max="60" step="2" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
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
