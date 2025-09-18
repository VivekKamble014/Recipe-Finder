import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row py-5">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-brand">
              <h5 className="fw-bold mb-3">
                <span className="text-gradient">🍳 Recipe Finder</span>
              </h5>
              <p className="text-muted mb-3">
                Discover amazing recipes from around the world. Search, explore, and save your favorite dishes with our comprehensive recipe database.
              </p>
              <div className="social-links">
                <a href="mailto:mrvivekkamble8@gmail.com" className="social-link me-3" title="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="tel:+917709629488" className="social-link me-3" title="Phone">
                  <i className="fas fa-phone"></i>
                </a>
                <a href="https://github.com" className="social-link me-3" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" className="social-link" title="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/favorites" className="footer-link">
                  <i className="fas fa-heart me-2"></i>Favorites
                </Link>
              </li>
              <li className="mb-2">
                <a href="#search" className="footer-link">
                  <i className="fas fa-search me-2"></i>Search Recipes
                </a>
              </li>
              <li className="mb-2">
                <a href="#random" className="footer-link">
                  <i className="fas fa-dice me-2"></i>Random Recipe
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/?category=Breakfast" className="footer-link">
                  <i className="fas fa-sun me-2"></i>Breakfast
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=Lunch" className="footer-link">
                  <i className="fas fa-utensils me-2"></i>Lunch
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=Dinner" className="footer-link">
                  <i className="fas fa-moon me-2"></i>Dinner
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=Dessert" className="footer-link">
                  <i className="fas fa-ice-cream me-2"></i>Dessert
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Contact Information</h6>
            <div className="contact-info">
              <div className="contact-item mb-3">
                <div className="d-flex align-items-center">
                  <div className="contact-icon me-3">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block">Email</small>
                    <a href="mailto:mrvivekkamble8@gmail.com" className="contact-link">
                      mrvivekkamble8@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item mb-3">
                <div className="d-flex align-items-center">
                  <div className="contact-icon me-3">
                    <i className="fas fa-phone text-success"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block">Phone</small>
                    <a href="tel:+917709629488" className="contact-link">
                      +91 7709629488
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="d-flex align-items-start">
                  <div className="contact-icon me-3">
                    <i className="fas fa-map-marker-alt text-danger"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block">Address</small>
                    <span className="contact-text">
                      Kothrud, Pune<br />
                      Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted">
                © {currentYear} Recipe Finder. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-bottom-links">
                <Link to="/privacy" className="footer-bottom-link me-3">Privacy Policy</Link>
                <Link to="/terms" className="footer-bottom-link me-3">Terms of Service</Link>
                <Link to="/cookies" className="footer-bottom-link">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
