import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../features/auth/userLogin'
import { logingPending, logingSuccess, logingError, logingRemember } from '../../features/auth/loginSlice'
import './LogIn.css'

/**
 * LogIn Component - Handles user authentication logic.
 *
 * @param {Object} props - Component props
 * @param {function} props.onSuccess - Callback function triggered after a successful login
 * @returns {JSX.Element} Login form UI
 */
function LogIn({ onSuccess }) {
  const { isLoading, error, isRemember } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [localError, setLocalError] = useState('') // Stores validation errors

  /**
   * Clears expired token from storage when the component mounts.
   */
  useEffect(() => {
    const expiration = localStorage.getItem('tokenExpiration')
    if (expiration && Date.now() > Number(expiration)) {
      console.log("Token expired, removing from storage")
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }, [])

  /**
   * Updates credentials state when user types in the input fields.
   *
   * @param {Object} e - Event object
   */
  function handleChange(e) {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    setLocalError('') // Clear validation error when user types
  }

  /**
   * Handles form submission and user authentication.
   *
   * @param {Object} e - Event object
   */
  async function handleSubmit(e) {
    e.preventDefault()

    // Validate fields
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setLocalError("Fields cannot be empty") // Set validation error
      return // Prevent API request if fields are empty
    }

    dispatch(logingPending())

    try {
      const authResponse = await userLogin(credentials, isRemember)
      if (authResponse.body.token) {
        console.log("✅ Login successful")
        dispatch(logingSuccess())
        onSuccess() // Call the success callback (e.g., redirect)
      } else {
        console.log("❌ No token received")
      }
    } catch (error) {
      console.log("❌ Login failed:", error)
      dispatch(logingError(error.response?.data?.message || "Login error"))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handleChange} />
      </div>

      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          name="remember-me"
          checked={isRemember}
          onChange={() => dispatch(logingRemember(!isRemember))}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button" type="submit">Sign In</button>

      {isLoading && (
        <div className="spinner-border text-success mt-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* Show validation error if fields are empty */}
      {localError && <p className="error-message">{localError}</p>}

      {/* Show API error only if fields are not empty */}
      {!localError && error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default LogIn
