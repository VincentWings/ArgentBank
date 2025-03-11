import { Outlet, useLocation } from "react-router-dom"
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './Layout.css'

/**
 * Layout Component - Provides a consistent structure for all pages.
 *
 * Includes:
 * - Header (Navigation & Logo)
 * - Main content area (Child routes rendered via Outlet)
 * - Footer (Copyright information)
 *
 * @returns {JSX.Element} The structured layout for all pages
 */
function Layout() {
  const location = useLocation() // Get current URL path
  const isHomepage = location.pathname === "/" // Check if user is on homepage

  return (
    <>
      <Header /> {/* Renders the Header component */}

      <main className={`main ${isHomepage ? "" : "bg-dark"}`}>
        <Outlet /> {/* Renders the child route content dynamically */}
      </main>

      <Footer /> {/* Renders the Footer component */}
    </>
  )
}

export default Layout