import React, { createContext, useContext, useRef } from 'react'

interface GridContextI {
  /* All boolean refs follow the convention of using "en" for enable and "dis" for disable. */
  isBlockingCellRef: React.MutableRefObject<boolean>
  enBlockingCell: () => void
  disBlockingCell: () => void
}

const GridContext = createContext<GridContextI | null>(null)

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const isBlockingCellRef = useRef(false)

  const enBlockingCell = () => {
    isBlockingCellRef.current = true
  }
  const disBlockingCell = () => {
    isBlockingCellRef.current = false
  }

  return <GridContext.Provider value={{ isBlockingCellRef, enBlockingCell, disBlockingCell }}>
    {children}
  </GridContext.Provider>
}

export const useGrid = () => {
  const context = useContext(GridContext)
  if (context == null) throw Error('useGrid must be used within a GlobalProvider')
  return context
}
