import React, { useState, useEffect } from 'react';
import cinemaImage from '../images/old.png';
import '../App.css'; // Keep the import if there are global styles in App.css

function History() {
  const [clientCount, setClientCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [yearCount, setYearCount] = useState(0);

  useEffect(() => {
    const animateNumbers = () => {
      const clientInterval = setInterval(() => {
        setClientCount(prevCount => {
          if (prevCount >= 15000) {
            clearInterval(clientInterval);
            return 15000; 
          }
          return prevCount + 300; 
        });
      }, 100);

      const movieInterval = setInterval(() => {
        setMovieCount(prevCount => {
          if (prevCount >= 1500) {
            clearInterval(movieInterval);
            return 1500; 
          }
          return prevCount + 100; 
        });
      }, 200);

      const yearInterval = setInterval(() => {
        setYearCount(prevCount => {
          if (prevCount >= 50) {
            clearInterval(yearInterval);
            return 50; 
          }
          return prevCount + 5; 
        });
      }, 300);

      return () => {
        clearInterval(clientInterval);
        clearInterval(movieInterval);
        clearInterval(yearInterval);
      };
    };

    animateNumbers();
  }, []);

  return (
    <div className="container mx-auto py-8 bg-gray-200">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 order-last md:order-first">
          <img src={cinemaImage} alt="City Movie Cinema" className="rounded-lg shadow-lg mb-4 mt-5" />
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="bar"></div>
          <h2 className="title">Our History</h2>
          <p className="text">
            City Movie has been a cornerstone of entertainment in the heart of the city for over two generations. Founded in 1955, our commitment to providing top-notch cinematic experiences has only grown stronger with time.
          </p>
          <p className="text">
            Over the years, we have continuously adapted to the changing landscape of the film industry, 
            embracing new technologies and trends to ensure our audience receives the best possible experience 
            every time they visit us.
          </p>
          <p className="text">
            From humble beginnings to becoming a beloved destination for movie enthusiasts, 
            City Movie remains dedicated to delivering unforgettable moments on the big screen.
          </p>
          <div className="flex mt-3 ml-10">
            <div className="mr-16">
              <span className="about">{clientCount}+</span>
              <p className="text">Satisfied Clients</p>
            </div>
            <div className="text-center mr-16 number-container">
              <span className="about">{movieCount}+</span>
              <p className="text">Movies screened annually</p>
            </div>
            <div className="text-center number-container">
              <span className="about">{yearCount}+</span>
              <p className="text">Years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
