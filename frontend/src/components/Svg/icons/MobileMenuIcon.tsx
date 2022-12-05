import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps & { isOpen: boolean }> = ({ isOpen, ...props }) => {
  return (
    <Svg viewBox="0 0 48 48" {...props} fill="#fff" rotate={isOpen ? '180deg' : '0'} style={{ transition: '300ms' }}>
      <path d="M40 36.9999H8.00001" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M40 23.9999H8.00001" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M40 10.9999L8.00001 10.9999" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M34.3432 18.3431L40 24L34.3432 29.6569" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}

export default Icon
