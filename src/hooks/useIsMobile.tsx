//@ts-ignore
import React, { useState, useEffect } from 'react'

export function useIsMobile() {
  const [deviceType, setDeviceType] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setDeviceType(true)
      } else if (window.innerWidth <= 1024) {
        setDeviceType(false)
      } else {
        setDeviceType(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return deviceType
}
