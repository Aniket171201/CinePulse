import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/MovieCard.css";

const PlayCard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events of type "EVENTS" from the backend API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/movies", {
          params: { type: "PLAYS" },
        });

        // Filter the data to only include events with type "EVENTS"
        const eventOfType = response.data.filter(
          (movie) => movie.type === "PLAYS"
        );

        setEvents(eventOfType);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleClick = (event) => {
    let eventName = event.name;
    navigate("/moviesdesc", { state: { movieName: eventName } });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <div className="Maindiv row row-cols-1 row-cols-md-3 g-4">
        {events.map((event) => (
          <div
            className="Mycard col"
            key={event.id} // Use a unique identifier from the event object
            onClick={() => handleClick(event)}
          >
            <div className="myhdiv card h-100">
              <img
                src={event.thumbnail}
                className="card-img-top"
                alt={event.name}
              />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.genres}</p>
              </div>
              <div className="card-footer">
                <FaHeart className="text-danger text-secondary me-2" />
                <small className="text-body-secondary">
                  {event.rating ? event.rating.toFixed(1) : "No rating"}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayCard;
