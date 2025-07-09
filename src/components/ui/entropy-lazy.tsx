'use client'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

// Lazy load the heavy Entropy component
const EntropyComponent = lazy(() => import('./entropy').then(module => ({ default: module.Entropy })))

interface EntropyLazyProps {
  className?: string
  size?: number
  particleColor?: string
  style?: React.CSSProperties
}

export function EntropyLazy({ className = "", size = 400, particleColor = '#D97757', style }: EntropyLazyProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Delay rendering to avoid blocking main thread
          setTimeout(() => setShouldRender(true), 100)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`} 
      style={{ width: size, height: size, ...style }}
    >
      {isVisible && (
        <Suspense 
          fallback={
            <div 
              className="animate-pulse bg-gray-200 rounded-lg flex items-center justify-center"
              style={{ width: size, height: size }}
            >
              <div className="text-gray-400 text-sm">Loading visualization...</div>
            </div>
          }
        >
          {shouldRender && (
            <EntropyComponent 
              className={className}
              size={size}
              particleColor={particleColor}
              style={style}
            />
          )}
        </Suspense>
      )}
    </div>
  )
}