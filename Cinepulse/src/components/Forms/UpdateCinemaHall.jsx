// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../styles/ManagerDashboard.css";

// const UpdateCinemaHall = () => {
//   const [cinemaHallData, setCinemaHallData] = useState({
//     name: "",
//     location: "",
//   });
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get the cinema hall ID from the URL

//   // Fetch existing cinema hall data on mount
//   useEffect(() => {
//     const fetchCinemaHall = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/cinemaHall/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setCinemaHallData(data);
//           console.log("Fetched cinema hall data:", data); // Debug log
//         } else {
//           console.error("Failed to fetch cinema hall data");
//         }
//       } catch (error) {
//         console.error("Error fetching cinema hall data:", error);
//       }
//     };

//     fetchCinemaHall();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCinemaHallData({
//       ...cinemaHallData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:8080/cinemaHall/update/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cinemaHallData),
//       });

//       if (response.ok) {
//         const updatedHall = await response.json();
//         console.log("Updated cinema hall data:", updatedHall); // Debug log
//         navigate("/manager-dashboard", { state: { updatedHall } });
//       } else {
//         const errorData = await response.json();
//         console.error("Update failed:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during update:", error);
//     }
//   };

//   return (
//     <div className="update-cinema-form shadow p-4 rounded">
//       <h2 className="text-center mb-4">Update Cinema Hall</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Cinema Hall Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             value={cinemaHallData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="location" className="form-label">
//             Location
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="location"
//             name="location"
//             value={cinemaHallData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Update Cinema Hall
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCinemaHall;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/ManagerDashboard.css";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";

const UpdateCinemaHall = () => {
  const [cinemaHallData, setCinemaHallData] = useState({
    name: "",
    location: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the cinema hall ID from the URL

  // Fetch existing cinema hall data on mount
  useEffect(() => {
    const fetchCinemaHall = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cinemaHall/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCinemaHallData(data);
          console.log("Fetched cinema hall data:", data); // Debug log
        } else {
          console.error("Failed to fetch cinema hall data");
        }
      } catch (error) {
        console.error("Error fetching cinema hall data:", error);
      }
    };

    fetchCinemaHall();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCinemaHallData({
      ...cinemaHallData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/cinemaHall/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cinemaHallData),
      });

      if (response.ok) {
        const updatedHall = await response.json();
        console.log("Updated cinema hall data:", updatedHall); // Debug log
        navigate("/manager-dashboard", { state: { updatedHall } });
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="p-4 mt-4">
        <Typography variant="h4" align="center" gutterBottom>
          Update Cinema Hall
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Cinema Hall Name"
              variant="outlined"
              fullWidth
              name="name"
              value={cinemaHallData.name}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              name="location"
              value={cinemaHallData.location}
              onChange={handleChange}
              required
            />
          </Box>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Update Cinema Hall
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateCinemaHall;
