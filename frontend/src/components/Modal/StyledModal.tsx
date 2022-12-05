import styled from "styled-components";

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  max-width: 70%;
  min-height: 300px;
  background: ${p => p.theme.colors.bodyBackgroundColor};
  border-image: ${p => p.theme.gradients.primaryGradient} 1;
  border-style: solid;
  border-radius: 8px;
  gap: 2.4rem;
  padding: 24px;
  z-index: 100;
`

export default StyledModal