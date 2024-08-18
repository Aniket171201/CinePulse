// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../styles/ManagerDashboard.css";

// const ManagerDashboard = () => {
//   const [cinemaHalls, setCinemaHalls] = useState(() => {
//     const savedHalls = sessionStorage.getItem("cinemaHalls");
//     return savedHalls ? JSON.parse(savedHalls) : [];
//   });

//   const [cinemaHallData, setCinemaHallData] = useState({
//     name: "",
//     location: "",
//   });

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get associatedMovie and cinemaHall from location state
//   const { associatedMovie } = location.state || {};

//   useEffect(() => {
//     if (location.state?.updatedHall) {
//       const updatedHall = location.state.updatedHall;
//       setCinemaHalls((prevHalls) =>
//         prevHalls.map((hall) =>
//           hall.id === updatedHall.id ? updatedHall : hall
//         )
//       );
//       navigate('/manager-dashboard', { replace: true }); // Navigate to refresh the page without adding a new history entry
//     }
//   }, [location.state, navigate]);

//   useEffect(() => {
//     sessionStorage.setItem("cinemaHalls", JSON.stringify(cinemaHalls));
//   }, [cinemaHalls]);

//   const handleCinemaHallChange = (e) => {
//     const { name, value } = e.target;
//     setCinemaHallData({
//       ...cinemaHallData,
//       [name]: value,
//     });
//   };

//   const handleCinemaHallSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/cinemaHall/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cinemaHallData),
//       });
//       if (response.ok) {
//         const newCinemaHall = await response.json();
//         setCinemaHalls([...cinemaHalls, newCinemaHall]);
//         setCinemaHallData({ name: "", location: "" });
//       } else {
//         console.error("Failed to add cinema hall");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleUpdateCinemaHall = (id) => {
//     navigate(`/update-cinemaHall/${id}`);
//   };

//   const handleDeleteCinemaHall = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/cinemaHall/delete/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setCinemaHalls((prevHalls) =>
//           prevHalls.filter((hall) => hall.id !== id)
//         );
//       } else {
//         console.error("Failed to delete cinema hall");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleAssociateMovie = (id) => {
//     navigate(`/associate-movie/${id}`);
//   };

//   const handleAddShow = (id)=>{
//     navigate(`/add-show/${id}`);
//   }

//   return (
//     <div className="manager-dashboard">
//       <div className="dashboard-section">
//         <div className="welcome-box">
//           <h2>Welcome, Manager</h2>
//         </div>
//         <div className="manager-forms">
//           <form
//             className="cinema-hall-form shadow p-4 rounded mb-5"
//             onSubmit={handleCinemaHallSubmit}
//           >
//             <h2 className="text-center mb-4">Add Cinema Hall</h2>

//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Cinema Hall Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 value={cinemaHallData.name}
//                 onChange={handleCinemaHallChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="location" className="form-label">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="location"
//                 name="location"
//                 value={cinemaHallData.location}
//                 onChange={handleCinemaHallChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Add Cinema Hall
//             </button>
//           </form>

//           <div className="cinema-hall-list">
//             <h2 className="text-center mb-4">Cinema Halls</h2>
//             {cinemaHalls.length === 0 ? (
//               <p>No cinema halls available.</p>
//             ) : (
//               <ul className="list-group">
//                 {cinemaHalls.map((hall) => (
//                   <li
//                     key={hall.id}
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                   >
//                     <span>
//                       <strong>{hall.name}</strong> - {hall.location}
//                     </span>
//                      {associatedMovie && associatedMovie.cinemaHallId === hall.id && (
//                       <div className="movie-details mt-2">
//                         <span><strong>Movie:</strong> {associatedMovie.name}</span><br />
//                         <span><strong>Release Date:</strong> {associatedMovie.releaseDate}</span>
//                       </div>
//                      )}
//                     <div>
//                       <button
//                         className="btn btn-warning me-2"
//                         onClick={() => handleUpdateCinemaHall(hall.id)}
//                       >
//                         Update
//                       </button>
//                       <button
//                         className="btn btn-danger me-2"
//                         onClick={() => handleDeleteCinemaHall(hall.id)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => handleAssociateMovie(hall.id)}
//                       >
//                         Associate Movie
//                       </button>
//                       <button
//                         className="btn btn-warning me-2"
//                         onClick={() => handleAddShow(hall.id)}
//                       >
//                         Add Shows
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../styles/ManagerDashboard.css";

// const ManagerDashboard = () => {
//   const [cinemaHalls, setCinemaHalls] = useState(() => {
//     const savedHalls = sessionStorage.getItem("cinemaHalls");
//     return savedHalls ? JSON.parse(savedHalls) : [];
//   });

