import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogIn from '../../components/login/LogIn'
import './LoginPage.css'

/**
 * LoginPage component - Displays the login form and redirects after login success
 * @returns {JSX.Element} The login page UI
 */
function LoginPage() {
  const navigate = useNavigate()

  /**
   * Handles successful login and redirects to the user page
   */
  function handleLoginSuccess() {
    navigate('/user')
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h2>Sign In</h2>
      <LogIn onSuccess={handleLoginSuccess} />
    </section>
  )
}

export default LoginPage