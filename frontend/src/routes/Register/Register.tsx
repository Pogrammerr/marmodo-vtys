import axios from 'axios'
import { Button, Input, Layout, Link, Text } from 'components'
import { Card } from 'components/Card'
import React, { useState } from 'react'
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

const Register = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const data = { email: e.target.elements.email.value, password: e.target.elements.password.value, name: e.target.elements.name.value, surname: e.target.elements.surname.value }
    if (e.target.elements.confirmPassword.value !== e.target.elements.password.value) {
      return setError('Şifreler eşleşmiyor.')
    }
    try {
      const result = await axios.post('/api/user/createUser', data)
      console.log(result.data)
      navigate('/')
    } catch (e: any) {
      if (e.response.data.message === 'Validation failed!')
        setError('Şifreniz en az 8 karakter olmalıdır.')
    }
  }

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <Card size='md'>
        <Text fontSize='xxl' bold style={{ alignSelf: 'center' }}>Kayıt</Text>
        <Form onSubmit={handleSubmit}>
          <Input name='name' id='name' type='text' placeholder='İsim' label='İsim' />
          <Input name='surname' id='surname' type='text' placeholder='Soyisim' label='Surname' />
          <Input name='email' id='email' type='email' placeholder='Email' label='Email' />
          <Input name='password' id='password' type='password' placeholder='Şifre' label='Şifre' />
          <Input name='confirmPassword' id='confirmPassword' type='password' placeholder='Şifre Tekrar' label='Şifre Tekrar' />
          <Button variant='primary' type="submit">Kayıt ol</Button>
          {error && <Text color='fail'>{error}</Text>}
        </Form>
        <Text fontSize='s'><Link to='/' style={{ color: '#01C2FF' }}>Giris Yapın</Link> </Text>
      </Card>
    </Layout>
  )
}

export default Register