//   const [cinemaHallData, setCinemaHallData] = useState({
//     name: "",
//     location: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get associatedMovie and cinemaHall from location state
//   const { associatedMovie } = location.state || {};

//   console.log(associatedMovie);
//   console.log("asd");

//   useEffect(() => {
//     if (location.state?.updatedHall) {
//       const updatedHall = location.state.updatedHall;
//       setCinemaHalls((prevHalls) =>
//         prevHalls.map((hall) =>
//           hall.id === updatedHall.id ? updatedHall : hall
//         )
//       );
//       navigate("/manager-dashboard", { replace: true }); // Navigate to refresh the page without adding a new history entry
//     }
//   }, [location.state, navigate]);

//   useEffect(() => {
//     sessionStorage.setItem("cinemaHalls", JSON.stringify(cinemaHalls));
//   }, [cinemaHalls]);

//   const handleCinemaHallChange = (e) => {
//     const { name, value } = e.target;
//     setCinemaHallData({
//       ...cinemaHallData,
//       [name]: value,
//     });
//   };

//   const handleCinemaHallSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/cinemaHall/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cinemaHallData),
//       });
//       if (response.ok) {
//         const newCinemaHall = await response.json();
//         setCinemaHalls([...cinemaHalls, newCinemaHall]);
//         setCinemaHallData({ name: "", location: "" });
//       } else {
//         console.error("Failed to add cinema hall");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleUpdateCinemaHall = (id) => {
//     navigate(`/update-cinemaHall/${id}`);
//   };

//   const handleDeleteCinemaHall = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/cinemaHall/delete/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setCinemaHalls((prevHalls) =>
//           prevHalls.filter((hall) => hall.id !== id)
//         );
//       } else {
//         console.error("Failed to delete cinema hall");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleAssociateMovie = (id) => {
//     navigate(`/associate-movie/${id}`);
//   };

//   const handleAddShow = (id) => {
//     const hall = cinemaHalls.find((hall) => hall.id === id);
//     if (!associatedMovie || associatedMovie.cinemaHallId !== id) {
//       setErrorMessage(`Cannot add show. Please associate a movie with "${hall.name}" first.`);
//       return;
//     }
//     //navigate(`/add-show/${id}`);
//   };

//   return (
//     <div className="manager-dashboard">
//       <div className="dashboard-section">
//         <div className="welcome-box">
//           <h2>Welcome, Manager</h2>
//         </div>
//         <div className="manager-forms">
//           <form
//             className="cinema-hall-form shadow p-4 rounded mb-5"
//             onSubmit={handleCinemaHallSubmit}
//           >
//             <h2 className="text-center mb-4">Add Cinema Hall</h2>

//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Cinema Hall Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 value={cinemaHallData.name}
//                 onChange={handleCinemaHallChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="location" className="form-label">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="location"
//                 name="location"
//                 value={cinemaHallData.location}
//                 onChange={handleCinemaHallChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Add Cinema Hall
//             </button>
//           </form>

//           {errorMessage && (
//             <div className="alert alert-danger text-center" role="alert">
//               {errorMessage}
//             </div>
//           )}

//           <div className="cinema-hall-list">
//             <h2 className="text-center mb-4">Cinema Halls</h2>
//             {cinemaHalls.length === 0 ? (
//               <p>No cinema halls available.</p>
//             ) : (
//               <ul className="list-group">
//                 {cinemaHalls.map((hall) => (
//                   <li
//                     key={hall.id}
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                   >
//                     <span>
//                       <strong>{hall.name}</strong> - {hall.location}
//                     </span>
//                     {associatedMovie && associatedMovie.cinemaHallId === hall.id && (
//                       <div className="movie-details mt-2">
//                         <span>
//                           <strong>Movie:</strong> {associatedMovie.name}
//                         </span>
//                         <br />
//                         <span>
//                           <strong>Release Date:</strong> {associatedMovie.releaseDate}
//                         </span>
//                       </div>
//                     )}
//                     <div>
//                       <button
//                         className="btn btn-warning me-2"
//                         onClick={() => handleUpdateCinemaHall(hall.id)}
//                       >
//                         Update
//                       </button>
//                       <button
//                         className="btn btn-danger me-2"
//                         onClick={() => handleDeleteCinemaHall(hall.id)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className="btn btn-secondary me-2"
//                         onClick={() => handleAssociateMovie(hall.id)}
//                       >
//                         Associate Movie
//                       </button>
//                       <button
//                         className="btn btn-warning"
//                         onClick={() => handleAddShow(hall.id)}
//                       >
//                         Add Shows
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../styles/ManagerDashboard.css";

