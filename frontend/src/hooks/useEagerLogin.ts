import jwtDecode from 'jwt-decode'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from 'state/user'

const calculateRemainingTime = (expirationTime) => {
  const currentTime = Date.now()
  const endTime = new Date(expirationTime).getTime()
  const remainingTime = endTime - currentTime

  return remainingTime
}

const getStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('tokenExpiration')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    return null
  }

  return {
    token: storedToken,
    remainingTime,
  }
}

const useEagerLogin = () => {
  const tokenData = getStoredToken()
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const [timer, setTimer] = useState<any>(null)

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    clearTimeout(timer)
    navigate('/')
  }, [])

  if (tokenData?.token) {
    if (tokenData?.remainingTime > 0) {
      const decodedToken = jwtDecode<{ email: string, id: string }>(tokenData?.token)
      dispatch(fetchUserData(decodedToken.id, tokenData?.token))
      navigate('/home')
    } else {
      logout()
    }
  }

  useEffect(() => {
    if (tokenData)
      setTimer(setTimeout(logout, tokenData?.remainingTime))
  }, [tokenData, logout])
}

export default useEagerLogin