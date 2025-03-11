import { createSlice } from '@reduxjs/toolkit'

/**
 * Initial state for login slice
 */
const initialState = {
  isLoading: false, // Indicates if authentication is in progress
  isAuth: false, // Tracks if user is authenticated
  isRemember: false, // Stores user preference for remembering login
  error: '' // Stores authentication error messages
}

/**
 * Login slice - Manages authentication state
 */
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    /**
     * Sets loading state when authentication is in progress
     * @param {object} state - Current state
     */
    logingPending: (state) => {
      state.isLoading = true
    },
    
    /**
     * Updates state when authentication is successful
     * @param {object} state - Current state
     */
    logingSuccess: (state) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''
    },
    
    /**
     * Updates state when authentication fails
     * @param {object} state - Current state
     * @param {object} action - Action containing error message
     */
    logingError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    
    /**
     * Stores user preference for remembering login
     * @param {object} state - Current state
     * @param {object} action - Action containing boolean value
     */
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
    
    /**
     * Logs the user out and resets authentication state
     * @param {object} state - Current state
     */
    logingOut: (state) => {
      state.isAuth = false
    }
  }
})

const { actions, reducer } = loginSlice

// Export actions
export const {
  logingPending,
  logingSuccess,
  logingError,
  logingOut,
  logingRemember
} = actions

// Export reducer
export default reducer