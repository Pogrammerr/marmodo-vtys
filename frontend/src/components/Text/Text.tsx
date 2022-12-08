import { fontSizes } from 'components/Theme/config'
import styled from 'styled-components'
import { space } from 'styled-system'
import { TextProps } from './types'

const getFontSize = ({ fontSize = "m" }: TextProps) => {
  return fontSizes[fontSize] || fontSize
}

const Text = styled.div<TextProps>`
  color: ${p => p.color ? p.theme.colors[p.color] : p.theme.colors.text};
  font-size: ${getFontSize}rem;
  font-weight: ${p => p.bold ? 'bold' : '400'};
  white-space: pre-wrap;
  display: flex;
  align-items: center;

  & > i, & > b {
    color: ${p => p.theme.colors.secondary};
  }
  ${space}
`

export default Text