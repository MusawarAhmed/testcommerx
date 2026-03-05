import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={cn('w-full px-4 mb-4', className)}
      style={{ width: width ? `${width}%` : '100%' }}
    >
      {children}
    </div>
  )
}
