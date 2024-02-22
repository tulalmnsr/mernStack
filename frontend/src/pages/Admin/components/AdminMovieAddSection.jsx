import axios from "axios";
import { useState } from "react";

export const AdminMovieAddSection = () => {
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    overview: "",
    releaseDate: "",
    genre: "",
    trailerUrl: "",
    showtimes: "",
  });
  const [adminMovieDropDown, setAdminMovieDropDown] = useState(false);

  const toggleAdminSection = () => {
    setAdminMovieDropDown((prevState) => !prevState);
  };

  const handleMovieInfo = (e) => {
    const name = e.target.name;
    const value =
      name === "genre"
        ? e.target.value.split(",")
        : e.target.value;

    setMovieInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  };

  const movieAdd = async (e) => {
    e.preventDefault();

    if (
      movieInfo.title !== "" &&
      movieInfo.overview !== "" &&
      movieInfo.releaseDate !== "" &&
      movieInfo.genre !== "" &&
      movieInfo.trailerUrl !== "" &&
      movieInfo.showtimes !== ""
    ) {
      try {
        const movieData = {
          ...movieInfo,
          genre: movieInfo.genre.split(",").map((genre) => genre.trim()),
        };

        const movieResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/movies`,
          movieData
        );

        if (movieResponse.status === 200) {
          alert("Movie added successfully");
          setMovieInfo({
            title: "",
            overview: "",
            releaseDate: "",
            genre: "",
            trailerUrl: "",
            showtimes: "",
          });
        }
      } catch (err) {
        console.error(err);
        alert("Failed to add movie");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <section className="section-admin-movie-add container">
      <div className="form-heading-container">
        <h2 className="form-admin-heading">Add a Movie</h2>
        <button className="btn-admin-arrow" onClick={toggleAdminSection}>
          {!adminMovieDropDown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 184l144 144 144-144"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 328l144-144 144 144"
              />
            </svg>
          )}
        </button>
      </div>

      {adminMovieDropDown && (
        <form
          className="form-movie-add"
          onSubmit={(e) => {
            movieAdd(e);
          }}
        >
          <div>
            <p>Title:</p>
            <input
              name="title"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie Title"
            />
          </div>

          <div>
            <p>Overview:</p>
            <input
              name="overview"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie Overview"
            />
          </div>

          <div>
            <p>Release Date:</p>
            <input
              name="releaseDate"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="(yyyy-mm-dd) format"
            />
          </div>

          <div>
            <p>Genre:</p>
            <input
              name="genre"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Genres separated by comma"
            />
          </div>

          <div>
            <p>Trailer URL:</p>
            <input
              name="trailerUrl"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Trailer URL"
            />
          </div>

          <div>
            <p>Showtimes:</p>
            <input
              name="showtimes"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Showtimes"
            />
          </div>

          <button type="submit" className="btn-admin">
            CONFIRM
          </button>
        </form>
      )}
    </section>
  );
};
