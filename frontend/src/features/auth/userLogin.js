import axios from 'axios'
import { URL_LOGIN } from '../../config'

/**
 * Logs in the user by sending credentials to the API.
 *
 * @param {Object} credentials - User login details.
 * @param {string} credentials.email - User email address.
 * @param {string} credentials.password - User password.
 * @param {boolean} rememberMe - Whether the user checked "Remember me".
 * @returns {Promise<Object>} - Resolves with user data or rejects with an error.
 */
export async function userLogin(credentials, rememberMe) {
  try {
    const res = await axios.post(URL_LOGIN, credentials)
    const token = res.data.body.token
    const expirationTime = Date.now() + 3600000 // 1 hour expiration

    console.log("✅ Token received:", token)

    // Clear previous tokens before setting a new one
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    sessionStorage.removeItem('token')

    // Store token in appropriate storage
    if (rememberMe) {
      console.log("✅ Storing token in localStorage (Persistent login)")
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiration', expirationTime)
    } else {
      console.log("✅ Storing token in sessionStorage (Temporary session)")
      sessionStorage.setItem('token', token)
    }

    return res.data
  } catch (error) {
    throw error
  }
}