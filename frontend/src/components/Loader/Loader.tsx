import React from 'react'
import styled from 'styled-components'
import { TailSpin } from 'react-loader-spinner'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loader: React.FC = () => {
  return (
    <Container>
      <TailSpin
        height="100"
        width="100"
        color="#2F9BFF"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Container>
  )
}

export default Loader