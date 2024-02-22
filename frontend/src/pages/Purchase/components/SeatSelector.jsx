import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { setSeat } from "../../../reducers/cartSlice";

export const SeatSelector = ({ setSeatsData }) => {
  const override = {
    display: "block",
    margin: "1.6rem auto",
  };

  const [loading, setLoading] = useState(false);
  const { movie_id: userMovieId, showtime_id: userShowtimeId, seat_id_list: userSeatList } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/bookings/seats`, // Adjust the route according to your backend API
          { userShowtimeId, userMovieId }
        );
        setSeatsData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSeats();
  }, [userShowtimeId, userMovieId, setSeatsData]);

  const handleSeatClick = (seatId) => {
    dispatch(setSeat(seatId));
  };

  return (
    <div>
      <div className="form-item-heading">Select Seat</div>
      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      {!loading && (
        <>
          <div className="seat-guide-container">
            <div className="seat-available-demo"></div>
            <p className="seat-status-details">Available</p>
            <div className="seat-booked-demo"></div>
            <p className="seat-status-details">Booked</p>
            <div className="seat-selected-demo"></div>
            <p className="seat-status-details">Selected</p>
          </div>
          <div className="theatre-screen">
            <div className="screen-1"></div>
            <div className="screen-2"></div>
          </div>
          <div className="theatre-screen-heading">Theatre Screen</div>
          <div className="seat-container">
            {seatsData.map((seat) => (
              <div
                className={`seat ${seat.booked_status === "booked" ? "booked" : "available"}`}
                onClick={() => seat.booked_status !== "booked" && handleSeatClick(seat._id)}
                key={seat._id}
              >
                {seat.seat_name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
