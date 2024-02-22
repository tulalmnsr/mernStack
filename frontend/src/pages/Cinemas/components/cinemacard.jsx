// CinemaCard.js
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import './cinemacard.css';

const API_KEY = 'AIzaSyAtIXkVnICdaJ0eG3J04NRTNYO0Xnv_2XM';

const CinemaCard = ({ cinema }) => {
    return (
        <div className="cinema-card">
            <img src={cinema.imageUrl} alt={cinema.name} className="cinema-image" />

            <div className="cinema-details">
                <p className="cinema-name">{cinema.name}</p>
                <div className="contact-info">
                    <FaPhone className="icon" />
                    <span>{cinema.contact}</span>
                </div>
                <div className="location-info">
                    <FaMapMarkerAlt className="icon" />
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cinema.location)}`} className="location-link" target="_blank" rel="noopener noreferrer">
                        {cinema.location}
                    </a>
                </div>
                <div className="map-container">
                    <iframe
                        title={cinema.name}
                        width="100%"
                        height="230"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(cinema.location)}`}
                        allowFullScreen
                    ></iframe>
                </div>
                <a href={cinema.webUrl} className="visit-website-link" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
        </div>
    );
};

export default CinemaCard;
