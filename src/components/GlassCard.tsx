'use client'

import { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  glow?: 'purple' | 'blue' | 'pink' | 'orange' | 'none'
  hoverGlow?: boolean
  clipDiagonal?: boolean
}

export default function GlassCard({
  children,
  className = '',
  style,
  glow = 'none',
  hoverGlow = true,
  clipDiagonal = false,
}: GlassCardProps) {
  const accentBorder = {
    purple: 'hover:border-accent-purple/30',
    blue: 'hover:border-accent-blue/30',
    pink: 'hover:border-accent-pink/30',
    orange: 'hover:border-accent-orange/30',
    none: '',
  }

  return (
    <div
      style={style}
      className={`
        card p-6
        transition-all duration-200
        ${hoverGlow ? accentBorder[glow] : ''}
        ${clipDiagonal ? 'clip-diagonal' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
