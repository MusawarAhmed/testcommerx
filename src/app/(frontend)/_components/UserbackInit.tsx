'use client'

import { useEffect } from 'react'
import Userback from '@userback/widget'

export const UserbackInit = () => {
  useEffect(() => {
    const initUserback = async () => {
      // identify your logged-in users (optional)
      const options = {
        user_data: {
          id: '123456', // example data
          info: {
            name: 'someone', // example data
            email: 'someone@example.com', // example data
          },
        },
      }

      try {
        await Userback('A-U52g4DkH4UpFfd4KdHLvBhFVqtvnqWhiP4MN3H93K9lkeDsGCZ', options)
      } catch (error) {
        console.error('Userback initialization failed:', error)
      }
    }

    initUserback()
  }, [])

  return null
}
