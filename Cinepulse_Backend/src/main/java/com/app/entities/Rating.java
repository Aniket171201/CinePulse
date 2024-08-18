package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "ratings", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "movieId"}))
public class Rating {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    @Column(nullable = false)
    private int rating;

    @Size(max = 500, message = "Review cannot be longer than 500 characters")
    @Column(length = 500) // Specify length for review column in database
    private String review;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "movieId", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Movie movie;




	public Rating() {
		super();
	}

	public Rating(int rating, String review, User user, Movie movie) {
		super();
		this.rating = rating;
		this.review = review;
		this.user = user;
		this.movie = movie;
	}

	public Long getRatingId() {
		return ratingId;
	}

	public void setRatingId(Long ratingId) {
		this.ratingId = ratingId;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	@Override
	public String toString() {
		return "Rating [ratingId=" + ratingId + ", rating=" + rating + ", review=" + review + ", user=" + user
				+ ", movie=" + movie + "]";
	}

	
}