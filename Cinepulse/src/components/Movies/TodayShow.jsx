// import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import todayShowData from "../JsonFiles/todayShowData.json";

// const TodayShow = () => {
//   const location = useLocation();
//   const { movieId } = location.state || {}; // Get movieId from the previous component
//   const [selectedDate, setSelectedDate] = useState("15 AUG");
//   const [dates, setDates] = useState([]);
//   const [cinemaHalls, setCinemaHalls] = useState([]);
//   const [shows, setShows] = useState({}); // Stores shows for each cinema hall
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     setDates(todayShowData.dates);

//     const selectedCity = sessionStorage.getItem("selectedCity");

//     if (movieId && selectedCity) {
//       // Fetch cinema halls
//       fetch("http://localhost:8080/cinemaHall/findByMovieAndLocation", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           movieId: movieId,
//           location: selectedCity,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setCinemaHalls(data);

//           // Fetch movie details
//           fetch(`http://localhost:8080/api/movies/getMovie/${movieId}`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               movieId: movieId,
//             }),
//           })
//             .then(response => response.json())
//             .then((data) => {
//               setMovie(data);
//             })
//             .catch(error => console.error("Error fetching movie data:", error));

//           // Fetch shows for each cinema hall
//           data.forEach(hall => {
//             fetch(`http://localhost:8080/api/shows/cinema-hall/${hall.id}`, {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             })
//               .then(response => response.json())
//               .then((showData) => {
//                 setShows(prevShows => ({
//                   ...prevShows,
//                   [hall.id]: showData,
//                 }));
//               })
//               .catch(error => console.error("Error fetching show data:", error));
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching cinema hall data:", error);
//         });
//     }
//   }, [movieId]);

//   // Function to format ISO time string to 12-hour time format
//   const formatTime = (isoTime) => {
//     const date = new Date(isoTime);
//     let hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${hours}:${strMinutes} ${ampm}`;
//   };

//   // Function to get date in the format of '15 AUG'
//   const getDateString = (date) => {
//     const options = { day: '2-digit', month: 'short' };
//     return new Date(date).toLocaleDateString('en-GB', options).toUpperCase();
//   };

//   // Filter shows based on the selected date
//   const filteredShows = (hall) => {
//     const showsForHall = shows[hall.id] || [];
//     return showsForHall.filter(show => getDateString(show.showTime) === selectedDate);
//   };

//   return (
//     <div className="container">
//       <div className="my-4">
//         <h1 className="h4">{movie.name}</h1>
//         <div className="d-flex align-items-center">
//           <span className="badge bg-secondary me-2">{movie.certificate}</span>
//           <span className="badge bg-light text-dark me-2">{movie.genres}</span>
//           <span className="badge bg-light text-dark">{movie.formats}</span>
//         </div>
//       </div>

//       <div className="btn-group mb-3">
//         {dates.map((date) => (
//           <button
//             key={date.day}
//             className={`btn btn-outline-primary ${
//               selectedDate === date.day ? "active" : ""
//             }`}
//             onClick={() => setSelectedDate(date.day)}
//           >
//             <div className="d-block">{date.weekday}</div>
//             <div className="fw-bold">{date.day}</div>
//           </button>
//         ))}
//       </div>

//       <div className="card mb-3">
//         {cinemaHalls.map((hall) => (
//           <div key={hall.id} className="card-body">
//             <div className="d-flex align-items-center mb-2">
//               <FaHeart className="text-secondary me-2" />
//               <h5 className="card-title mb-0">{hall.name} : {hall.location}</h5>
//             </div>
//             <p className="card-text">
//               <span className="text-warning ms-3">Non-cancellable</span>
//             </p>
//             <div className="d-flex flex-wrap">
//               {filteredShows(hall).map((show, index) => (
//                 <button
//                   key={index}
//                   className="btn btn-outline-secondary me-2 mb-2"
//                   onClick={() => navigate("/booking", { state: { movieId, showId: show.showId } })}
//                 >
//                   <div className="text-success">{formatTime(show.showTime)}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodayShow;

