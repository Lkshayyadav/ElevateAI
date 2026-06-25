import React from 'react';
import '../styles/footer.scss';

export default function DeveloperFooter() {
  return (
    <footer className="developer-footer">
      <div className="footer-links-row">
        <a
          className="footer-link"
          href="https://github.com/Lkshayyadav"
          target="_blank"
          rel="noreferrer"
        >
          <span className="footer-link-icon">🐙</span>
          GitHub
        </a>
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/lakshay-yadav-7141532a9/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="footer-link-icon">🔗</span>
          LinkedIn
        </a>
        <a
          className="footer-link"
          href="https://x.com/LakshayYadav21"
          target="_blank"
          rel="noreferrer"
        >
          <span className="footer-link-icon">🐦</span>
          Twitter
        </a>
      </div>
    </footer>
  );
}
