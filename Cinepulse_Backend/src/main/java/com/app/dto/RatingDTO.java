package com.app.dto;

public class RatingDTO {
    private Long ratingId;
    private Integer rating; // Use Integer to allow null values
    private String review;
    private Long userId; // Use Long for optional references
    private Long movieId;

    // Default constructor
    public RatingDTO() {
    }

    // Parameterized constructor
    public RatingDTO(Long ratingId, Integer rating, String review, Long userId, Long movieId) {
        this.ratingId = ratingId;
        this.rating = rating;
        this.review = review;
        this.userId = userId;
        this.movieId = movieId;
    }

    public RatingDTO(Long ratingId2, int rating2, String review2) {
		this.ratingId=ratingId2;
		this.rating=rating2;
		this.review=review2;
	}

	// Getters and Setters
    public Long getRatingId() {
        return ratingId;
    }

    public void setRatingId(Long ratingId) {
        this.ratingId = ratingId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    @Override
    public String toString() {
        return "RatingDTO [ratingId=" + ratingId + ", rating=" + rating + ", review=" + review + ", userId=" + userId
                + ", movieId=" + movieId + "]";
    }
}