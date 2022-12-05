import { Text } from 'components/Text'
import { ModalContext } from 'components/context/modalContext'
import React, { useContext } from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  max-height: 60%;
  background: ${p => p.theme.colors.modalBackgroundColor};
  border: 4px solid ${p => p.theme.colors.secondary};
  z-index: 100;
  overflow-y: scroll;

  ${p => p.theme.mediaQueries.m} {
    max-width: 500px;
  }

  ${p => p.theme.mediaQueries.s} {
    max-width: 300px;
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

const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
  max-height: 50%;
`

const ModalContent = styled.div`
  padding: 2rem;
  text-align: start;

  & > div:nth-of-type(1) {
    align-self: center;
    text-align: center;
    margin: 1rem;
  }
`

const Modal = () => {
  const { title, details, imageUri } = useContext(ModalContext)
  return (
    <StyledModal>
      <ModalImage src={`img/${imageUri}.webp`} alt={imageUri} />
      <ModalContent>
        <Text variant='l' color='secondary'>{title}</Text>
        <Text variant='s'>{details}</Text>
      </ModalContent>
    </StyledModal>
  )
}

export default Modal