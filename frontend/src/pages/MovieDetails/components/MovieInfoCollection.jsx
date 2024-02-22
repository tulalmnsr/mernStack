import { useEffect, useState } from "react";
import axios from "axios";
import { CollectionCard } from "../../../components/CollectionCard";
import HashLoader from "react-spinners/HashLoader";
import { useParams } from "react-router-dom";

const MovieInfoCollection = () => {
  const { id } = useParams();
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const override = {
    display: "block",
    margin: "4.8rem auto",
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/recommendations/${id}`);
        setRecommendedMovies(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [id]);

  const recommendationCards = recommendedMovies.map((movie) => (
    <CollectionCard key={movie.id} {...movie} />
  ));

  return (
    <section className="section-movie-info-collection">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Recommended Movies
        </h1>
      </div>
      {loading ? (
        <HashLoader cssOverride={override} color="#485BB3" />
      ) : (
        <div className="details-collection-container">
          {recommendationCards.length > 0 ? (
            recommendationCards
          ) : (
            <p>No recommended movies found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default MovieInfoCollection;
