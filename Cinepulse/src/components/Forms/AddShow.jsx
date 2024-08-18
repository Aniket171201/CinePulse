import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Box,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const AddShow = () => {
  const { id } = useParams(); // Cinema Hall ID
  const location = useLocation();
  const { movieId } = location.state || {}; // Movie ID
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [availableSeats] = useState(40); // Default value
  const [errorMessage, setErrorMessage] = useState("");
  const [showList, setShowList] = useState([]); // List of shows to be added
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setShowDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setShowTime(e.target.value);
  };

  const convertToISODateTime = (date, time) => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
  };

  const handleAddShow = (e) => {
    e.preventDefault();

    if (!showDate || !showTime) {
      setErrorMessage("Please select both a date and a time.");
      return;
    }

    const isoShowTime = convertToISODateTime(showDate, showTime);

    // Add new show to the list
    setShowList((prevShows) => [
      ...prevShows,
      { showTime: isoShowTime, availableSeats },
    ]);

    // Clear form fields
    setShowDate("");
    setShowTime("");
    setErrorMessage("");
  };

  const handleSubmitAllShows = async () => {
    if (showList.length === 0) {
      setErrorMessage("No shows to submit.");
      return;
    }

    try {
      for (const show of showList) {
        const response = await fetch("http://localhost:8080/api/shows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cinemaHallId: parseInt(id),
            movieId: movieId,
            showTime: show.showTime,
            availableSeats: show.availableSeats,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Failed to add show");
          return;
        }
      }

      // Navigate to the dashboard after processing
      navigate("/manager-dashboard");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error adding shows. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Add Show
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleAddShow}>
            <div className="form-group mb-3">
              <TextField
                type="date"
                label="Show Date"
                fullWidth
                value={showDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
            <div className="form-group mb-3">
              <TextField
                type="time"
                label="Show Time"
                fullWidth
                value={showTime}
                onChange={handleTimeChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mb-3"
            >
              Add Show to List
            </Button>
          </form>

          {showList.length > 0 && (
            <div className="show-list mt-4">
              <Typography variant="h5" component="h3">
                Shows to be Added
              </Typography>
              <List>
                {showList.map((show, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`Date: ${new Date(
                        show.showTime
                      ).toLocaleDateString()}`}
                      secondary={`Time: ${new Date(
                        show.showTime
                      ).toLocaleTimeString()}`}
                    />
                    <Typography variant="body2">
                      Available Seats: {show.availableSeats}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </div>
          )}

          {showList.length > 0 && (
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleSubmitAllShows}
            >
              Submit All Shows
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddShow;
