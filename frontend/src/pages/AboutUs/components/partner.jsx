// Partners.js
import React from 'react';
import partner1 from '../images/hulu.png';
import partner2 from '../images/mx.png';
import partner3 from '../images/philips.png';
import partner4 from '../images/prime.png';
import partner5 from '../images/sony.png';
import partner6 from '../images/4dx.png';
import partner7 from '../images/dolby.png';
import partner8 from '../images/imax.png';
import '../App.css'; // Import the custom CSS file

function Partners() {
  return (
    <section className="partners-section">
      <div className="container">
        <h2 className="partners-title">Our Partners</h2>
        <p className="partners-description">
          Our strength lies in developing strategic partnerships. Partnerships are key in this business, and City Movie has developed a core group of companies with which it works to provide our clients with the best solutions possible. Innovatively weaving together the complimentary attributes and services of diverse organizations, City Movie has developed important solutions for our clients to enhance the overall interpretive experience of a destination, stimulate visitor traffic, enhance visitor satisfaction, and improve profitability.
        </p>
        <div className="partners-list">
          <img src={partner1} alt="Partner 1" className="partner-logo" />
          <img src={partner2} alt="Partner 2" className="partner-logo" />
          <img src={partner3} alt="Partner 3" className="partner-logo" />
          <img src={partner4} alt="Partner 4" className="partner-logo" />
          <img src={partner5} alt="Partner 5" className="partner-logo" />
          <img src={partner6} alt="Partner 6" className="partner-logo" />
          <img src={partner7} alt="Partner 7" className="partner-logo" />
          <img src={partner8} alt="Partner 8" className="partner-logo" />
        </div>
      </div>
    </section>
  );
}

export default Partners;