import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const TodayShow = () => {
  const location = useLocation();
  const { movieId } = location.state || {}; // Get movieId from the previous component
  const [selectedDate, setSelectedDate] = useState(""); // Initialize with an empty string
  const [dates, setDates] = useState([]);
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [shows, setShows] = useState({}); // Stores shows for each cinema hall
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // Generate dates for today and the next 5 days
    const generateDates = () => {
      const tempDates = [];
      const today = new Date();

      for (let i = 0; i < 6; i++) {
        const currentDay = new Date(today);
        currentDay.setDate(today.getDate() + i);

        const day = currentDay.getDate();
        const weekday = currentDay.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const month = currentDay
          .toLocaleDateString("en-US", { month: "short" })
          .toUpperCase();

        tempDates.push({ day: `${day} ${month}`, weekday });
      }

      setDates(tempDates);
      setSelectedDate(tempDates[0].day); // Optionally set the first date as the default selected date
    };

    generateDates();

    const selectedCity = sessionStorage.getItem("selectedCity");

    if (movieId && selectedCity) {
      // Fetch cinema halls
      fetch("http://localhost:8080/cinemaHall/findByMovieAndLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movieId,
          location: selectedCity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCinemaHalls(data);

          // Fetch movie details
          fetch(`http://localhost:8080/api/movies/getMovie/${movieId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movieId: movieId,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setMovie(data);
            })
            .catch((error) =>
              console.error("Error fetching movie data:", error)
            );

          // Fetch shows for each cinema hall
          data.forEach((hall) => {
            fetch(`http://localhost:8080/api/shows/cinema-hall/${hall.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((showData) => {
                setShows((prevShows) => ({
                  ...prevShows,
                  [hall.id]: showData,
                }));
              })
              .catch((error) =>
                console.error("Error fetching show data:", error)
              );
          });
        })
        .catch((error) => {
          console.error("Error fetching cinema hall data:", error);
        });
    }
  }, [movieId]);

  // Function to format ISO time string to 12-hour time format
  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  // Function to get date in the format of '15 AUG'
  const getDateString = (date) => {
    const options = { day: "2-digit", month: "short" };
    return new Date(date).toLocaleDateString("en-GB", options).toUpperCase();
  };

  // Filter shows based on the selected date
  const filteredShows = (hall) => {
    const showsForHall = shows[hall.id] || [];
    return showsForHall.filter(
      (show) => getDateString(show.showTime) === selectedDate
    );
  };

  return (
    <div className="container">
      <div className="my-4">
        <h1 className="h4">{movie.name}</h1>
        <div className="d-flex align-items-center">
          <span className="badge bg-secondary me-2">{movie.certificate}</span>
          <span className="badge bg-light text-dark me-2">{movie.genres}</span>
          <span className="badge bg-light text-dark">{movie.formats}</span>
        </div>
      </div>

      <div className="btn-group mb-3">
        {dates.map((date) => (
          <button
            key={date.day}
            className={`btn btn-outline-primary ${
              selectedDate === date.day ? "active" : ""
            }`}
            onClick={() => setSelectedDate(date.day)}
          >
            <div className="d-block">{date.weekday}</div>
            <div className="fw-bold">{date.day}</div>
          </button>
        ))}
      </div>

      <div className="card mb-3">
        {cinemaHalls.map((hall) => (
          <div key={hall.id} className="card-body">
            <div className="d-flex align-items-center mb-2">
              <FaHeart className="text-secondary me-2" />
              <h5 className="card-title mb-0">
                {hall.name} : {hall.location}
              </h5>
            </div>
            <p className="card-text">
              <span className="text-warning ms-3">Non-cancellable</span>
            </p>
            <div className="d-flex flex-wrap">
              {filteredShows(hall).map((show, index) => (
                <button
                  key={index}
                  className="btn btn-outline-secondary me-2 mb-2"
                  onClick={() =>
                    navigate("/booking", {
                      state: { movieId, showId: show.showId },
                    })
                  }
                >
                  <div className="text-success">
                    {formatTime(show.showTime)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayShow;
