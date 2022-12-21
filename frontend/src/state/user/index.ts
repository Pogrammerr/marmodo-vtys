import { createSlice } from '@reduxjs/toolkit'
import { User } from 'state/types'
import fetchUser from './fetchUser'

const initialState: User = {
  email: '',
  id: '',
  jwtToken: '',
  firstName: '',
  lastName: '',
  profileImgPath: '',
  posts: [],
  classes: [],
  classAmount: "0",
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
export const fetchUserData = (id: string, jwtToken: string) => async (dispatch: any) => {
  const userData = await fetchUser(id, jwtToken)
  dispatch(setUserData(userData))
}
export const resetUserData = () => async (dispatch: any) => {
  dispatch(setUserData(initialState))
}

export default userSlice.reducer