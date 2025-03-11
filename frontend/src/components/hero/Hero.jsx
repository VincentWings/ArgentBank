import './Hero.css'

/**
 * Hero Component - Displays the promotional section of the homepage.
 *
 * @returns {JSX.Element} The Hero section with key banking benefits
 */
function Hero() {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <HeroText text="No fees." />
        <HeroText text="No minimum deposit." />
        <HeroText text="High interest rates." />
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  )
}

/**
 * HeroText Component - Displays a single promotional message.
 *
 * @param {Object} props - Component props
 * @param {string} props.text - Text content to display
 * @returns {JSX.Element} A styled paragraph
 */
function HeroText({ text }) {
  return <p className="subtitle">{text}</p>
}

export default Hero