package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.RatingDTO;
import com.app.entities.Movie;
import com.app.entities.Rating;
import com.app.entities.User;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.MovieRepository;
import com.app.repository.RatingRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class RatingServiceImpl implements RatingService {

	@Autowired
	private RatingRepository ratingRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	
	 @PersistenceContext
	    private EntityManager entityManager;

	 @Override
	 public RatingDTO addRating(RatingDTO ratingDTO) {
	     Rating rating = modelMapper.map(ratingDTO, Rating.class);

	     // Set User and Movie entities
	     User user = userRepository.findById(ratingDTO.getUserId())
	             .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + ratingDTO.getUserId()));
	     Movie movie = movieRepository.findById(ratingDTO.getMovieId())
	             .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id " + ratingDTO.getMovieId()));

	     rating.setUser(user);
	     rating.setMovie(movie);

	     Rating savedRating = ratingRepository.save(rating);

	     // Map back to RatingDTO and set userId and movieId
	     RatingDTO responseRatingDTO = modelMapper.map(savedRating, RatingDTO.class);
	     responseRatingDTO.setUserId(user.getUserId());
	     responseRatingDTO.setMovieId(movie.getMovieId());

	     // Update movie's total rating
	     updateMovieTotalRating(ratingDTO.getMovieId());

	     return responseRatingDTO;
	 }


	 @Override
	 public RatingDTO updateRating(Long ratingId, RatingDTO ratingDTO) {
	     // Check if the rating exists
	     Rating existingRating = ratingRepository.findById(ratingId)
	         .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id " + ratingId));

	     // Update only the provided fields
	     if (ratingDTO.getRating() != null) {
	         existingRating.setRating(ratingDTO.getRating());
	     }
	     if (ratingDTO.getReview() != null) {
	         existingRating.setReview(ratingDTO.getReview());
	     }
	     // Handle other fields if necessary

	     // Save the updated rating
	     Rating updatedRating = ratingRepository.save(existingRating);

	     // Update the movie's total rating
	     updateMovieTotalRating(existingRating.getMovie().getMovieId());

	     // Convert to DTO and set userId and movieId
	     RatingDTO responseRatingDTO = modelMapper.map(updatedRating, RatingDTO.class);
	     responseRatingDTO.setUserId(existingRating.getUser().getUserId());
	     responseRatingDTO.setMovieId(existingRating.getMovie().getMovieId());

	     return responseRatingDTO;
	 }

	

	
	@Transactional
    @Override
    public void deleteRating(Long ratingId) {
        // Check if the rating exists before attempting to delete
        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new ResourceNotFoundException("Rating with id " + ratingId + " not found"));

        // If the rating exists, use the custom query to delete it
        ratingRepository.deleteByRatingId(ratingId);
        System.out.println("id found and deleted: " + ratingId);
    }



	
	 public RatingDTO getRatingById(Long ratingId) {
	        Rating rating = ratingRepository.findById(ratingId)
	                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id " + ratingId));

	        // Use modelMapper to map basic properties
	        RatingDTO ratingDTO = modelMapper.map(rating, RatingDTO.class);

	        // Manually set nested properties if necessary
	        if (rating.getUser() != null) {
	            ratingDTO.setUserId(rating.getUser().getUserId());
	        }
	        if (rating.getMovie() != null) {
	            ratingDTO.setMovieId(rating.getMovie().getMovieId());
	        }

	        return ratingDTO;
	    }

	 @Override
	    public List<RatingDTO> getRatingsByMovieId(Long movieId) {
	        // Fetch ratings by movie ID
	        List<Rating> ratings = ratingRepository.findByMovie_MovieId(movieId);
	        
	        if(ratings==null) {
	        	throw new ResourceNotFoundException("movie id not found");
	        }

	        // Convert list of Rating entities to list of RatingDTOs
	        return ratings.stream()
	                .map(rating -> {
	                    // Use ModelMapper to map basic fields
	                    RatingDTO ratingDTO = modelMapper.map(rating, RatingDTO.class);
	                    // Manually set nested properties
	                    ratingDTO.setUserId(rating.getUser() != null ? rating.getUser().getUserId() : null);
	                    ratingDTO.setMovieId(rating.getMovie() != null ? rating.getMovie().getMovieId() : null);
	                    return ratingDTO;
	                })
	                .collect(Collectors.toList());
	    }
	
    private void updateMovieTotalRating(Long movieId) {
        
        Movie movie = movieRepository.findById(movieId)
            .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id " + movieId));
        Double averageRating = ratingRepository.findAverageRatingByMovieId(movieId);
        movie.setRating(averageRating);
        movieRepository.save(movie);
    }


}