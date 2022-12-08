import { createSlice } from '@reduxjs/toolkit'
import { User } from 'state/types'

const initialState: User = {
  email: '',
  id: 0,
  jwtToken: '',
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, user: action.payload }
    },
  }
})

export default userSlice.reducer