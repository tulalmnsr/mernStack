import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../reducers/cartSlice";
import BarLoader from "react-spinners/BarLoader";
import { purchaseCompletion, ticketPurchaseError } from "../../../toasts/toast";

const currentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const PurchaseSection = () => {
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { signedPerson } = useSelector((store) => store.authentication);
  const {
    payment_method: userPayMethod,
    showtime_date: userDate,
    movie_id: userMovieId,
    showtime_id: userShowtimeId,
    seat_id_list: userSeatList,
    hall_id: userHallId,
    seat_price: userSeatPrice,
  } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleTicketPurchase = async () => {
    try {
      setBtnDisabled(true);
      setLoading(true);
      let paymentID;

      const paymentResponse = await axios.post(
        "/payments",
        {
          amount: userSeatPrice * userSeatList.length,
          userPayMethod,
          email: signedPerson.email,
        }
      );

      paymentID = paymentResponse.data && paymentResponse.data[0].last_id;

      for (const seatId of userSeatList) {
        await axios.post("/tickets", {
          userId: signedPerson.id,
          movieId: userMovieId,
          showtime: userDate,
          seats: [seatId],
          status: "booked",
          payment: {
            method: userPayMethod,
            amount: userSeatPrice,
          },
          guestInfo: {
            name: signedPerson.name,
            email: signedPerson.email,
          },
        });
      }

      purchaseCompletion("Tickets purchased successfully");
      dispatch(resetCart());
    } catch (err) {
      console.error(err);
      ticketPurchaseError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBtnDisabled(userPayMethod.length === 0);
  }, [userPayMethod]);

  return (
    <section className="section-purchase">
      {/* Your JSX for the purchase section */}
      <button
        className={btnDisabled ? "ticket-btn-disabled" : "ticket-btn"}
        onClick={handleTicketPurchase}
        disabled={btnDisabled}
      >
        {loading ? <BarLoader color="#e6e6e8" /> : "Purchase Ticket"}
      </button>
    </section>
  );
};
