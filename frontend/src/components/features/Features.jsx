import iconChat from '../../assets/img/icon-chat.png'
import iconMoney from '../../assets/img/icon-money.png'
import iconSecurity from '../../assets/img/icon-security.png'
import './Features.css'

/**
 * Features Component - Displays the main features of the bank.
 *
 * @returns {JSX.Element} Features section with three key advantages
 */
function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>

      <FeatureItem
        icon={iconChat}
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />

      <FeatureItem
        icon={iconMoney}
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
      />

      <FeatureItem
        icon={iconSecurity}
        title="Security you can trust"
        description="We use top-of-the-line encryption to make sure your data and money is always safe."
      />
    </section>
  )
}

/**
 * FeatureItem Component - Displays a single feature with an icon, title, and description.
 *
 * @param {Object} props - Component props
 * @param {string} props.icon - Image source for the feature icon
 * @param {string} props.title - Title of the feature
 * @param {string} props.description - Description of the feature
 * @returns {JSX.Element} A feature item
 */
function FeatureItem({ icon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={title} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default Features