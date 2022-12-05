import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props} fill="#3681AA" cursor="pointer">
      <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill="#3681AA" stroke="none">
        <path d="M95 311 c-8 -15 29 -23 92 -19 32 1 64 -1 71 -5 8 -6 12 -40 12 -113
0 -63 4 -104 10 -104 15 0 13 223 -2 238 -14 14 -174 17 -183 3z"/>
        <path d="M39 253 c-19 -23 -19 -213 0 -236 10 -13 31 -17 95 -17 50 0 87 5 94
12 8 8 12 50 12 125 0 133 0 133 -113 133 -57 0 -78 -4 -88 -17z m179 -112 c2
-55 -1 -98 -7 -104 -11 -11 -133 -13 -150 -2 -12 7 -15 187 -4 199 4 4 41 5
83 4 l75 -3 3 -94z"/>
      </g>
    </Svg>
  )
}

export default Icon