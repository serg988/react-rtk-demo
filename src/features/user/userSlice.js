import reducer from '../icecream/icecreamSlice'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    users: [],
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  },
})

// Generate pending, fulfilled and rejected actions types
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users')
  const users = res.data.map((user) => user.name)
  console.log('🚀 ~ file: userSlice.js ~ line 33 ~ fetchUsers ~ users', users)

  return users
})

export default userSlice.reducer

