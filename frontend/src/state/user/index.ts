import { createSlice } from '@reduxjs/toolkit'
import { User } from 'state/types'
import fetchUser from './fetchUser'

const initialState: User = {
  email: '',
  id: 0,
  jwtToken: '',
  firstName: '',
  lastName: '',
  posts: [],
  classes: [],
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload }
    },
  }
})

// Actions
export const { setUserData } = userSlice.actions

// Thunks
export const fetchUserData = (email: string, jwtToken: string) => async (dispatch: any) => {
  const userData = await fetchUser(email, jwtToken)
  dispatch(setUserData(userData))
}

export default userSlice.reducer