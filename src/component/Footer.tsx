import React from "react";

function Footer() {
  return (
    <footer className="footer-container mt-3">
      <div className="footer-content">
        <p className="footer-text">
          📚 <strong>Book Store</strong> - Your gateway to a world of stories and knowledge.
        </p>
        <p className="footer-text">
          🌟 Discover, explore, and enjoy the best books from around the globe.
        </p>
        <p className="footer-text">
          💌 Contact us: <a href="mailto:support@bookstore.com">support@bookstore.com</a>
        </p>
        <p className="footer-text">
          © {new Date().getFullYear()} Book Store. All rights reserved. 🌍
        </p>
      </div>
    </footer>
  );
}

export default Footer;