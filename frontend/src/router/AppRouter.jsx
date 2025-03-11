import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout and Protected Route
import Layout from '../components/layout/Layout'
import PrivateRoute from './PrivateRoute'

// Pages
import Homepage from '../pages/homepage/Homepage'
import LoginPage from '../pages/login/LoginPage'
import User from '../pages/user/User'
import PageNotFound from '../pages/404/PageNotFound'

/**
 * AppRouter - Manages application routing using React Router.
 * Defines public and protected routes.
 *
 * @returns {JSX.Element} The application router
 */
const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Main layout wrapping all pages */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Homepage />} />
        <Route path="/sign-in" element={<LoginPage />} />

        {/* Protected User Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<User />} />
        </Route>

        {/* 404 Page - Handles undefined routes */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRouter