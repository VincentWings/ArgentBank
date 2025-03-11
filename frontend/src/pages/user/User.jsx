import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../features/auth/userSlice'
import './User.css'

/**
 * User component - Displays user profile information and allows editing of first and last name.
 * 
 * @returns {JSX.Element} The user profile UI
 */
function User() {
  const dispatch = useDispatch()

  // Get user data from Redux store
  const user = useSelector(state => state.user || {})
  const { isLoading, isLoaded, firstName, lastName, error } = user

  // Local state for editing mode
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  /**
   * Fetch user profile when component mounts.
   */
  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, isLoaded])

  /**
   * Update local state when user data is loaded.
   */
  useEffect(() => {
    if (isLoaded) {
      setNewFirstName(firstName || '')
      setNewLastName(lastName || '')
    }
  }, [firstName, lastName, isLoaded])

  /**
   * Save updated user information.
   */
  const handleSave = () => {
    dispatch(updateUserProfile({ firstName: newFirstName, lastName: newLastName }))
      .then(() => setIsEditing(false)) // Exit edit mode after update
  }

  return (
    <div className="user-container">
      <div className="header">
        <h2>Welcome back</h2>

        {/* Display error message if API request fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Show loading message while fetching data */}
        {isLoading && <p className="loading-message">Loading...</p>}

        {/* Edit mode */}
        {isEditing ? (
          <div className="edit-form">
            <div className="input-container">
              <input
                type="text"
                value={newFirstName}
                onChange={e => setNewFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={newLastName}
                onChange={e => setNewLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <div className="button-container">
              <button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h2>{firstName || 'Unknown'} {lastName || 'User'}!</h2>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {/** Render user accounts */}
      {renderAccount("Argent Bank Checking (x8349)", "$2,082.79", "Available Balance")}
      {renderAccount("Argent Bank Savings (x6712)", "$10,928.42", "Available Balance")}
      {renderAccount("Argent Bank Credit Card (x8349)", "$184.30", "Current Balance")}
    </div>
  )
}

/**
 * Renders an account section.
 * 
 * @param {string} title - Account title
 * @param {string} amount - Account balance
 * @param {string} description - Balance description
 * @returns {JSX.Element} The account section UI
 */
function renderAccount(title, amount, description) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

export default User