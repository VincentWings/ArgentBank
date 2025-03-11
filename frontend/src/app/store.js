import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "../features/auth/loginSlice"
import userReducer from "../features/auth/userSlice"

/**
 * Redux Store Configuration
 *
 * - Manages global state using Redux Toolkit
 * - Includes reducers for authentication and user management
 */
export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer
  }
})