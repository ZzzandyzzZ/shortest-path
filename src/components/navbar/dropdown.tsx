import { useState } from 'react'
import { Button } from '../ui'

const options = ['BFS', 'A*', 'Dijsktra']

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  const selectAlgorithm = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log(e.currentTarget.innerHTML)
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <Button onClick={() => { setIsOpen(!isOpen) }}>
        <div className='flex items-center justify-center'>
          Algoritmo
          <span className={`relative transition-all w-3 bg-white h-1 rounded-2xl left-1.5 ${isOpen ? '-rotate-45' : 'rotate-45'} `}></span>
          <span className={`relative transition-all w-3 bg-white h-1 rounded-2xl ${isOpen ? 'rotate-45' : '-rotate-45'}`}></span>
        </div>
      </Button>
      <ul className={`overflow-hidden absolute rounded-lg transition-all duration-200 origin-top left-0 right-0 mx-2 ${isOpen ? 'scale-100' : ' scale-0'}`}>
        {options.map(option =>
          <li key={option} onClick={selectAlgorithm} className={`px-4 py-2 bg-lazuli-400  hover:bg-lazuli-300 transition-all duration-500 hover:opacity-100 ${isOpen ? 'opacity-90' : 'opacity-0'}`}>
            {option}
          </li>
        )}
      </ul>
    </div>
  )
}
