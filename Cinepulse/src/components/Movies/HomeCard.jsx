// import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "../../styles/MovieCard.css";

// const HomeCard = () => {
//   const navigate = useNavigate();
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [showAll, setShowAll] = useState({});
//   // const [name, setName] = useState("");

//   useEffect(() => {
//     console.log("home called");

    
//     // Fetch data from the backend API
//     fetch("http://localhost:8080/api/movies")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);

//         // Group movies by type
//         const groupedMovies = data.reduce((acc, movie) => {
//           acc[movie.type] = acc[movie.type] || [];
//           acc[movie.type].push(movie);
//           return acc;
//         }, {});

//         setMovies(groupedMovies);
//         setFilteredMovies(groupedMovies);
//       })
//       .catch((error) => console.error("Error fetching movies:", error));
//   }, []);

//   const handleClick = (movie) => {
//     let mName = movie.name;
//     console.log(mName);

//     navigate("/moviesdesc", { state: { movieName: mName } });
//   };

//   const handleShowAllClick = (type) => {
//     setShowAll((prevShowAll) => ({
//       ...prevShowAll,
//       [type]: true,
//     }));
//   };

//   const renderSection = (type) => {
//     const sectionMovies = filteredMovies[type] || [];
//     const displayedMovies = showAll[type]
//       ? sectionMovies
//       : sectionMovies.slice(0, 5);

//     const subtitle = sectionMovies[0]?.subtitle || type;

//     return (
//       <div className="hmaindiv" key={type}>
//         <br />
//         <div className="d-flex justify-content-between align-items-center Maindiv">
//           <h3
//             className="myh3H mb-0"
//             onClick={() => navigate(`/${type.toLowerCase()}`)}
//           >
//             {subtitle}
//           </h3>
//           <button
//             className="learn-more mybtns "
//             onClick={() => navigate(`/${type.toLowerCase()}`)}
//           >
//             <span className="circle" aria-hidden="true">
//               <span className="icon arrow"></span>
//             </span>
//             <span className="button-text">Show All</span>
//           </button>
//         </div>
//         <br />
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {displayedMovies.map((movie, index) => (
//             <div
//               className="Mycard col"
//               key={index}
//               onClick={() => handleClick(movie)}
//             >
//               <div className="myhdiv card h-100">
//                 <img
//                   src={movie.thumbnail}
//                   className="card-img-top"
//                   alt={movie.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.name}</h5>
//                   <p className="card-text">{movie.genres}</p>
//                 </div>
//                 <div className="card-footer">
//                   <FaHeart className="text-danger text-secondary me-2" />
//                   <small className="text-body-secondary">{movie.rating}</small>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <br />
//       </div>
//     );
//   };

//   return <>{Object.keys(filteredMovies).map((type) => renderSection(type))}</>;
// };

// export default HomeCard;


import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/MovieCard.css";

const HomeCard = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAll, setShowAll] = useState({});

  useEffect(() => {
    // Fetch data from the backend API
    fetch("http://localhost:8080/api/movies")
      .then((response) => response.json())
      .then((data) => {
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

  useEffect(() => {
    if (searchQuery) {
      const newFilteredMovies = {};
      Object.keys(movies).forEach((type) => {
        newFilteredMovies[type] = movies[type].filter((movie) =>
          movie.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredMovies(newFilteredMovies);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  const handleClick = (movie) => {
    let mName = movie.name;
    navigate("/moviesdesc", { state: { movieName: mName } });
  };

  const handleShowAllClick = (type) => {
    setShowAll((prevShowAll) => ({
      ...prevShowAll,
      [type]: true,
    }));
  };

  const renderSection = (type) => {
    const sectionMovies = filteredMovies[type] || [];
    const displayedMovies = showAll[type]
      ? sectionMovies
      : sectionMovies.slice(0, 5);

    const subtitle = sectionMovies[0]?.subtitle || type;

    return (
      <div className="hmaindiv" key={type}>
        <br />
        <div className="d-flex justify-content-between align-items-center Maindiv">
          <h3
            className="myh3H mb-0"
            onClick={() => navigate(`/${type.toLowerCase()}`)}
          >
            {subtitle}
          </h3>
          <button
            className="learn-more mybtns "
            onClick={() => navigate(`/${type.toLowerCase()}`)}
          >
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Show All</span>
          </button>
        </div>
        <br />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {displayedMovies.map((movie, index) => (
            <div
              className="Mycard col"
              key={index}
              onClick={() => handleClick(movie)}
            >
              <div className="myhdiv card h-100">
                <img
                  src={movie.thumbnail}
                  className="card-img-top"
                  alt={movie.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.name}</h5>
                  <p className="card-text">{movie.genres}</p>
                </div>
                <div className="card-footer">
                  <FaHeart className="text-danger text-secondary me-2" />
                  <small className="text-body-secondary">
                  {movie.rating ? movie.rating.toFixed(1) : "No rating"}
                </small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>
    );
  };

  return <>{Object.keys(filteredMovies).map((type) => renderSection(type))}</>;
};

export default HomeCard;
