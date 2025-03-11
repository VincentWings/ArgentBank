import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL_PROFILE } from '../../config'

/**
 * Async thunk to fetch user profile data from API
 * Uses POST instead of GET due to API requirements
 *
 * @returns {Promise<Object>} Resolves with user data or rejects with an error
 */
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const response = await axios.post(URL_PROFILE, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.body
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching user data")
    }
  }
)

/**
 * Async thunk to update user profile data
 *
 * @param {Object} userData - User data to update
 * @returns {Promise<Object>} Resolves with updated user data or rejects with an error
 */
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const response = await axios.put(URL_PROFILE, userData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.body
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating user data")
    }
  }
)

/**
 * Initial Redux state for user profile management
 */
const initialState = {
  isLoading: false,
  isLoaded: false, // Indicates if data has been loaded at least once
  firstName: 'Loading...', // Temporary value to prevent undefined
  lastName: '...', // Temporary value to prevent undefined
  error: null
}

/**
 * Redux slice for user profile management
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Resets user profile state when logging out
     * @param {Object} state - Current state
     */
    profileOut: (state) => {
      state.firstName = ''
      state.lastName = ''
      state.isLoaded = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.isLoaded = false // Prevents showing outdated data
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName || 'Unknown'
        state.lastName = action.payload.lastName || 'User'
        state.isLoading = false
        state.isLoaded = true // Data successfully loaded
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isLoaded = false
        state.error = action.payload
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.isLoading = false
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { profileOut } = userSlice.actions
export default userSlice.reducer