import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: () => void
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button
      className='bg-contrast font-medium rounded-full text-sm px-5 py-2.5 text-center shadow-blue active:shadow-none active:translate-y-1'
      onClick={onClick}
    >
      {children}
    </button>)
}
