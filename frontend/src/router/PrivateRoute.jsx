import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { logingSuccess, logingError } from '../features/auth/loginSlice'
import { fetchUserProfile } from '../features/auth/userSlice'
import { URL_PROFILE } from '../config'

/**
 * PrivateRoute - Protects routes and ensures user authentication
 *
 * @returns {JSX.Element} The protected route or redirection
 */
function PrivateRoute() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(state => state.login)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const expiration = localStorage.getItem('tokenExpiration')

    // If no token found, redirect to login
    if (!token) {
      dispatch(logingError("No valid session found. Please log in."))
      setLoading(false)
      return
    }

    // Check if token is expired
    if (expiration && Date.now() > Number(expiration)) {
      console.log("Token expired, removing from storage")
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
      sessionStorage.removeItem('token')

      dispatch(logingError("Session expired. Please log in again."))
      setLoading(false)
      return
    }

    // Set token for axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // Verify token with API
    axios.post(URL_PROFILE, {})
      .then(() => {
        dispatch(logingSuccess())
        dispatch(fetchUserProfile()) // Load user profile data
      })
      .catch(() => {
        dispatch(logingError("Session expired. Please log in again."))
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
        sessionStorage.removeItem('token')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])

  // Show loading message while checking authentication
  if (loading) {
    return <p>Loading...</p>
  }

  // Render the protected route if authenticated, otherwise redirect to login
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute