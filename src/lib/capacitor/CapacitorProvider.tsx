'use client'

import { useEffect, type ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { StatusBar } from '@capacitor/status-bar'

export function CapacitorProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    StatusBar.setOverlaysWebView({ overlay: false })

    const handleBack = () => {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.close()
      }
    }

    document.addEventListener('backbutton', handleBack)
    return () => document.removeEventListener('backbutton', handleBack)
  }, [])

  return <>{children}</>
}
