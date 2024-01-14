import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: () => void
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button
      className='cursor-pointer bg-lazuli-500 rounded-full font-semibold px-5 py-2.5 text-center shadow-lazuli500 active:shadow-none active:translate-y-1 w-full peer'
      onClick={onClick}
    >
      {children}
    </button>)
}
