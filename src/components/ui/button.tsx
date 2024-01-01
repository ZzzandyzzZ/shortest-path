import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: () => void
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button
      className='bg-lazuli-500 rounded-full font-semibold text-sm px-5 py-2.5 text-center shadow-lazuli500 active:shadow-none active:translate-y-1'
      onClick={onClick}
    >
      {children}
    </button>)
}
