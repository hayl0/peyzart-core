'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallback?: string
  className?: string
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  alt,
  fallback = 'linear-gradient(135deg, #4CAF50, #2E7D32)',
  className,
  width,
  height,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div
        className={cn('w-full h-full', className)}
        style={{ background: fallback }}
        aria-label={alt}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      className={cn('object-cover', className)}
    />
  )
}
