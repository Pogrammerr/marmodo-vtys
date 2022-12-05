import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props} fill="#3681AA" cursor="pointer">
      <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill="#aa3636" stroke="none">
        <path d="M115 311 c-7 -13 -8 -12 45 -13 22 -1 41 3 43 8 3 13 -80 17 -88 5z" />
        <path d="M40 250 c0 -19 7 -20 120 -20 113 0 120 1 120 20 0 19 -7 20 -120 20
-113 0 -120 -1 -120 -20z"/>
        <path d="M67 214 c-7 -7 -1 -113 9 -182 l5 -32 79 0 79 0 5 33 c3 17 7 66 8
107 l3 75 -90 3 c-50 1 -94 0 -98 -4z m47 -55 c9 -48 7 -144 -3 -133 -11 11
-21 164 -11 164 4 0 10 -14 14 -31z m56 -54 c0 -50 -4 -85 -10 -85 -6 0 -10
35 -10 85 0 50 4 85 10 85 6 0 10 -35 10 -85z m56 63 c-3 -13 -6 -51 -6 -85 0
-35 -4 -63 -10 -63 -11 0 -13 75 -4 133 4 20 11 37 16 37 6 0 8 -10 4 -22z"/>
      </g>
    </Svg>
  )
}

export default Icon