import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="fade-in">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Privacy Policy
                </li>
              </ol>
            </nav>

            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h1 className="h3 mb-0">
                  <i className="fas fa-shield-alt me-2"></i>
                  Privacy Policy
                </h1>
                <p className="mb-0 mt-2 opacity-75">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="card-body">
                <div className="privacy-content">
                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">1. Introduction</h2>
                    <p>
                      Welcome to Recipe Finder ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                      use, disclose, and safeguard your information when you use our recipe discovery application. 
                      Please read this privacy policy carefully.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">2. Information We Collect</h2>
                    <h5 className="h6 text-secondary mb-2">2.1 Personal Information</h5>
                    <ul>
                      <li>Email address (if you contact us)</li>
                      <li>Name (if provided voluntarily)</li>
                      <li>Contact information (if you reach out to us)</li>
                    </ul>

                    <h5 className="h6 text-secondary mb-2 mt-3">2.2 Usage Information</h5>
                    <ul>
                      <li>Recipe search queries and preferences</li>
                      <li>Favorite recipes you save</li>
                      <li>App usage patterns and interactions</li>
                      <li>Device information and browser type</li>
                    </ul>

                    <h5 className="h6 text-secondary mb-2 mt-3">2.3 Local Storage</h5>
                    <ul>
                      <li>Favorites are stored locally on your device</li>
                      <li>Search preferences and settings</li>
                      <li>No personal data is transmitted to external servers</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">3. How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                      <li>Provide and maintain our recipe discovery service</li>
                      <li>Improve user experience and app functionality</li>
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Analyze usage patterns to enhance our services</li>
                      <li>Ensure the security and integrity of our application</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">4. Data Storage and Security</h2>
                    <p>
                      Your favorites and preferences are stored locally on your device using browser localStorage. 
                      This means:
                    </p>
                    <ul>
                      <li>Your data stays on your device and is not transmitted to our servers</li>
                      <li>You can clear your data at any time through your browser settings</li>
                      <li>We implement appropriate security measures to protect your information</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">5. Third-Party Services</h2>
                    <p>Our app integrates with:</p>
                    <ul>
                      <li><strong>TheMealDB API:</strong> For recipe data (no personal information shared)</li>
                      <li><strong>YouTube:</strong> For cooking video tutorials (subject to YouTube's privacy policy)</li>
                    </ul>
                    <p>
                      We do not share your personal information with third parties except as described in this policy.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Delete your data (clear localStorage)</li>
                      <li>Opt-out of certain data collection</li>
                      <li>Contact us with privacy concerns</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">7. Cookies and Tracking</h2>
                    <p>
                      Our app may use browser localStorage for functionality. We do not use tracking cookies 
                      or collect personal data for advertising purposes.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">8. Children's Privacy</h2>
                    <p>
                      Our service is not intended for children under 13. We do not knowingly collect 
                      personal information from children under 13.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">9. Changes to This Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any changes 
                      by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-primary mb-3">10. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <div className="contact-info bg-light p-3 rounded">
                      <p className="mb-1">
                        <i className="fas fa-envelope text-primary me-2"></i>
                        Email: <a href="mailto:mrvivekkamble8@gmail.com">mrvivekkamble8@gmail.com</a>
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-phone text-success me-2"></i>
                        Phone: <a href="tel:+917709629488">+91 7709629488</a>
                      </p>
                      <p className="mb-0">
                        <i className="fas fa-map-marker-alt text-danger me-2"></i>
                        Address: Kothrud, Pune, Maharashtra, India
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
