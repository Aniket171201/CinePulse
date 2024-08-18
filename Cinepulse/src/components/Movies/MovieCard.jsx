import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/MovieCard.css";
import MovieFilter from "./MovieFilter";

const MovieCard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log("called");

      try {
        const response = await axios.get("http://localhost:8080/api/movies", {
          params: { type: "MOVIES" },
        });
        console.log(response);

        const moviesOfType = response.data.filter(
          (movie) => movie.type === "MOVIES"
        );

        setMovies(moviesOfType);
        setFilteredMovies(moviesOfType);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleFilter = (filterType, value) => {
    let filtered = movies;

    if (filterType === "language" && value !== "All") {
      filtered = filtered.filter((movie) =>
        movie.languages.includes(value.toUpperCase())
      );
    }

    if (filterType === "genre" && value !== "All") {
      filtered = filtered.filter((movie) =>
        movie.genres.includes(value.toUpperCase())
      );
    }

    if (filterType === "format" && value !== "All") {
      filtered = filtered.filter((movie) =>
        movie.formats.includes(value.toUpperCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleSearch = (searchInput) => {
    const searchResult = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredMovies(searchResult);
  };

  const handleClick = (movie) => {
    let mName = movie.name;
    console.log(mName);

    navigate("/moviesdesc", { state: { movieName: mName } });
  };

  return (
    <>
      <MovieFilter onFilter={handleFilter} />
      <br />
      <div className="Maindiv row row-cols-1 row-cols-md-3 g-4">
        {filteredMovies.map((movie) => (
          <div
            className="Mycard col"
            key={movie.id} // Use a unique identifier from the movie object
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
                <p className="card-text">
                  {Array.isArray(movie.genres)
                    ? movie.genres.join(", ")
                    : movie.genres}
                </p>
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
    </>
  );
};

export default MovieCard;
