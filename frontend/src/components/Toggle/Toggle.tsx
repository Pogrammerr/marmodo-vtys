import React from 'react'
import styled from 'styled-components'

interface Props {
  isActive: boolean
  onToggle: () => void
}

const ToggleWrapper = styled.div`
  width: 5rem;
  height: 2.5rem;
  border-radius: 1.6rem;
  border: 1px solid #666;
  display: flex;
  background: ${p => p.theme.gradients.primaryGradient};
`

const Notch = styled.div<{ isActive: boolean }>`
  width: 2.1rem;
  height: 2.1rem;
  border: 1px solid #666;
  margin-top: 1px;
  background: white;
  border-radius: 50%;
  transition: all 100ms linear;
  transform: translate(${p => p.isActive ? '2.6rem' : '1px'});
`

const Toggle: React.FC<Props> = ({ isActive, onToggle }) => {
  return (
    <ToggleWrapper onClick={onToggle}>
      <Notch isActive={isActive} />
    </ToggleWrapper>
  )
}

export default Toggle