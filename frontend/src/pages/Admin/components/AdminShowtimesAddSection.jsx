import axios from "axios";
import { useEffect, useState } from "react";
import { adminErrorToast, adminShowtimeToast } from "../../../toasts/toast";

export const AdminShowtimesAddSection = ({
  selectedShowDate,
  setSelectedShowDate,
  handleSelectedDate,
}) => {
  const [lastShowDate, setLastShowDate] = useState("");
  const [adminShowtimeDropdown, setAdminShowtimeDropdown] = useState(false);
  const [bookingData, setBookingData] = useState({
    userId: "",
    movieId: "",
    showtime: "",
    seats: [],
    status: "",
    payment: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/lastShowDate`
        );
        setLastShowDate(response.data[0].lastDate);
      } catch (err) {
        console.error(err);
        adminErrorToast();
      }
    };

    fetchData();
  }, []);

  const toggleAdminShowtimesSection = () => {
    setAdminShowtimeDropdown((prevState) => !prevState);
  };

  const addBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData);
      adminShowtimeToast();
    } catch (err) {
      console.error(err);
      adminErrorToast();
    } finally {
      setSelectedShowDate("");
      setBookingData({
        userId: "",
        movieId: "",
        showtime: "",
        seats: [],
        status: "",
        payment: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  return (
    <section className="section-admin-showtimes container">
      <div className="form-heading-container">
        <h2 className="form-admin-heading">Add Booking</h2>
        <button
          className="btn-admin-arrow"
          onClick={toggleAdminShowtimesSection}
        >
          {!adminShowtimeDropdown ? (
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
      {adminShowtimeDropdown && (
        <form className="form-admin-showtime-add">
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={bookingData.userId}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="movieId">Movie ID:</label>
            <input
              type="text"
              id="movieId"
              name="movieId"
              value={bookingData.movieId}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="showtime">Showtime:</label>
            <input
              type="text"
              id="showtime"
              name="showtime"
              value={bookingData.showtime}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="seats">Seats:</label>
            <input
              type="text"
              id="seats"
              name="seats"
              value={bookingData.seats}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              name="status"
              value={bookingData.status}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="payment">Payment:</label>
            <input
              type="text"
              id="payment"
              name="payment"
              value={bookingData.payment}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn-admin"
            type="submit"
            onClick={(e) => {
              addBooking(e);
            }}
          >
            CONFIRM
          </button>
        </form>
      )}
    </section>
  );
};
