import { useEffect, useState } from "react";
import css from "../../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import cities from "../JsonFiles/cities.json";
import Profile from "../../IMG/boy.png";
import CinePulse from "../../IMG/CinePulse.png";
import { IconButton } from "@mui/material";
const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("City");
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(null);
  const [showCityModal, setShowCityModal] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Retrieve the city from session storage if available
    const storedCity = sessionStorage.getItem("selectedCity");
    if (storedCity) {
      setSelectedCity(storedCity);
    } else {
      // Show the modal after 3 seconds if no city is selected
      setTimeout(() => {
        setShowCityModal(true);
      }, 3000);
    }
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    sessionStorage.setItem("selectedCity", city);
    setShowCityModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Navigate to home page after logout
    window.location.reload();
  };
  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary ${css.mymain}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <img
                src={CinePulse}
                alt="Logo"
                style={{ width: 50, height: 50 }}
              />
            </IconButton>
          </div>
          <a href="/" className={`${css.mycur} navbar-brand`}>
            CinePulse
          </a>

          <div className="d-flex align-items-center flex-grow-1">
            <form
              className={`d-flex ${css.mysearch}`}
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-search ${css.mymagnifying}`}
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Movies"
                aria-label="Search"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>

          <div className="d-flex align-items-center">
            <div className={`nav-item dropdown ${css.mydropdown}`}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedCity}
              </a>
              <ul className="dropdown-menu p-0">
                <div className="container mt-3">
                  <h5>Popular Cities</h5>
                  <div
                    className="list-group"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {cities.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex align-items-center"
                        style={{ padding: "8px 12px", cursor: "pointer" }}
                        onClick={() => handleCityChange(item.city)}
                      >
                        <img
                          src={item.imgSrc}
                          alt={item.city}
                          className="me-2"
                          style={{ width: "30px", height: "30px" }}
                        />
                        {item.city}
                      </li>
                    ))}
                  </div>
                  <div className="mt-3">
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      View All Cities
                    </span>
                  </div>
                </div>
              </ul>
            </div>
            <div className="d-flex flex-column align-items-center">
              <img
                src={Profile}
                alt="User Avatar"
                className={`${css.avatar} rounded-circle`}
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              />
            </div>

            {!user && (
              <button
                type="button"
                className={`${css.mysignin} btn btn-danger`}
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            )}

            {user && (
              <button
                type="button"
                className="btn btn-outline-danger ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="30"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
        </div>
      </nav>
      {showCityModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ textAlign: "center" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Your City</h5>
              </div>
              <div className="modal-body">
                <div className="list-group">
                  {cities.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => handleCityChange(item.city)}
                    >
                      <img
                        src={item.imgSrc}
                        alt={item.city}
                        className="me-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                      {item.city}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCityModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
