import styled from 'styled-components'

const StyledDivider = styled.div<{ fullWidth?: boolean, vertical?: boolean }>`
  background: ${p => p.vertical ? p.theme.gradients.primaryGradient : p.theme.gradients.primaryGradientHorizontal};
  height: ${p => p.vertical ? p.fullWidth ? "100%" : "550px" : "6px"};
  width: ${p => p.vertical ? p.fullWidth ? '100%' : "6px" : p.fullWidth ? '100%' : '25.6rem'};
  margin: 2rem 0;
`

export default StyledDivider