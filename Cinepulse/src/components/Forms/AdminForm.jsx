import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AdminForm.css";

const AdminForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    languages: "",
    formats: "",
    type: "",
    genres: "",
    certificate: "",
    releaseDate: "",
    backgroundImage: "",
    thumbnail: "",
  });

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load movie list from session storage on component mount
  useEffect(() => {
    const storedMovies = sessionStorage.getItem("movies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  // Check if there's an updated movie passed via navigation state and populate form fields
  useEffect(() => {
    if (location.state?.updatedMovie) {
      const updatedMovie = location.state.updatedMovie;
      setFormData(updatedMovie); // Populate form fields with updated movie data
    }
  }, [location.state]);

  // Save movie list to session storage whenever `movies` is updated
  useEffect(() => {
    if (movies.length) {
      sessionStorage.setItem("movies", JSON.stringify(movies));
    }
  }, [movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.releaseDate ||
      !formData.backgroundImage ||
      !formData.thumbnail ||
      !formData.languages ||
      !formData.formats ||
      !formData.type ||
      !formData.certificate ||
      !formData.genres
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const parsedFormData = {
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:8080/api/movies/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedFormData),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setMovies((prevMovies) => [...prevMovies, newMovie]);
        setFormData({
          name: "",
          description: "",
          languages: "",
          formats: "",
          type: "",
          genres: "",
          certificate: "",
          releaseDate: "",
          backgroundImage: "",
          thumbnail: "",
        });
        alert("Movie added successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to add movie: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while adding the movie.");
      console.error("Error:", error);
    }
  };

  const handleUpdate = (movie) => {
    navigate(`/update-movie/${movie.movieId}`, {
      state: { updatedMovie: movie },
    });
  };

  const handleDelete = async (movieId) => {
    if (movieId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/movies/${movieId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Movie deleted successfully!");
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie.movieId !== movieId)
          );
        } else {
          const errorData = await response.json();
          alert(`Failed to delete movie: ${errorData.message}`);
        }
      } catch (error) {
        alert("An error occurred while deleting the movie.");
        console.error("Error:", error);
      }
    } else {
      alert("No movie to delete");
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-heading">Welcome Admin</h2>
      <form className="movie-form p-4 shadow" onSubmit={handleSubmit}>
        {/* Form Fields */}
        {/* Example field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Movie Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* ... (other form fields) */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Language</label>
          <div>
            <input
              type="radio"
              id="english"
              name="languages"
              value="ENGLISH"
              checked={formData.languages === "ENGLISH"}
              onChange={handleChange}
              required
            />
            <label htmlFor="english" className="ms-2">
              English
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="hindi"
              name="languages"
              value="HINDI"
              checked={formData.languages === "HINDI"}
              onChange={handleChange}
              required
            />
            <label htmlFor="hindi" className="ms-2">
              Hindi
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="marathi"
              name="languages"
              value="MARATHI"
              checked={formData.languages === "MARATHI"}
              onChange={handleChange}
              required
            />
            <label htmlFor="marathi" className="ms-2">
              Marathi
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Format</label>
          <div>
            <input
              type="radio"
              id="_2d"
              name="formats"
              value="_2D"
              checked={formData.formats === "_2D"}
              onChange={handleChange}
              required
            />
            <label htmlFor="_2d" className="ms-2">
              2D
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="_3d"
              name="formats"
              value="_3D"
              checked={formData.formats === "_3D"}
              onChange={handleChange}
              required
            />
            <label htmlFor="_3d" className="ms-2">
              3D
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="_4dx_3d"
              name="formats"
              value="_4DX_3D"
              checked={formData.formats === "_4DX_3D"}
              onChange={handleChange}
              required
            />
            <label htmlFor="_4dx_3d" className="ms-2">
              4DX_3D
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <div>
            <input
              type="radio"
              id="movies"
              name="type"
              value="MOVIES"
              checked={formData.type === "MOVIES"}
              onChange={handleChange}
              required
            />
            <label htmlFor="movies" className="ms-2">
              Movies
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="streams"
              name="type"
              value="STREAMS"
              checked={formData.type === "STREAMS"}
              onChange={handleChange}
              required
            />
            <label htmlFor="streams" className="ms-2">
              Streams
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="events"
              name="type"
              value="EVENTS"
              checked={formData.type === "EVENTS"}
              onChange={handleChange}
              required
            />
            <label htmlFor="events" className="ms-2">
              Events
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="sports"
              name="type"
              value="SPORTS"
              checked={formData.type === "SPORTS"}
              onChange={handleChange}
              required
            />
            <label htmlFor="sports" className="ms-2">
              Sports
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="plays"
              name="type"
              value="PLAYS"
              checked={formData.type === "PLAYS"}
              onChange={handleChange}
              required
            />
            <label htmlFor="plays" className="ms-2">
              Plays
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="activities"
              name="type"
              value="ACTIVITIES"
              checked={formData.type === "ACTIVITIES"}
              onChange={handleChange}
              required
            />
            <label htmlFor="activities" className="ms-2">
              Activities
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Genres</label>
          <div>
            <input
              type="radio"
              id="action"
              name="genres"
              value="ACTION"
              checked={formData.genres === "ACTION"}
              onChange={handleChange}
              required
            />
            <label htmlFor="action" className="ms-2">
              Action
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="romance"
              name="genres"
              value="ROMANCE"
              checked={formData.genres === "ROMANCE"}
              onChange={handleChange}
              required
            />
            <label htmlFor="romance" className="ms-2">
              Romance
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="drama"
              name="genres"
              value="DRAMA"
              checked={formData.genres === "DRAMA"}
              onChange={handleChange}
              required
            />
            <label htmlFor="drama" className="ms-2">
              Drama
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="certificate" className="form-label">
            Certificate
          </label>
          <div>
            <input
              type="radio"
              id="u"
              name="certificate"
              value="U"
              checked={formData.certificate === "U"}
              onChange={handleChange}
              required
            />
            <label htmlFor="u" className="ms-2">
              U
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="a"
              name="certificate"
              value="A"
              checked={formData.certificate === "A"}
              onChange={handleChange}
              required
            />
            <label htmlFor="a" className="ms-2">
              A
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="ua"
              name="certificate"
              value="UA"
              checked={formData.certificate === "UA"}
              onChange={handleChange}
              required
            />
            <label htmlFor="ua" className="ms-2">
              UA
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="form-control"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">
            Background Image URL
          </label>
          <input
            type="text"
            id="backgroundImage"
            name="backgroundImage"
            className="form-control"
            value={formData.backgroundImage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            className="form-control"
            value={formData.thumbnail}
            onChange={handleChange}
            required
          />
        </div>
        {/* ... (other form fields) */}
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>

      <div className="movies-list mt-4">
        <h3>Added Movies</h3>
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.movieId} className="movie-item">
              <p>
                <strong>Name:</strong> {movie.name}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.releaseDate}
              </p>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleUpdate(movie)}
              >
                Update Movie
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(movie.movieId)}
              >
                Delete Movie
              </button>
            </div>
          ))
        )}
      </div>
      <button className="btn btn-warning" onClick={() => navigate("/")}>
        GoTO HOME
      </button>
    </div>
  );
};

export default AdminForm;
