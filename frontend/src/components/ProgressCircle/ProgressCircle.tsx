import { Text } from 'components/Text';
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledCircle = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background: ${p => p.theme.colors.bodyBackgroundColor};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.secondary};
  font-size: ${p => p.theme.fontSizes.l}rem;
  font-weight: bold;
  margin-bottom: 1.6rem;

  &::before {
    border-radius: 100%;
    content: '';
    background-image: ${p => p.theme.gradients.primaryGradient};
    position: absolute;
    top: -8px;
    bottom: -8px;
    right: -8px;
    left: -8px;
    z-index: -1;
  }
`

interface CircleProps {
  number: number;
  textTop: string;
  textBottom: string;
}

const ProgressCircle: React.FC<CircleProps> = ({ number, textTop, textBottom }) => {
  return (
    <Container>
      <StyledCircle>
        {number}+
      </StyledCircle>
      <Text>{textTop}</Text>
      <Text color='secondary'>{textBottom}</Text>
    </Container>
  )
}

export default ProgressCircle