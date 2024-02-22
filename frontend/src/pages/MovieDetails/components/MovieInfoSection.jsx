import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { showLoginModal } from "../../../reducers/authSlice";
import { resetCart } from "../../../reducers/cartSlice";
import { LocationSelector } from "../../../components/LocationSelector";

export const MovieInfoSection = () => {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleShowtimeClick = (showtimeId) => {
    dispatch(resetCart());
    isAuthenticated && signedPerson.person_type === "Customer"
      ? navigate("/bookings")
      : dispatch(showLoginModal());
  };

  return (
    <div className="section-movie-info container">
      {loading ? (
        <HashLoader cssOverride={override} size={60} color="#eb3656" />
      ) : (
        <>
          <div className="movie-info-grid-container">
            {/* Render movie details */}
          </div>

          <div className="movie-info-description-container">
            {/* Render movie description */}
          </div>

          <div className="movie-info-location-container">
            <LocationSelector />
          </div>

          <h3 className="movie-info-screen-heading">Showtimes</h3>

          <div className="movie-info-screen-container">
            {/* Render showtimes from movieData */}
            {movieData.showtimes && movieData.showtimes.length > 0 ? (
              movieData.showtimes.map((showtime, index) => (
                <div key={index}>
                  <h4>{showtime.date}</h4>
                  <ul>
                    {showtime.times.map((time, i) => (
                      <li key={i}>
                        <button
                          className="showtimes-startime-btn"
                          onClick={() => handleShowtimeClick(time.id)}
                        >
                          {time.startTime}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No showtimes available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
