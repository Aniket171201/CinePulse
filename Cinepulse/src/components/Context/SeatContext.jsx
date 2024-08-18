import React, { createContext, useState, useContext } from "react";

export const SeatContext = createContext();

export const SeatProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  // New state for booking details
  const [bookingDetails, setBookingDetails] = useState({
    day: "",
    weekday: "",
    title: "",
    time: "",
    format: "",
  });

  return (
    <SeatContext.Provider
      value={{
        selectedSeats,
        setSelectedSeats,
        numberOfSeats,
        setNumberOfSeats,
        totalCost,
        setTotalCost,
        bookingDetails,
        setBookingDetails, // Include setter function
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
