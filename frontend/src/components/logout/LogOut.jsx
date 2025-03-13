import React from 'react'
import { useDispatch } from 'react-redux'
import { logingOut } from '../../features/auth/loginSlice'
import { profileOut } from '../../features/auth/userSlice'
import { useNavigate } from 'react-router-dom'
import './LogOut.css'

/**
 * LogOut Component - Handles user logout process
 *
 * @returns {JSX.Element} Logout button
 */
function LogOut() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Handles user logout by clearing stored tokens, resetting Redux state, and redirecting to sign-in page.
   */
  function handleLogout() {
    // Remove session storage token
    sessionStorage.removeItem('token')

    // Remove persistent token from localStorage if it exists
    if (localStorage.getItem('token')) {
      console.log("Removing persistent token from localStorage")
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration') // Also remove the expiration time
    }

    // Reset Redux state
    dispatch(logingOut())
    dispatch(profileOut())

    // Redirect to sign-in page
    navigate('/sign-in')
  }

  return (
    <button onClick={handleLogout} className='btn-logout'>
      <i class="fa fa-sign-out"></i> Sign Out
    </button>
  )
}

export default LogOut