import React, { useState } from "react";
import "../../styles/MovieFilter.css";
import { useNavigate } from "react-router-dom";

const MovieFilter = ({ onFilter }) => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    language: "All",
    genre: "All",
    format: "All",
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
    onFilter(filterType, value);
  };

  const isSelected = (filterType, value) => {
    return selectedFilters[filterType] === value ? "selected-filter" : "";
  };

  return (
    <>
      <br />
      <div className="mycur maindiv">
        <div
          className="card-group myupcoming alert alert-secondary"
          role="alert"
          onClick={() => navigate("/upcoming")}
        >
          <h4 className="myh4">Upcoming Movie</h4>
          <h6 className="myh6">Explore Movie {">"} </h6>
        </div>
      </div>
      <h3 className="Mainh3">Filter</h3>
      <div className="myselect mydiv btn-group">
        <h6
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Language
        </h6>
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("language", "All")}`}
              onClick={() => handleFilterChange("language", "All")}
            >
              All
            </button>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected(
                "language",
                "English"
              )}`}
              onClick={() => handleFilterChange("language", "English")}
            >
              English
            </button>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected(
                "language",
                "Hindi"
              )}`}
              onClick={() => handleFilterChange("language", "Hindi")}
            >
              Hindi
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected(
                "language",
                "Marathi"
              )}`}
              onClick={() => handleFilterChange("language", "Marathi")}
            >
              Marathi
            </button>
          </li>
        </ul>
      </div>
      <div className="myselect mydiv btn-group">
        <h6
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Genres
        </h6>
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("genre", "All")}`}
              onClick={() => handleFilterChange("genre", "All")}
            >
              All
            </button>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("genre", "Drama")}`}
              onClick={() => handleFilterChange("genre", "Drama")}
            >
              Drama
            </button>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("genre", "Action")}`}
              onClick={() => handleFilterChange("genre", "Action")}
            >
              Action
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected(
                "genre",
                "Romantic"
              )}`}
              onClick={() => handleFilterChange("genre", "Romantic")}
            >
              Romantic
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("genre", "Sci-Fi")}`}
              onClick={() => handleFilterChange("genre", "Sci-Fi")}
            >
              Sci-Fi
            </button>
          </li>
        </ul>
      </div>
      <div className="myselect mydiv btn-group">
        <h6
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Format
        </h6>
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("format", "All")}`}
              onClick={() => handleFilterChange("format", "All")}
            >
              All
            </button>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("format", "2D")}`}
              onClick={() => handleFilterChange("format", "2D")}
            >
              2D
            </button>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected("format", "3D")}`}
              onClick={() => handleFilterChange("format", "3D")}
            >
              3D
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected(
                "format",
                "4DX 3D"
              )}`}
              onClick={() => handleFilterChange("format", "4DX 3D")}
            >
              4DX 3D
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mybtn btn btn-light ${isSelected(
                "format",
                "IMAX 2D"
              )}`}
              onClick={() => handleFilterChange("format", "IMAX 2D")}
            >
              IMAX 2D
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MovieFilter;

