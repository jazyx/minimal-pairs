/**
 * src/components/Mark.jsx
 */


import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts'

const SIXTH = Math.PI / 3


export const Mark = ({ phonemes, wordPair }) => {
  const { mark: value } = useContext(UserContext)
  // console.log("value:", value ) //, value[phonemes]?[wordPair])

  const mark = 7
  const score = 5 - (Math.log(Number(mark) + 1) / Math.log(2))

  const hsl = (() => {
    const hue = Math.max(0, (score - 1) * 30)
    // lightness will vary from 50 to 40 when score between 0 and 1,
    // then 40 for all higher values 
    const lightness = Math.max(40, (50 - 10 * score)) + "%"
    const saturation = "50%"
    return `hsl(${hue}, ${saturation}, ${lightness})`
  })()
    
  const d = (() => {
    const a = SIXTH * (1 + score)
    const x = Math.sin(a)
    const y = -Math.cos(a)
    const b = (score >= 2) + 0 // when a >= Math.PI

    return `
    M 0 0
    L 0 -1
    A 1 1 0 ${b} 1 ${x} ${y}
    z
    `
  })()


  // useEffect(() => console.log("MARK:", value, wordPair), [value])

  return (
    <svg
      id="mark"
      viewBox="-1 -1 2 2"
    >
      <path
        fill={hsl}
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
}