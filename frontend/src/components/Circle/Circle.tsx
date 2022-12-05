import { GlobalColors } from 'components/Theme/types'
import React from 'react'
import styled from 'styled-components'

const StyledCircle = styled.div<{ backgroundColor: keyof GlobalColors }>`
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  background-color: ${p => `${p.theme.colors[p.backgroundColor]}44`};
`

interface Props {
  backgroundColor: keyof GlobalColors
}

const Circle: React.FC<Props> = ({ backgroundColor }) => {
  return (
    <StyledCircle id="circle" backgroundColor={backgroundColor} />
  )
}

export default Circle