// const ManagerDashboard = () => {
//   const [cinemaHalls, setCinemaHalls] = useState(() => {
//     const savedHalls = sessionStorage.getItem("cinemaHalls");
//     return savedHalls ? JSON.parse(savedHalls) : [];
//   });

//   const [cinemaHallData, setCinemaHallData] = useState({
//     name: "",
//     location: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get associatedMovie and cinemaHall from location state
//   const { associatedMovie } = location.state || {};

//   useEffect(() => {
//     if (location.state?.updatedHall) {
//       const updatedHall = location.state.updatedHall;
//       setCinemaHalls((prevHalls) =>
//         prevHalls.map((hall) =>
//           hall.id === updatedHall.id ? updatedHall : hall
//         )
//       );
//       navigate("/manager-dashboard", { replace: true }); // Navigate to refresh the page without adding a new history entry
//     }
//   }, [location.state, navigate]);

//   useEffect(() => {
//     sessionStorage.setItem("cinemaHalls", JSON.stringify(cinemaHalls));
//   }, [cinemaHalls]);

//   const handleCinemaHallChange = (e) => {
//     const { name, value } = e.target;
//     setCinemaHallData({
//       ...cinemaHallData,
//       [name]: value,
//     });
//   };

//   const handleCinemaHallSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/cinemaHall/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cinemaHallData),
//       });
//       if (response.ok) {
//         const newCinemaHall = await response.json();
//         setCinemaHalls([...cinemaHalls, newCinemaHall]);
//         setCinemaHallData({ name: "", location: "" });
//       } else {
//         console.error("Failed to add cinema hall");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleUpdateCinemaHall = (id) => {
//     navigate(`/update-cinemaHall/${id}`);
//   };

//   const handleDeleteCinemaHall = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/cinemaHall/delete/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setCinemaHalls((prevHalls) =>
//           prevHalls.filter((hall) => hall.id !== id)
//         );
//       } else {
//         console.error("Failed to delete cinema hall");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleAssociateMovie = (id) => {
//     navigate(`/associate-movie/${id}`);
//   };

//   const handleAddShow = (id) => {
//     const hall = cinemaHalls.find((hall) => hall.id === id);
//     if (!associatedMovie || associatedMovie.cinemaHallId !== id) {
//       setErrorMessage(`Cannot add show. Please associate a movie with "${hall.name}" first.`);
//       return;
//     }
//     //navigate(`/add-show/${id}`);
//   };

//   return (
//     <div className="manager-dashboard">
//       <div className="dashboard-section">
//         <div className="welcome-box">
//           <h2>Welcome, Manager</h2>
//         </div>
//         <div className="manager-forms">
//           <form
//             className="cinema-hall-form shadow p-4 rounded mb-5"
//             onSubmit={handleCinemaHallSubmit}
//           >
//             <h2 className="text-center mb-4">Add Cinema Hall</h2>

//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Cinema Hall Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 value={cinemaHallData.name}
//                 onChange={handleCinemaHallChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="location" className="form-label">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="location"
//                 name="location"
//                 value={cinemaHallData.location}
//                 onChange={handleCinemaHallChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Add Cinema Hall
//             </button>
//           </form>

//           {errorMessage && (
//             <div className="alert alert-danger text-center" role="alert">
//               {errorMessage}
//             </div>
//           )}

//           <div className="cinema-hall-list">
//             <h2 className="text-center mb-4">Cinema Halls</h2>
//             {cinemaHalls.length === 0 ? (
//               <p>No cinema halls available.</p>
//             ) : (
//               <ul className="list-group">
//                 {cinemaHalls.map((hall) => (
//                   <li
//                     key={hall.id}
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                   >
//                     <span>
//                       <strong>{hall.name}</strong> - {hall.location}
//                     </span>
//                     {associatedMovie && associatedMovie.cinemaHallId === hall.id && (
//                       <div className="movie-details mt-2">
//                         <span>
//                           <strong>Movie:</strong> {associatedMovie.name}
//                         </span>
//                         <br />
//                       </div>
//                     )}
//                     <div>
//                       <button
//                         className="btn btn-warning me-2"
//                         onClick={() => handleUpdateCinemaHall(hall.id)}
//                       >
//                         Update
//                       </button>
//                       <button
//                         className="btn btn-danger me-2"
//                         onClick={() => handleDeleteCinemaHall(hall.id)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className="btn btn-secondary me-2"
//                         onClick={() => handleAssociateMovie(hall.id)}
//                       >
//                         Associate Movie
//                       </button>
//                       <button
//                         className="btn btn-warning"
//                         onClick={() => handleAddShow(hall.id)}
//                       >
//                         Add Shows
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/ManagerDashboard.css";

