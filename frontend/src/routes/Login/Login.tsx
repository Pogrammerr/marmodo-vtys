import axios from 'axios'
import { Button, Input, Layout, Link, Text } from 'components'
import { Card } from 'components/Card'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.elements.email.value)
    const data = { email: e.target.elements.email.value, password: e.target.elements.password.value }
    // const result = await axios.post('/api/user/login', data)
    // console.log(result)
    navigate('/home')
  }

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <Card size='md'>
        <Text fontSize='xxl' bold style={{ alignSelf: 'center' }}>Giriş</Text>
        <Form onSubmit={handleSubmit}>
          <Input name='email' id='email' type='email' placeholder='Email' label='Email' />
          <Input name='password' id='password' type='password' placeholder='Şifre' label='Şifre' />
          <Button variant='primary' type="submit">Giriş Yap</Button>
        </Form>
        <Text fontSize='s' style={{ alignSelf: 'flex-start' }}>Hesabınız mı yok? <Link to='/register' style={{ color: '#01C2FF' }}>Yeni bir hesap oluşturun!</Link> </Text>
        <Text fontSize='s' style={{ alignSelf: 'flex-start', marginTop: '-1rem' }}><Link to='/forgotPassword' style={{ color: '#01C2FF' }}>Şifremi unuttum</Link></Text>
      </Card>
    </Layout>
  )
}

export default Login