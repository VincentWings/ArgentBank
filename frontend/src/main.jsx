import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store'
import AppRouter from './router/AppRouter'
import './index.css'

/**
 * Main entry point of the application.
 *
 * - Wraps the app with `StrictMode` for highlighting potential issues
 * - Uses `Provider` to supply the Redux store to the entire app
 * - Renders the `AppRouter` component to manage routes
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
)