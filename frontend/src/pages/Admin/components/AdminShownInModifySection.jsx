import axios from "axios";
import { useEffect, useState } from "react";
import { adminErrorToast, adminShowninToast } from "../../../toasts/toast";

export const AdminUpdateBookingSection = ({ selectedDate }) => {
  const [bookingData, setBookingData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [updatedBookingDetails, setUpdatedBookingDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/admin/panel/new-bookings`, 
          {
            params: {
              selectedDate,
            },
          }
        );
        setBookingData(response.data);
      } catch (err) {
        console.error(err);
        adminErrorToast();
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleSelectedBooking = (e) => {
    setSelectedBooking(e.target.value);
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/bookings/${selectedBooking}`, // Update the route to update booking
        {
          // Assuming updatedBookingDetails is an object containing updated details
          updatedDetails: updatedBookingDetails,
        }
      );

      if (res.status === 200) adminShowninToast();
      console.log(res);
    } catch (err) {
      console.log(err);
      adminErrorToast();
    } finally {
      // Additional cleanup or UI updates can be added here
    }
  };

  const bookingOptionsHtml = bookingData.map((booking, i) => (
    <option key={i} value={booking.bookingId}>
      {booking.bookingDetails}
    </option>
  ));

  return (
    <section className="section-admin-booking-update">
      <div className="container">
        <h2 className="form-admin-heading">Update Booking</h2>
        <form className="form-admin-booking-update">
          <div className="form-group">
            <label htmlFor="booking-select">Select Booking:</label>
            <select
              id="booking-select"
              className="form-control"
              onChange={handleSelectedBooking}
              value={selectedBooking}
            >
              <option value="">Select a booking</option>
              {bookingOptionsHtml}
            </select>
          </div>
          {selectedBooking && (
            <div className="form-group">
              <label htmlFor="updated-details">Updated Details:</label>
              <input
                type="text"
                id="updated-details"
                className="form-control"
                value={updatedBookingDetails}
                onChange={(e) => setUpdatedBookingDetails(e.target.value)}
              />
            </div>
          )}
          {selectedBooking && (
            <button
              className="btn-admin"
              type="submit"
              onClick={handleUpdateBooking}
            >
              UPDATE
            </button>
          )}
        </form>
      </div>
    </section>
  );
};
