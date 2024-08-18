// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../styles/MovieDesc.css";
// import { Rating } from "@mui/material";
// import MovieReviewComponent from "./MovieReviewComponent";

// const MovieDesc = () => {
//   const location = useLocation();
//   const { movieName } = location.state || {}; // Destructure movieId from state
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reviewCount, setReviewCount] = useState(0);

//   useEffect(() => {
//     // Fetch movie details from the backend
//     const fetchMovie = async () => {
//       if (!movieName) {
//         setError("No movie ID provided.");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.log("Fetching movie details for ID:", movieName);
//         const response = await axios.get(
//           `http://localhost:8080/api/movies/${movieName}`
//         );

//         if (response.data) {
//           setMovie(response.data);
//         } else {
//           setError("Movie details not found.");
//         }
//       } catch (err) {
//         setError("Failed to fetch movie details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovie();
//   }, [movieName]);

//   const updateReviewCount = (count) => {
//     setReviewCount(count);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!movie) return <div>No movie selected</div>;

//   return (
//     <>
//       <div
//         className="movie-container"
//         style={{
//           backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%,
//         rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%,
//         rgb(26, 26, 26) 100%),
//         url(${movie[0].backgroundImage})`,
//         }}
//       >
//         <div className="row">
//           <div className="col-md-4">
//             <img
//               src={movie[0].thumbnail}
//               alt={movie[0].name}
//               className="img-fluid rounded movie-img"
//             />
//           </div>
//           <div className="col-md-8">
//             <div className="d-flex align-items-center">
//               <div className="d-flex align-items-center">
//                 <h1 className="mb-2 ms-0">{movie[0].name}</h1>
//               </div>
//               <Rating
//                 className="myrat"
//                 name="read-only"
//                 value={movie.rating}
//                 readOnly
//               />
//               {/* <Rating name="read-only" value={value} readOnly /> */}
//               &nbsp;&nbsp;
//               <h5 className="rath5">({reviewCount})</h5>
//             </div>
//             <div className="mt-3">
//               <div className="d-flex flex-wrap"></div>
//               <div className="mt-2">
//                 <h6 className="mb-3">{movie[0].certificate}</h6>
//                 <h6 className="mb-3">{movie[0].formats}</h6>
//                 <h6 className="mb-3">{movie[0].genres}</h6>
//                 <h6 className="mb-3">{movie[0].languages}</h6>
//                 <h6 className="mb-0">{movie[0].releaseDate}</h6>
//               </div>
//               <div className="mt-3">
//                 <br />
//                 <button
//                   className="btn btn-danger"
//                   onClick={() =>
//                     navigate("/todayshow", {
//                       state: { movieId: movie[0].movieId },
//                     })
//                   }
//                 >
//                   Book tickets
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <h3 className="myabout">About the movie</h3>
//       <p className="myabout">{movie[0].description}</p>
//       <br />
//       <hr />
//       <MovieReviewComponent
//         movieId={movie[0].movieId}
//         updateReviewCount={updateReviewCount}
//       />
//     </>
//   );
// };

// export default MovieDesc;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/MovieDesc.css";
import { Rating } from "@mui/material";
import MovieReviewComponent from "./MovieReviewComponent";

const MovieDesc = () => {
  const location = useLocation();
  const { movieName } = location.state || {};
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieName) {
        setError("No movie name provided.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching movie details for name:", movieName);
        const response = await axios.get(
          `http://localhost:8080/api/movies/${movieName}`
        );

        if (response.data) {
          // console.log(response.data[0].rating);
          setMovie(response.data);
        } else {
          setError("Movie details not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieName]);

  const updateReviewCount = (count) => {
    setReviewCount(count);
  };

  const formatFormats = (formats) => {
    if (!formats) return "";
    return formats
      .replace("_2D", "2D")
      .replace("_3D", "3D")
      .replace("_4DX_3D", "4DX_3D");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie selected</div>;

  // Ensure rating is a number between 0 and 5
  const movieRating = movie.rating ? Math.min(Math.max(movie.rating, 0), 5) : 0;

  return (
    <>
      <div
        className="movie-container"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%,
            rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%,
            rgb(26, 26, 26) 100%),
            url(${movie[0].backgroundImage})`,
        }}
      >
        <div className="row">
          <div className="col-md-4">
            <img
              src={movie[0].thumbnail}
              alt={movie[0].name}
              className="img-fluid rounded movie-img"
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <h1 className="mb-2 ms-0">{movie[0].name}</h1>
              </div>
              <Rating
                className="myrat"
                name="read-only"
                value={movie[0].rating} // Display the rating
                readOnly
              />
            </div>
            <div className="mt-3">
              <div className="d-flex flex-wrap"></div>
              <div className="mt-2">
                <h6 className="mb-3">{movie[0].certificate}</h6>
                <h6 className="mb-3">{formatFormats(movie[0].formats)}</h6>
                <h6 className="mb-3">{movie[0].genres}</h6>
                <h6 className="mb-3">{movie[0].languages}</h6>
                <h6 className="mb-0">{movie[0].releaseDate}</h6>
              </div>
              <div className="mt-3">
                <br />
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    navigate("/todayshow", {
                      state: { movieId: movie[0].movieId },
                    })
                  }
                >
                  Book tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="myabout">About the movie</h3>
      <p className="myabout">{movie[0].description}</p>
      <br />
      <hr />
      <MovieReviewComponent
        movieId={movie[0].movieId}
        updateReviewCount={updateReviewCount}
      />
    </>
  );
};

export default MovieDesc;
