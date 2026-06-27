import React from 'react'

const Provider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <>{children}</>
  )
}

export default Provider;