import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId, showId } = location.state || {};

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const ticketPrices = {
    A: 180,
    B: 180,
    C: 220,
    D: 220,
    E: 320,
  };

  useEffect(() => {
    if (movieId) {
      // Fetch movie details
      console.log(showId);

      fetch(`http://localhost:8080/api/movies/getMovie/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMovie(data);
        })
        .catch((error) => console.error("Error fetching movie data:", error));
    }

    if (showId) {
      fetch(`http://localhost:8080/api/shows/${showId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setShow(data);
        })
        .catch((error) => console.error("Error fetching show data:", error));
    }
  }, [movieId, showId]);

  const handleSeatSelection = (seat) => {
    const row = seat[0];
    const price = ticketPrices[row];

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setTotalPrice(totalPrice - price);
      setError(""); // Clear error message
    } else if (selectedSeats.length < numberOfSeats) {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice(totalPrice + price);
      setError(""); // Clear error message
    } else {
      setError("Cannot select more seats than specified.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedSeats.length !== numberOfSeats) {
      setError("You must select the exact number of seats specified.");
      return;
    }

    // Send POST request to book seats
    fetch(`http://localhost:8080/api/shows/${showId}/bookSeats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSeats), // Send selected seats as an array of strings
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch("http://localhost:8080/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            showId,
            seats: selectedSeats.length,
            totalPrice,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            const bookingId = data.bookingId;

            navigate("/bookingsummary", {
              state: { selectedSeats: selectedSeats, bookingId: bookingId },
            });
          })
          .catch((error) => {
            console.error("Error booking seats:", error);
            setError("Error booking seats. Please try again.");
          });

        //const bookingId = data.bookingId;

        // // Navigate to the booking summary page with the booking ID and selected seats
        // navigate("/bookingsummary", {
        //   state: { selectedSeats: selectedSeats, bookingId: bookingId },
        // });
      })
      .catch((error) => {
        console.error("Error booking seats:", error);
        setError("Error booking seats. Please try again.");
      });
  };

  const seats = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="grid grid-cols-3 gap-8 w-full max-w-7xl p-4 bg-gray-800 rounded-lg">
        <div className="col-span-1 bg-gray-700 p-6 rounded-lg shadow-md">
          <img
            src={movie.thumbnail || movie.name}
            alt="Movie Poster"
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">
            {movie.name || "Movie Title"}
          </h2>
          <p className="text-gray-300 mb-2">
            Duration: {movie.duration || "2h 30m"}
          </p>
          <p className="text-gray-300 mb-4">
            Genre: {movie.genres || "Action, Adventure"}
          </p>
        </div>

        {/* Booking Form */}
        <div className="col-span-1 bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-white text-lg font-bold mb-4">Book Your Seats</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="numberOfSeats"
              >
                Number of Seats
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numberOfSeats"
                type="number"
                min="1"
                max="8"
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="selectedSeats"
              >
                Selected Seats
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="selectedSeats"
                type="text"
                value={selectedSeats.join(", ")}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="totalCost"
              >
                Total Cost
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="totalCost"
                type="number"
                value={totalPrice}
                readOnly
              />
            </div>
            <div className="error-message">{error && <p>{error}</p>}</div>
            <button
              className={`mybtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                error ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
              disabled={!!error}
            >
              Book Now
            </button>
          </form>
        </div>

        {/* Seat Map */}
        <div className="col-span-1 bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-white text-lg font-bold mb-4">Select Seats</h2>
          <div className="screen"></div>
          <div className="seat-map">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row mb-2">
                {row.map((seat) => (
                  <button
                    key={seat}
                    className={`seat ${
                      show.bookedSeats && show.bookedSeats.includes(seat)
                        ? "seat-booked"
                        : "seat-available"
                    } ${selectedSeats.includes(seat) ? "seat-selected" : ""}`}
                    onClick={() => handleSeatSelection(seat)}
                    disabled={
                      show.bookedSeats && show.bookedSeats.includes(seat)
                    } // Disable if seat is booked
                  >
                    {seat}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
