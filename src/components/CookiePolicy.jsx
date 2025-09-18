import { Link } from 'react-router-dom'

const CookiePolicy = () => {
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
                  Cookie Policy
                </li>
              </ol>
            </nav>

            <div className="card shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h1 className="h3 mb-0">
                  <i className="fas fa-cookie-bite me-2"></i>
                  Cookie Policy
                </h1>
                <p className="mb-0 mt-2 opacity-75">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="card-body">
                <div className="cookie-content">
                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">1. What Are Cookies?</h2>
                    <p>
                      Cookies are small text files that are placed on your computer or mobile device when you visit 
                      a website. They are widely used to make websites work more efficiently and to provide 
                      information to website owners.
                    </p>
                    <p>
                      In the context of Recipe Finder, we primarily use browser localStorage instead of traditional 
                      cookies for storing your preferences and favorites.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">2. How We Use Storage</h2>
                    <h5 className="h6 text-secondary mb-2">2.1 Local Storage</h5>
                    <p>Recipe Finder uses browser localStorage to store:</p>
                    <ul>
                      <li>Your favorite recipes</li>
                      <li>Search preferences and filters</li>
                      <li>App settings and user preferences</li>
                      <li>Recently viewed recipes</li>
                    </ul>

                    <h5 className="h6 text-secondary mb-2 mt-3">2.2 Session Storage</h5>
                    <p>We may use session storage for:</p>
                    <ul>
                      <li>Temporary data during your browsing session</li>
                      <li>Search results caching</li>
                      <li>Form data preservation</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">3. Types of Storage We Use</h2>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Storage Type</th>
                            <th>Purpose</th>
                            <th>Duration</th>
                            <th>Data Stored</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Local Storage</strong></td>
                            <td>Persistent user preferences</td>
                            <td>Until manually cleared</td>
                            <td>Favorites, settings, preferences</td>
                          </tr>
                          <tr>
                            <td><strong>Session Storage</strong></td>
                            <td>Temporary session data</td>
                            <td>Until browser tab closes</td>
                            <td>Search results, temporary data</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">4. Third-Party Storage</h2>
                    <h5 className="h6 text-secondary mb-2">4.1 YouTube Videos</h5>
                    <p>
                      When you watch YouTube videos embedded in our recipes, YouTube may set cookies according to 
                      their own cookie policy. We do not control these cookies.
                    </p>

                    <h5 className="h6 text-secondary mb-2 mt-3">4.2 TheMealDB API</h5>
                    <p>
                      We fetch recipe data from TheMealDB API, but this does not involve setting cookies on your 
                      device. The API calls are made server-side and do not store any data on your device.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">5. Managing Your Storage</h2>
                    <h5 className="h6 text-secondary mb-2">5.1 Clearing Local Storage</h5>
                    <p>You can clear your stored data at any time:</p>
                    <ul>
                      <li><strong>Chrome/Edge:</strong> F12 → Application → Storage → Local Storage → Clear All</li>
                      <li><strong>Firefox:</strong> F12 → Storage → Local Storage → Clear All</li>
                      <li><strong>Safari:</strong> Develop → Storage → Local Storage → Clear All</li>
                    </ul>

                    <h5 className="h6 text-secondary mb-2 mt-3">5.2 Browser Settings</h5>
                    <p>You can also manage storage through your browser settings:</p>
                    <ul>
                      <li>Disable JavaScript (will affect app functionality)</li>
                      <li>Use private/incognito browsing mode</li>
                      <li>Set your browser to clear data on exit</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">6. Impact of Disabling Storage</h2>
                    <p>If you disable localStorage or clear your stored data:</p>
                    <ul>
                      <li>Your favorite recipes will be lost</li>
                      <li>Search preferences will be reset</li>
                      <li>App settings will return to defaults</li>
                      <li>The app will still function, but without personalization</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">7. Data Security</h2>
                    <p>
                      All data stored locally on your device is:
                    </p>
                    <ul>
                      <li>Encrypted by your browser's security mechanisms</li>
                      <li>Only accessible by our application</li>
                      <li>Not transmitted to external servers</li>
                      <li>Protected by your device's security settings</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">8. Children's Privacy</h2>
                    <p>
                      Our storage practices are designed to be safe for users of all ages. We do not collect 
                      personal information from children under 13, and all data remains on the user's device.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">9. Updates to This Policy</h2>
                    <p>
                      We may update this Cookie Policy from time to time to reflect changes in our practices or 
                      for other operational, legal, or regulatory reasons. We will notify you of any material 
                      changes by updating the "Last updated" date at the top of this policy.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">10. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                      <li>Know what data is stored on your device</li>
                      <li>Access and review your stored data</li>
                      <li>Delete your stored data at any time</li>
                      <li>Opt-out of data storage (though this may affect functionality)</li>
                      <li>Contact us with questions about our storage practices</li>
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 text-warning mb-3">11. Contact Us</h2>
                    <p>If you have any questions about this Cookie Policy, please contact us:</p>
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

export default CookiePolicy
