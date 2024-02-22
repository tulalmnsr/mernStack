import { useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, setShowDate } from "../../../reducers/cartSlice";

export const DateSelector = () => {
  const [loading, setLoading] = useState(false); 
  const { id: theatreId } = useSelector((store) => store.currentLocation);
  const { showtime_date: userDate } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const hardcodedDates = [
    "2024-02-22", // Example date 1
    "2024-02-23", // Example date 2
    "2024-02-24", // Example date 3
    // Add more dates as needed
  ];

  const checkedColor = (val) => {
    return {
      backgroundColor: val === userDate ? "#485BB3" : "",
      color: val === userDate ? "#e6e6e8" : "",
    };
  };

  const handleBookDate = (selectedDate) => {
    setLoading(true);
    // You can replace the URL with your backend endpoint for booking
    axios.post('/bookings', { selectedDate })
      .then(response => {
        // Handle success response
        console.log('Booking successful:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error booking:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const dateOptions = hardcodedDates.map((formattedDate, idx) => {
    const day = new Date(formattedDate).toLocaleString("en-us", {
      weekday: "short",
    });

    const month = new Date(formattedDate).toLocaleString("en-us", {
      month: "short",
    });

    const date = new Date(formattedDate).toLocaleString("en-us", {
      day: "numeric",
    });

    return (
      <div
        className="date-input-container"
        key={idx}
        style={checkedColor(formattedDate)}
      >
        <input
          type="radio"
          id={idx}
          name="Select Date"
          value={formattedDate}
          onChange={(e) => dispatch(setShowDate(e.target.value))}
          checked={formattedDate === userDate}
        />

        <label className="form-date-detail" htmlFor={idx}>
          <p className="form-day">{day}</p>
          <div className="form-date-month">
            <p className="form-date">{date}</p>
            <p className="form-month">{month}</p>
          </div>
        </label>
      </div>
    );
  });

  return (
    <div>
      <form>
        <div className="form-item-heading">Select Date</div>
        <div className="form-item-options">{dateOptions}</div>
        <button onClick={() => handleBookDate(userDate)}>Book Selected Date</button>
      </form>
      {loading && <HashLoader color="#845BB3" />}
    </div>
  );
};
