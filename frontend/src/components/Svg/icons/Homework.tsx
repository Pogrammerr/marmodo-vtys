import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 48 48" {...props} fill="#3681AA" cursor="pointer">
      <path d="M4 6V42H30V6H4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 42V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M44 6H36V38L40 42L44 38V6Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M36 12H44" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M30 6H4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M30 42H4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M36 6V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M44 6V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}

export default Icon