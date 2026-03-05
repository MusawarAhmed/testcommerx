'use client'

import { useEffect } from 'react'
import Userback from '@userback/widget'

export const UserbackInit = () => {
  useEffect(() => {
    const initUserback = async () => {
      try {
        await Userback('A-U52g4DkH4UpFfd4KdHLvBhFVqtvnqWhiP4MN3H93K9lkeDsGCZ')
      } catch (error) {
        console.error('Userback initialization failed:', error)
      }
    }

    initUserback()
  }, [])

  return null
}
