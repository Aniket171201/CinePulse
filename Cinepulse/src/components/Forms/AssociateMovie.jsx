// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../styles/ManagerDashboard.css"; // Import styles if necessary

// const AssociateMovie = () => {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovieName, setSelectedMovieName] = useState("");
//   const [selectedMovieId, setSelectedMovieId] = useState("");
//   const { id } = useParams(); // Get the cinema hall ID from the URL
//   const navigate = useNavigate();

//   // Fetch the list of movies when the component mounts
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/movies`);
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const handleSelectionChange = async (e) => {
//     const selectedName = e.target.value;
//     setSelectedMovieName(selectedName);

//     try {
//       // Fetch movie ID based on the selected movie name
//       const response = await axios.get(`http://localhost:8080/api/movies/${selectedName}`);
//       const movie = response.data[0]; // Assuming the response is an array of movies
//       if (movie) {
//         setSelectedMovieId(movie.movieId);
//       } else {
//         console.error("Movie not found");
//         setSelectedMovieId(""); // Reset movie ID if not found
//       }
//     } catch (error) {
//       console.error("Error fetching movie details:", error);
//       setSelectedMovieId(""); // Reset movie ID on error
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/cinemaHall/${id}/associateMovie/${selectedMovieId}`, {
//         cinemaHallId: id,
//         movieId: selectedMovieId,
//       });

//       if (response.status === 200) {
//         console.log(response.data.movie);
//         const res=response.data.movie;
//         console.log(response.data.movie.movieId);
//         console.log("adsdasdasdadqwwewqqw");
        
        
        
//         navigate('/manager-dashboard', {
//           state: { 
//             associatedMovie: {
//               name: response.data.movie.name, // movieName you selected in AssociateMovie
//               movieId:response.data.movie.movieId,
//               //releaseDate: movieReleaseDate, // corresponding release date
//               cinemaHallId: response.data.cinemaHall.cinemaHallId // ID of the cinema hall you associated the movie with
//             }
//           }
//         });
//       } else {
//         console.error("Failed to associate movie");
//       }
//     } catch (error) {
//       console.error("Error associating movie:", error);
//     }
//   };

//   return (
//     <div className="associate-movie">
//       <h2 className="text-center mb-4">Associate Movie</h2>
//       {movies.length === 0 ? (
//         <p>No movies available.</p>
//       ) : (
//         <div>
//           <div className="mb-3">
//             <label htmlFor="movieSelect" className="form-label">
//               Select a Movie
//             </label>
//             <select
//               id="movieSelect"
//               className="form-select"
//               value={selectedMovieName}
//               onChange={handleSelectionChange}
//               required
//             >
//               <option value="" disabled>Select a movie</option>
//               {movies.map((movie) => (
//                 <option key={movie.id} value={movie.name}>
//                   {movie.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="btn btn-primary w-100"
//             onClick={handleSubmit}
//             disabled={!selectedMovieName} // Disable the button if no movie is selected
//           >
//             Associate Movie
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssociateMovie;





import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, MenuItem, Select, FormControl, InputLabel, Button, Paper } from "@mui/material";
import "../../styles/ManagerDashboard.css"; // Import styles if necessary

const AssociateMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieName, setSelectedMovieName] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const { id } = useParams(); // Get the cinema hall ID from the URL
  const navigate = useNavigate();

  // Fetch the list of movies when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/movies`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSelectionChange = async (e) => {
    const selectedName = e.target.value;
    setSelectedMovieName(selectedName);

    try {
      // Fetch movie ID based on the selected movie name
      const response = await axios.get(`http://localhost:8080/api/movies/${selectedName}`);
      const movie = response.data[0]; // Assuming the response is an array of movies
      if (movie) {
        setSelectedMovieId(movie.movieId);
      } else {
        console.error("Movie not found");
        setSelectedMovieId(""); // Reset movie ID if not found
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setSelectedMovieId(""); // Reset movie ID on error
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/cinemaHall/${id}/associateMovie/${selectedMovieId}`, {
        cinemaHallId: id,
        movieId: selectedMovieId,
      });

      if (response.status === 200) {
        console.log(response.data.movie);
        navigate('/manager-dashboard', {
          state: { 
            associatedMovie: {
              name: response.data.movie.name, // movieName you selected in AssociateMovie
              movieId: response.data.movie.movieId,
              cinemaHallId: response.data.cinemaHall.cinemaHallId // ID of the cinema hall you associated the movie with
            }
          }
        });
      } else {
        console.error("Failed to associate movie");
      }
    } catch (error) {
      console.error("Error associating movie:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="p-4 mt-4">
        <Typography variant="h4" align="center" gutterBottom>
          Associate Movie
        </Typography>

        {movies.length === 0 ? (
          <Typography variant="body1" align="center">
            No movies available.
          </Typography>
        ) : (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="movieSelect-label">Select a Movie</InputLabel>
              <Select
                labelId="movieSelect-label"
                id="movieSelect"
                value={selectedMovieName}
                label="Select a Movie"
                onChange={handleSelectionChange}
                required
              >
                <MenuItem value="" disabled>Select a movie</MenuItem>
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.name}>
                    {movie.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={!selectedMovieName} // Disable the button if no movie is selected
            >
              Associate Movie
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AssociateMovie;
