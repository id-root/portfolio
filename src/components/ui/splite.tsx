'use client'

import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-caramel/30 border-t-accent-caramel rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Spline
      scene={scene}
      className={`w-full h-full ${className || ''}`}
    />
  )
}
