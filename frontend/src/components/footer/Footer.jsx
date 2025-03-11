import './Footer.css'

/**
 * Footer Component - Displays the footer with dynamic year.
 *
 * @returns {JSX.Element} The footer component UI
 */
function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <p className="footer-text">Copyright {currentYear} Argent Bank</p>
    </footer>
  )
}

export default Footer