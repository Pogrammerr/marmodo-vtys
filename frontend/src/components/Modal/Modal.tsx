import { Text } from 'components/Text'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  max-height: 60%;
  background: ${p => p.theme.colors.modalBackgroundColor};
  border: 4px solid ${p => p.theme.colors.secondary};
  border-radius: 12px;
  z-index: 100;
  overflow-y: scroll;
  padding: 2.4rem;

  ${p => p.theme.mediaQueries.m} {
    max-width: 90%;
  }

  &::-webkit-scrollbar {
    background-color: #fff0;
    border-radius: 16px;
    width: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${p => p.theme.gradients.primaryGradient};
    border-radius: 16px;
    background-clip: content-box;
    border: 4px solid transparent;
  }
`

const ModalHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  & > div:nth-of-type(2) {
    cursor: pointer;
  }
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem;
  gap: 8px;
`

interface ModalProps extends PropsWithChildren {
  title: string;
  onDismiss?: () => void
}

const Modal: React.FC<ModalProps> = ({ title, onDismiss, children }) => {
  return (
    <StyledModal>
      <ModalHeader>
        <Text fontSize='l' color='secondary'>{title}</Text>
        <Text onClick={onDismiss}>X</Text>
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
    </StyledModal>
  )
}

export default Modal