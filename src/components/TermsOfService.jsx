import { Link } from 'react-router-dom'

const TermsOfService = () => {
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
                  Terms of Service
                </li>
              </ol>
            </nav>

            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h1 className="h3 mb-0">
                  <i className="fas fa-file-contract me-2"></i>
                  Terms of Service
                </h1>
                <p className="mb-0 mt-2 opacity-75">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="card-body">
                <div className="terms-content">
                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">1. Acceptance of Terms</h2>
                    <p>
                      By accessing and using Recipe Finder ("the Service"), you accept and agree to be bound by the 
                      terms and provision of this agreement. If you do not agree to abide by the above, please do 
                      not use this service.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">2. Description of Service</h2>
                    <p>
                      Recipe Finder is a web application that allows users to:
                    </p>
                    <ul>
                      <li>Search for recipes from around the world</li>
                      <li>View detailed recipe information including ingredients and instructions</li>
                      <li>Save favorite recipes locally on their device</li>
                      <li>Watch cooking tutorial videos</li>
                      <li>Filter recipes by category, cuisine, and other criteria</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">3. User Responsibilities</h2>
                    <h5 className="h6 text-secondary mb-2">3.1 Acceptable Use</h5>
                    <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                    <ul>
                      <li>Use the Service in any way that violates applicable laws or regulations</li>
                      <li>Attempt to gain unauthorized access to any part of the Service</li>
                      <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                      <li>Use any automated system to access the Service without permission</li>
                    </ul>

                    <h5 className="h6 text-secondary mb-2 mt-3">3.2 Account Security</h5>
                    <p>
                      While our app stores data locally on your device, you are responsible for maintaining the 
                      security of your device and any data stored on it.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">4. Intellectual Property Rights</h2>
                    <h5 className="h6 text-secondary mb-2">4.1 Our Content</h5>
                    <p>
                      The Service and its original content, features, and functionality are owned by Recipe Finder 
                      and are protected by international copyright, trademark, patent, trade secret, and other 
                      intellectual property laws.
                    </p>

                    <h5 className="h6 text-secondary mb-2 mt-3">4.2 Third-Party Content</h5>
                    <p>
                      Recipe data is provided by TheMealDB API and YouTube videos are embedded from YouTube. 
                      We do not claim ownership of this third-party content.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">5. Privacy and Data Protection</h2>
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                      use of the Service, to understand our practices.
                    </p>
                    <ul>
                      <li>Favorites are stored locally on your device</li>
                      <li>No personal data is transmitted to our servers</li>
                      <li>You can clear your data at any time</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">6. Disclaimers and Limitations</h2>
                    <h5 className="h6 text-secondary mb-2">6.1 Service Availability</h5>
                    <p>
                      We strive to provide continuous service availability, but we cannot guarantee that the Service 
                      will be available at all times. The Service may be temporarily unavailable due to maintenance, 
                      updates, or technical issues.
                    </p>

                    <h5 className="h6 text-secondary mb-2 mt-3">6.2 Recipe Information</h5>
                    <p>
                      Recipe information is provided by third-party APIs. We do not guarantee the accuracy, 
                      completeness, or reliability of recipe data, nutritional information, or cooking instructions.
                    </p>

                    <h5 className="h6 text-secondary mb-2 mt-3">6.3 Limitation of Liability</h5>
                    <p>
                      In no event shall Recipe Finder be liable for any indirect, incidental, special, consequential, 
                      or punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
                      other intangible losses.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">7. Third-Party Services</h2>
                    <p>Our Service integrates with:</p>
                    <ul>
                      <li><strong>TheMealDB API:</strong> For recipe data and information</li>
                      <li><strong>YouTube:</strong> For cooking tutorial videos</li>
                    </ul>
                    <p>
                      These third-party services have their own terms and privacy policies. We are not responsible 
                      for their content or practices.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">8. Modifications to Service</h2>
                    <p>
                      We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) 
                      at any time with or without notice. We shall not be liable to you or any third party for 
                      any modification, suspension, or discontinuation of the Service.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">9. Termination</h2>
                    <p>
                      We may terminate or suspend your access to the Service immediately, without prior notice or 
                      liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">10. Governing Law</h2>
                    <p>
                      These Terms shall be interpreted and governed by the laws of India, without regard to its 
                      conflict of law provisions. Any disputes arising from these Terms shall be subject to the 
                      jurisdiction of the courts in Pune, Maharashtra, India.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">11. Changes to Terms</h2>
                    <p>
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                      If a revision is material, we will try to provide at least 30 days notice prior to any new 
                      terms taking effect.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-success mb-3">12. Contact Information</h2>
                    <p>If you have any questions about these Terms of Service, please contact us:</p>
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

export default TermsOfService
