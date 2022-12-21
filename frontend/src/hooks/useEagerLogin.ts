import jwtDecode from 'jwt-decode'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from 'state/user'

const calculateRemainingTime = (expirationTime) => {
  const currentTime = Date.now()
  const endTime = new Date(expirationTime).getTime()
  const remainingTime = endTime - currentTime
  console.log('remaining time until token expiration: ', remainingTime)

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

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    navigate('/')
  }, [])

  useEffect(() => {
    let timer;
    if (tokenData?.token) {
      if (tokenData?.remainingTime > 0) {
        const decodedToken = jwtDecode<{ email: string, id: string }>(tokenData?.token)
        console.log(navigate)
        dispatch(fetchUserData(decodedToken.id, tokenData?.token))
        setTimeout(() => navigate('/home'), 1000)
        timer = setTimeout(logout, tokenData?.remainingTime)
      } else {
        console.log('token expired, logging out.')
        logout()
        clearTimeout(timer)
      }
    }
  }, [])
}

export default useEagerLogin