// import React, { useRef, useContext } from "react";
// import { useReactToPrint } from "react-to-print";
// import { SeatContext } from "../Context/SeatContext";
// import "../../styles/BookingSummary.css";

// const BookingSummary = () => {
//   const { selectedSeats, numberOfSeats, totalCost, bookingDetails } =
//     useContext(SeatContext);
//   const componentRef = useRef();

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: "Booking Summary",
//   });

//   return (
//     <div className="Booking-container container" ref={componentRef}>
//       <div className="heading text-center">
//         <h2>Booking Summary</h2>
//       </div>

//       <div className="head-details">
//         <h4 className="text-center">{bookingDetails.title || "Movie Title"}</h4>
//         <p className="text-center">
//           {bookingDetails.day || "N/A"} <br />
//           {bookingDetails.weekday || "N/A"} <br />
//           {bookingDetails.time || "N/A"}
//         </p>
//       </div>

//       <div className="details mb-3">
//         <strong>Seats:</strong> {selectedSeats.join(", ")}
//         <br />
//         <strong>Seats:</strong> {selectedSeats.join(", ")}
//         <br />
//         <strong>Seats:</strong> {selectedSeats.join(", ")}
//         <br />
//         <strong>Tickets:</strong> {numberOfSeats}
//         <br />
//         <br />
//         <div className="total-amount p-2 my-3">
//           <strong>Total Amount:</strong> Rs. {totalCost}
//         </div>
//       </div>

//       <div className="thankyou text-center">Thank You!</div>
//       <div className="proceed-button text-center">
//         <button className="btn btn-primary no-print" onClick={handlePrint}>
//           Proceed
//         </button>
//       </div>
//       <img src="src/IMG/Footer.png" alt="Footer" className="footer-img" />
//     </div>
//   );
// };

// export default BookingSummary;

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "../../styles/BookingSummary.css";

const BookingSummary = () => {
  const location = useLocation();
  const { selectedSeats, bookingId } = location.state || {};
  const [booking, setBooking] = useState({});
  const [show, setShow] = useState({});
  const [movie, setMovie] = useState({});
  const [cinemaHall, setCinemaHall] = useState({});
  const componentRef = useRef();

  useEffect(() => {
    // Fetch booking details using bookingId
    fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((bookingData) => {
        setBooking(bookingData);
        const { showId } = bookingData;

        // Fetch show details using showId
        return fetch(`http://localhost:8080/api/shows/${showId}`, {
          method: "GET",
        });
      })
      .then((response) => response.json())
      .then((showData) => {
        setShow(showData);
        const { movieId, cinemaHallId } = showData;

        // Fetch movie details using movieId
        const movieRequest = fetch(
          `http://localhost:8080/api/movies/getMovie/${movieId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movieId }),
          }
        );

        // Fetch cinema hall details using cinemaHallId
        const cinemaHallRequest = fetch(
          `http://localhost:8080/cinemaHall/${cinemaHallId}`,
          {
            method: "GET",
          }
        );

        // Return a promise that resolves when both requests are done
        return Promise.all([movieRequest, cinemaHallRequest]);
      })
      .then(async ([movieResponse, cinemaHallResponse]) => {
        const movieData = await movieResponse.json();
        console.log("movie data   ---  " + movieData);

        const cinemaHallData = await cinemaHallResponse.json();
        console.log("cinema data   ---  " + cinemaHallData);
        setMovie(movieData);
        setCinemaHall(cinemaHallData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [bookingId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Booking Summary",
  });

  if (!booking || !show || !movie || !cinemaHall) {
    return <div className="text-center mt-5">Loading booking summary...</div>;
  }

  return (
    <div className="Booking-container container" ref={componentRef}>
      <div className="heading text-center">
        <h2>Booking Summary</h2>
      </div>

      <div className="head-details">
        <h4 className="text-center">{movie.name}</h4>
        <p className="text-center">
          {cinemaHall.name} <br />
          {cinemaHall.location} <br />
          {new Date(show.showTime).toLocaleDateString()} <br />
          {new Date(show.showTime).toLocaleTimeString()}
        </p>
      </div>

      <div className="details mb-3">
        <strong>Seats:</strong> {selectedSeats.join(", ")}
      </div>

      <div className="details mb-3">
        <strong>Tickets:</strong> {selectedSeats.length} <br />
        <strong>Ticket Price:</strong> Rs. {booking.totalPrice} <br />
        <div className="total-amount p-2 my-3">
          <strong>Total Amount:</strong> Rs.{" "}
          {booking.totalPrice + (booking.convenienceFee || 0)}
        </div>
      </div>

      <div className="thankyou text-center">Thank You!</div>
      <div className="proceed-button text-center">
        <button className="btn btn-primary no-print" onClick={handlePrint}>
          Proceed
        </button>
      </div>
      <img src="src/IMG/Footer.png" alt="Footer" className="footer-img" />
    </div>
  );
};

export default BookingSummary;
