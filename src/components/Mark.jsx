/**
 * src/components/Mark.jsx
 */


import React, { forwardRef } from 'react'
const SIXTH = Math.PI / 3


export const getMarkAttributes = (mark) => {
  console.log("mark:", mark)
  // Convert error mark range 31 - 0 to arc-length range 0 - 5
  mark = 5 - (Math.log(Number(mark) + 1) / Math.log(2))

  const fill = (() => {
    const hue = Math.max(0, (mark - 1) * 30)
    // lightness will vary from 50 to 40 when mark between
    // 0 and 1, then 40 for all higher values 
    const lightness = Math.max(40, (50 - 10 * mark)) + "%"
    const saturation = "50%"
    return `hsl(${hue}, ${saturation}, ${lightness})`
  })()

  const d = (() => {
    const a = SIXTH * (1 + mark)
    const x = Math.sin(a)
    const y = -Math.cos(a)
    const b = (mark >= 2) + 0 // when a >= Math.PI

    return `
    M 0 0
    L 0 -1
    A 1 1 0 ${b} 1 ${x} ${y}
    z
    `
  })()

  return { d, fill }
}


export const Mark = forwardRef((props, ref) => {
  const { mark } = props
  const { fill, d } = getMarkAttributes(mark)

  return (
    <svg
      id="mark"
      viewBox="-1 -1 2 2"
    >
      <path
        ref={ref}
        fill={fill}
        d={d}
      />
      <circle
        stroke="#fff"
        strokeWidth="0.05"
        fill="none"
        cx="0"
        cy="0"
        r="0.975"
      />
    </svg>
  )
})