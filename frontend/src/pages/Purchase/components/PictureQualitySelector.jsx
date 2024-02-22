import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch } from "react-redux";
import { setShowDetail } from "../../../reducers/cartSlice";

export const PictureQualitySelector = ({ setHallData }) => {
  const override = {
    display: "block",
    margin: "1.6rem auto",
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/cinemas');
        setCinemas(response.data);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const checkedColor = (cinemaId) => {
  const isSelected = cinemaId === selectedCinemaId;
  
    return {
      backgroundColor: isSelected ? "#485BB3" : "", 
      border: isSelected ? "2px solid #485BB6" : "", 
    };
  };
  
  const handleSelectCinema = (cinemaId) => {
    setSelectedCinemaId(cinemaId); 
  };

  const cinemaOptions = cinemas.map((cinema) => (
    <div
      className="cinema-option"
      key={cinema._id}
      onClick={() => handleSelectCinema(cinema._id)}
      style={checkedColor(cinema._id)}
    >
      <h3>{cinema.name}</h3>
      <p>{cinema.location}</p>
      <p>{cinema.contact}</p>
    </div>
  ));

  return (
    <div>
      <form>
        <div className="form-item-heading">Select Cinema</div>
        {loading && <HashLoader cssOverride={override} color="#485BB3" />}
        {!loading && (
          <div className="cinema-container">{cinemaOptions}</div>
        )}
      </form>
    </div>
  );
};