const ManagerDashboard = () => {
  const [cinemaHalls, setCinemaHalls] = useState(() => {
    const savedHalls = sessionStorage.getItem("cinemaHalls");
    return savedHalls ? JSON.parse(savedHalls) : [];
  });

  const [cinemaHallData, setCinemaHallData] = useState({
    name: "",
    location: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Get associatedMovie and cinemaHall from location state
  const { associatedMovie } = location.state || {};

  useEffect(() => {
    if (location.state?.updatedHall) {
      const updatedHall = location.state.updatedHall;
      setCinemaHalls((prevHalls) =>
        prevHalls.map((hall) =>
          hall.id === updatedHall.id ? updatedHall : hall
        )
      );
      navigate("/manager-dashboard", { replace: true }); // Navigate to refresh the page without adding a new history entry
    }
  }, [location.state, navigate]);

  useEffect(() => {
    sessionStorage.setItem("cinemaHalls", JSON.stringify(cinemaHalls));
  }, [cinemaHalls]);

  const handleCinemaHallChange = (e) => {
    const { name, value } = e.target;
    setCinemaHallData({
      ...cinemaHallData,
      [name]: value,
    });
  };

  const handleCinemaHallSubmit = async (e) => {
    e.preventDefault();
    if (cinemaHalls.length > 0) {
      setErrorMessage("Only one cinema hall can be added.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cinemaHall/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cinemaHallData),
      });
      if (response.ok) {
        const newCinemaHall = await response.json();
        setCinemaHalls([...cinemaHalls, newCinemaHall]);
        setCinemaHallData({ name: "", location: "" });
      } else {
        console.error("Failed to add cinema hall");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateCinemaHall = (id) => {
    navigate(`/update-cinemaHall/${id}`);
  };

  const handleDeleteCinemaHall = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cinemaHall/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCinemaHalls((prevHalls) =>
          prevHalls.filter((hall) => hall.id !== id)
        );
      } else {
        console.error("Failed to delete cinema hall");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAssociateMovie = (id) => {
    navigate(`/associate-movie/${id}`);
  };

  const handleAddShow = (id) => {
    console.log("md hall");
    console.log(id);
    console.log("end of md");

    const hall = cinemaHalls.find((hall) => hall.id === id);
    if (!associatedMovie || associatedMovie.cinemaHallId !== id) {
      setErrorMessage(
        `Cannot add show. Please associate a movie with "${hall.name}" first.`
      );
      return;
    }
    console.log(associatedMovie);
    console.log("asdasd");

    navigate(`/add-show/${id}`, {
      state: { movieId: associatedMovie.movieId },
    });
  };

  return (
    <div className="manager-dashboard">
      <div className="dashboard-section">
        <div className="welcome-box">
          <h2>Welcome, Manager</h2>
        </div>
        <div className="manager-forms">
          {cinemaHalls.length === 0 && (
            <form
              className="cinema-hall-form shadow p-4 rounded mb-5"
              onSubmit={handleCinemaHallSubmit}
            >
              <h2 className="text-center mb-4">Add Cinema Hall</h2>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Cinema Hall Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={cinemaHallData.name}
                  onChange={handleCinemaHallChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={cinemaHallData.location}
                  onChange={handleCinemaHallChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Cinema Hall
              </button>
            </form>
          )}

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="cinema-hall-list">
            <h2 className="text-center mb-4">Cinema Halls</h2>
            {cinemaHalls.length === 0 ? (
              <p>No cinema halls available.</p>
            ) : (
              <ul className="list-group">
                {cinemaHalls.map((hall) => (
                  <li
                    key={hall.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>{hall.name}</strong> - {hall.location}
                    </span>
                    {associatedMovie &&
                      associatedMovie.cinemaHallId === hall.id && (
                        <div className="mt-2">
                          <span>
                            <strong>Movie:</strong> {associatedMovie.name}
                          </span>
                          <br />
                        </div>
                      )}

                    <div>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleUpdateCinemaHall(hall.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleDeleteCinemaHall(hall.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => handleAssociateMovie(hall.id)}
                      >
                        Associate Movie
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleAddShow(hall.id)}
                      >
                        Add Shows
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button className="btn btn-warning" onClick={() => navigate("/")}>
          GoTO HOME
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
