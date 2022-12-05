import { Modal } from "components/Modal";
import React, { createContext, useState } from "react";
import styled from "styled-components";

interface ModalProps {
  title?: string
  details?: string
  imageUri?: string
  customModal?: React.ReactElement | null
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Overlay = styled.div.attrs({ role: 'presentation' })`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #071330;
  transition: opacity 0.4s;
  opacity: 0.6;
  z-index: inherit;
`

export const initialCtx = {
  isShown: false,
  title: "",
  details: "",
  imageUri: "",
  customModal: null,
  handleShow: (p: ModalProps) => { },
  handleHide: () => { },
};

export const ModalContext = createContext(initialCtx);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const handleShow = (modalProps: ModalProps) => {
    //@ts-ignore
    setState({ ...state, ...modalProps, isShown: true })
  }

  const handleHide = () => {
    setState({ ...state, isShown: false })
  }

  const [state, setState] = useState({ ...initialCtx, handleShow, handleHide })

  return (
    <ModalContext.Provider value={state}>
      {state.isShown &&
        <Wrapper>
          <Overlay onClick={handleHide} />
          {state.customModal || <Modal />}
        </Wrapper>
      }
      {children}
    </ModalContext.Provider>
  )

}

export default ModalProvider;
