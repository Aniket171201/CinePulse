// import React, { useState, useEffect } from "react";
// import "../../styles/MovieCard.css";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const Type = () => {
//   const { type } = useParams(); // Get the type from the URL parameter
//   const navigate = useNavigate();
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [allMovies, setAllMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/movies", {
//           params: { type: type.toUpperCase() }, // Convert type to uppercase to match enum values
//         });
//         setAllMovies(response.data);
//         // Filter movies based on the type parameter
//         const typeMovies = response.data.filter(
//           (movie) => movie.type === type.toUpperCase()
//         );
//         setFilteredMovies(typeMovies);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, [type]);

//   const handleClick = (movie) => {
//     navigate("/moviesdesc", { state: { movie } });
//   };

//   return (
//     <>
//       <br />
//       <div className="Maindiv row row-cols-1 row-cols-md-3 g-4">
//         {filteredMovies.map((movie) => (
//           <div
//             className="Mycard col"
//             key={movie.id} // Use a unique identifier from the movie object
//             onClick={() => handleClick(movie)}
//           >
//             <div className="card h-100">
//               <img
//                 src={movie.image}
//                 className="card-img-top"
//                 alt={movie.title}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{movie.title}</h5>
//                 <p className="card-text">{movie.description}</p>
//               </div>
//               <div className="card-footer">
//                 <small className="text-body-secondary">
//                   {movie.lastUpdated}
//                 </small>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Type;

import React, { useState, useEffect } from "react";
import "../../styles/MovieCard.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Type = () => {
  // const { type } = useParams(); // Get the type from the URL parameter
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAll, setShowAll] = useState({});
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/movies", {
  //         params: { type: type.toUpperCase() }, // Convert type to uppercase to match enum values
  //       });
  //       setFilteredMovies(response.data);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   };
  //   fetchMovies();
  // }, [type]);
  useEffect(() => {
    console.log("home called");

    // Fetch data from the backend API
    fetch("http://localhost:8080/api/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Group movies by type
        const groupedMovies = data.reduce((acc, movie) => {
          acc[movie.type] = acc[movie.type] || [];
          acc[movie.type].push(movie);
          return acc;
        }, {});

        setMovies(groupedMovies);
        setFilteredMovies(groupedMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleClick = (movie) => {
    navigate("/moviesdesc", { state: { movieName: mName } });
  };

  return (
    <>
      <br />
      <div className="Maindiv row row-cols-1 row-cols-md-3 g-4">
        {filteredMovies.map((movie) => (
          <div
            className="Mycard col"
            key={movie.id} // Use a unique identifier from the movie object
            onClick={() => handleClick(movie)}
          >
            <div className="card h-100">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  {movie.lastUpdated}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Type;
