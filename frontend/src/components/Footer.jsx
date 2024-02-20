import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export const Footer = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/locationDetails`
        );
        setLocationData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const locations = locationData.map((location, idx) => {
    return (
      <p key={idx} className="address">
        {location.location_details}
      </p>
    );
  });

  return (
    <footer className="footer container">
      <div className="footer-column">
        <h3 className="footer-heading">CITY MOVIE</h3>
        <p className="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          ante vel nisi rhoncus bibendum.
        </p>
      </div>
      <div className="footer-column">
        <h3 className="footer-heading">Quick Links</h3>
        <ul className="footer-links">
          <li>
            <Link className="footer-link" to="/aboutus">
              About Us
            </Link>
          </li>
          <li>
            <Link className="footer-link" to="/contactus">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="footer-link" to="/faq">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-column">
        <h3 className="footer-heading">Contact Information</h3>
        <div className="contact-info">
          <FaEnvelope className="icon" />
          <p>info@citymovie.com</p>
        </div>
        <div className="contact-info">
          <FaPhone className="icon" />
          <p>+1234567890</p>
        </div>
        <div className="contact-info">
          <FaMapMarkerAlt className="icon" />
          <p>City Movie, 123 Main Street, Cityville, Country</p>
        </div>
      </div>
      <div className="footer-address-container">
        {loading ? <HashLoader color="#845BB3" /> : locations}
      </div>
      <p className="copyright">
        &copy; 2024 City Movie, Inc. All rights reserved.
      </p>
    </footer>
  );
};
