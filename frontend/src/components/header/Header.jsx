import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import argentBankLogo from '../../assets/img/argentbank-logo.png'
import LogOut from '../logout/LogOut'
import './Header.css'

/**
 * Header Component - Displays the navigation bar.
 *
 * Features:
 * - Argent Bank logo (redirects to homepage)
 * - Login button if user is **not authenticated**
 * - Logout button if user **is authenticated**
 * - Displays user's first and last name dynamically
 *
 * @returns {JSX.Element} The Header component UI
 */
function Header() {
  const { isAuth } = useSelector(state => state.login)
  const { firstName, lastName } = useSelector(state => state.user) // Get user name from Redux

  return (
    <header>
      <nav className="main-nav">
        {/* Argent Bank Logo (Home link) */}
        <NavLink to="/" className="main-nav-logo">
          <img src={argentBankLogo} className="main-nav-logo-image" alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>

        {/* Login and Logout */}
        <div>
          {isAuth ? (
            <>
              <NavLink to="/user" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {firstName} {lastName} {/* Display actual user name */}
              </NavLink>
              <LogOut />
            </>
          ) : (
            <NavLink to="/sign-in" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header