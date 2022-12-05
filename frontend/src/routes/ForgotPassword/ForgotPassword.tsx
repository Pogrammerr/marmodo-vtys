import axios from 'axios'
import { Button, Input, Layout, Link, Text } from 'components'
import { Card } from 'components/Card'
import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & > button {
    margin-bottom: 1rem;
  }

  a {
    color: #01C2FF;
    font-family: 'Inter', sans-serif;
  }
`

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.elements.email.value)
    const data = { email: e.target.elements.email.value, password: e.target.elements.password.value }
    const result = await axios.post('/api/user/createUser', data)
    console.log(result)
  }

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <Card size='md'>
        <Text fontSize='xxl' bold style={{ alignSelf: 'center' }}>Şifremi Unuttum</Text>
        <Form onSubmit={handleSubmit}>
          <Input name='email' id='email' type='email' placeholder='Email' label='Email' />
          <Input name='password' id='password' type='password' placeholder='Şifre' label='Şifre' />
          <Button variant='primary' type="submit">Şifre Değiştir</Button>
        </Form>
        <Text fontSize='s'><Link to='/' style={{ color: '#01C2FF' }}>Giris Yapın</Link> </Text>
      </Card>
    </Layout>
  )
}

export default Login