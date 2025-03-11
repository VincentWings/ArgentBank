/**
 * API Configuration - Defines base URLs for API requests.
 */

/** Base API URL */
export const API_URL = 'http://localhost:3001/api/v1/user'

/** Authentication and user endpoints */
export const URL_LOGIN = `${API_URL}/login`
export const URL_SIGNUP = `${API_URL}/signup`
export const URL_PROFILE = `${API_URL}/profile`