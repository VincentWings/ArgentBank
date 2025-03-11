import { Link } from 'react-router-dom'
import './PageNotFound.css'

/**
 * PageNotFound Component - Displays a 404 error page.
 *
 * This component is shown when a user tries to access a non-existent route.
 *
 * @returns {JSX.Element} A styled 404 error page
 */
const PageNotFound = () => {
  return (
    <main className="not-found">
      <section className="not-found-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link" aria-label="Go back to homepage">
          Back to Homepage
        </Link>
      </section>
    </main>
  )
}

export default PageNotFound