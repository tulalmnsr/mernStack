// NewsletterForm.js
import React from 'react';
import '../App.css'; // Import the custom CSS file

function NewsletterForm() {
  return (
    <div className="newsletter-section">
      <div className="container">
        <h2>Join Our Newsletter</h2>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}


export default NewsletterForm;
