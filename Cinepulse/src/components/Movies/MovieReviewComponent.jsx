// import React, { useState, useEffect } from "react";
// import { TextField, Button, Rating } from "@mui/material";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MovieReviewComponent = ({ movieId, updateReviewCount }) => {
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     // Fetch reviews for the movie on component mount
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/ratings/movie/${movieId}`
//         );
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [movieId]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Data to be sent to the backend
//     const reviewData = {
//       movieId,
//       rating, // This value will be 1-5 depending on what the user selects
//       review,
//       userId, // The logged-in user's ID
//     };

//     console.log(movieId, rating, review,userId);
//     console.log(reviewData);

//     try {
//       // Post the new rating and review to the backend
//       const response = await axios.post(
//         "http://localhost:8080/api/ratings",
//         reviewData
//       );

//       if (response.status === 201) {
//         // Fetch the username based on the userId
//         console.log(userId);
//         const userResponse = await axios.get(
//           `http://localhost:8080/api/users/${userId}`
//         );

//         const username = userResponse.data.username;

//         // Update the reviews state with the new review including the username
//         const updatedReviewData = { ...reviewData, username };
//         setReviews([updatedReviewData, ...reviews]);

//         // Clear the form inputs
//         setReview("");
//         setRating(0);

//         // Update the review count in the parent component
//         updateReviewCount(reviews.length + 1);

//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error submitting the review:", error);
//     }
//   };

//   const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card p-3">
//             <h2 className="card-title text-center mb-4">Write a Review</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <TextField
//                   fullWidth
//                   label="Your Review"
//                   variant="outlined"
//                   multiline
//                   rows={2}
//                   value={review}
//                   onChange={(e) => setReview(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3 text-center">
//                 <Rating
//                   name="movie-rating"
//                   value={rating}
//                   onChange={(event, newValue) => setRating(newValue)} // This captures the rating value (1-5)
//                   size="large"
//                 />
//               </div>
//               <div className="text-center">
//                 <Button variant="contained" color="primary" type="submit">
//                   Submit Review
//                 </Button>
//               </div>
//             </form>
//           </div>
//           <div className="mt-4">
//             <h4>Reviews</h4>
//             {displayedReviews.map((rev, index) => (
//               <div key={index} className="border-bottom pb-2 mb-2">
//                 {/* <p>{rev.username}</p> */}
//                 <Rating value={rev.rating} readOnly size="small" />
//                 <p>{rev.review}</p>
//               </div>
//             ))}
//             {reviews.length > 5 && !showAll && (
//               <p
//                 className="text-primary"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setShowAll(true)}
//               >
//                 Show All Reviews
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieReviewComponent;

import React, { useState, useEffect } from "react";
import { TextField, Button, Rating, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieReviewComponent = ({ movieId, updateReviewCount }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch reviews for the movie on component mount
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/ratings/movie/${movieId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has already submitted a review for this movie
    const existingReview = reviews.find((rev) => rev.userId === userId);

    if (existingReview) {
      // User has already submitted a review, show a message
      setMessage("You have already submitted a review for this movie.");
      setOpenSnackbar(true);
      return;
    }

    // Data to be sent to the backend
    const reviewData = {
      movieId,
      rating, // This value will be 1-5 depending on what the user selects
      review,
      userId, // The logged-in user's ID
    };

    console.log(movieId, rating, review, userId);
    console.log(reviewData);

    try {
      // Post the new rating and review to the backend
      const response = await axios.post(
        "http://localhost:8080/api/ratings",
        reviewData
      );

      if (response.status === 201) {
        // Fetch the username based on the userId
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );

        const username = userResponse.data.username;

        // Update the reviews state with the new review including the username
        const updatedReviewData = { ...reviewData, username };
        setReviews([updatedReviewData, ...reviews]);

        // Clear the form inputs
        setReview("");
        setRating(0);

        // Update the review count in the parent component
        updateReviewCount(reviews.length + 1);

        setMessage("Your review has been submitted successfully!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error submitting the review:", error);
      setMessage(
        "There was an error submitting your review. Please try again."
      );
      setOpenSnackbar(true);
    }
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-3">
            <h2 className="card-title text-center mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <TextField
                  fullWidth
                  label="Your Review"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 text-center">
                <Rating
                  name="movie-rating"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)} // This captures the rating value (1-5)
                  size="large"
                />
              </div>
              <div className="text-center">
                <Button variant="contained" color="primary" type="submit">
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-4">
            <h4>Reviews</h4>
            {displayedReviews.map((rev, index) => (
              <div key={index} className="border-bottom pb-2 mb-2">
                <Rating value={rev.rating} readOnly size="small" />
                <p>{rev.review}</p>
              </div>
            ))}
            {reviews.length > 5 && !showAll && (
              <p
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShowAll(true)}
              >
                Show All Reviews
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MovieReviewComponent;
