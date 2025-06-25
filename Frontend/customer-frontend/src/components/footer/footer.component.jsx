import React from 'react';
import './footer.styles.css'; // Link to the CSS file
import Logo from '../../images/logo.png'

const Footer = () => {
  return (
    <footer className="cymbal-footer">
      <div className="cymbal-footer-container">
        {/* About Section */}
        <div className="cymbal-footer-section footer-about">
          <img src={Logo} alt="Logo" />
          <p>
            Your ultimate destination for premium items!
          </p>
          <div className="social-links">
            {/* These 'a' tags use "#!" as a placeholder for static demo */}
            {/* Font Awesome icons are used here. Make sure Font Awesome is linked in your index.html */}
            <a href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#!" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Shop Links Section */}
        <div className="cymbal-footer-section footer-links">
          <h3>Shop</h3>
          <ul>
            <li><a href="#!">Apparel</a></li>
            <li><a href="#!">Lifestyle</a></li>
            <li><a href="#!">Drinkware</a></li>
            <li><a href="#!">Office</a></li>
            <li><a href="#!">Accessories</a></li>
            <li><a href="#!">Electronics</a></li>
            <li><a href="#!">Bags</a></li>
            <li><a href="#!">Shoes</a></li>
          </ul>
        </div>

        {/* Customer Service Links Section */}
        <div className="cymbal-footer-section footer-links">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#!">Contact Us</a></li>
            <li><a href="#!">FAQs</a></li>
            <li><a href="#!">Shipping & Delivery</a></li>
            <li><a href="#!">Returns & Refunds</a></li>
            <li><a href="#!">Privacy Policy</a></li>
            <li><a href="#!">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter & Payment Section */}
        <div className="cymbal-footer-section footer-newsletter">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest products and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Enter your email for newsletter" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="payment-icons">
            {/* Placeholder icons for payment methods (requires Font Awesome or similar) */}
            <span><i className="fab fa-cc-visa"></i></span>
            <span><i className="fab fa-cc-mastercard"></i></span>
            <span><i className="fab fa-cc-paypal"></i></span>
            <span><i className="fab fa-cc-stripe"></i></span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="cymbal-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cymbal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;