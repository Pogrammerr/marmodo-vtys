import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" id="email" placeholder='email' />
        <input name="password" id="password" placeholder='sifre' />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login