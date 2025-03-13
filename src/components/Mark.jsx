/**
 * src/components/Mark.jsx
 * 
 * The Mark component shows a coloured sector to indicate the mark
 * for the current word pair. When a new word pair is adopted, the
 * Mark component is (re-)rendered to show the current mark. The
 * user then makes a choice and the mark for the word pair is
 * updated, but the component is not re-rendered.
 * 
 * Instead, the internal setMarkAttributes() function is called
 * from outside, from the Activity parent component. This function
 * updates the attributes "d" and "fill" of the svg path element
 * immediately, with no need for a re-render.
 */


import React, { useRef } from 'react'
const SIXTH = Math.PI / 3


let setMarkAttributes // so that it can be exported separately so
//                       Activity can call it directly


const Mark = ({ mark }) => {
  const pathRef = useRef()


  // Declared with `let` above
  setMarkAttributes = (mark) => {
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

    const path = pathRef.current

    if (path) {
      path.setAttribute("d", d)
      path.setAttribute("fill", fill)
    }

    return  { d, fill }
  }


  const { fill, d } = setMarkAttributes(mark)


  return (
    <svg
      id="mark"
      viewBox="-1 -1 2 2"
    >
      <path
        ref={pathRef}
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
}


export {
  Mark,
  setMarkAttributes
}