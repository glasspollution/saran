'use client'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

// Lazy load the BentoDemo component
const BentoDemoComponent = lazy(() => import('./bento-demo').then(module => ({ default: module.BentoDemo })))

export function BentoDemoLazy() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Load slightly before it comes into view
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
    <div ref={containerRef} className="w-full">
      {isVisible && (
        <Suspense 
          fallback={
            <div className="w-full py-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-48 bg-gray-200 animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <BentoDemoComponent />
        </Suspense>
      )}
    </div>
  )
}