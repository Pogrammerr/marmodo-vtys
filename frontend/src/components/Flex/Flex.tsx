import styled from 'styled-components'
import { flexbox, space, maxWidth, width } from 'styled-system'
import { FlexProps } from './types'

const getGap = ({ gap }: FlexProps) => {
  return gap || 0
}

const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${getGap}rem;
  ${flexbox}
  ${space}
  ${width}
  ${maxWidth}
`

export default Flex
