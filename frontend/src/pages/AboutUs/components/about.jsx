import React from 'react';
import cinemaImage from '../images/cinema.jpg';
import '../App.css';

function About() {
  return (
    <div className="container about-section">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <img src={cinemaImage} alt="City Movie Cinema" className="about-image" />
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="bar"></div>
          <h2 className="title">About Us</h2>
          <p className="text">
            City Movie is your premier destination for entertainment in the heart of the city. With state-of-the-art facilities and a commitment to delivering the best cinematic experience, we strive to make every visit memorable.
          </p>
          <p className="text">
            Our cinema features the latest blockbusters across various genres, ensuring there's something for everyone. Whether you're a solo moviegoer, on a date, or out with friends and family, City Movie promises an unforgettable time.
          </p>
          <p className="text">
            We also offer special screenings, events, and promotions, so be sure to follow us on social media and subscribe to our newsletter to stay updated on all the latest happenings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

