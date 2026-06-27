import React from 'react'
import { ScrollProgress } from './scroll-progress';

const Provider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  )
}

export default Provider;