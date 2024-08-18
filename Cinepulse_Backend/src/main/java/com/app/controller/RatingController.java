package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.RatingDTO;
import com.app.service.RatingService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

	@Autowired
	private RatingService ratingService;

	@PostMapping
	public ResponseEntity<RatingDTO> addRating( @Valid @RequestBody RatingDTO ratingDTO) {
		// ratingDTO.setUserId(userDTO.getUserId());

		return new ResponseEntity<>(ratingService.addRating(ratingDTO), HttpStatus.CREATED);
	}

	@PatchMapping("/{ratingId}")
	public ResponseEntity<RatingDTO> updateRating(@PathVariable Long ratingId,@Valid @RequestBody RatingDTO ratingDTO) {
		return new ResponseEntity<>(ratingService.updateRating(ratingId, ratingDTO), HttpStatus.OK);
	}

	@DeleteMapping("/{ratingId}")
	public ResponseEntity<Void> deleteRating(@PathVariable Long ratingId) {
		ratingService.deleteRating(ratingId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/{ratingId}")
	public ResponseEntity<RatingDTO> getRatingById(@PathVariable Long ratingId) {
		RatingDTO ratingDTO = ratingService.getRatingById(ratingId);
		return new ResponseEntity<>(ratingDTO, HttpStatus.OK);
	}

	@GetMapping("/movie/{movieId}")
	public ResponseEntity<List<RatingDTO>> getRatingsByMovieId(@PathVariable Long movieId) {
		List<RatingDTO> ratings = ratingService.getRatingsByMovieId(movieId);
		return new ResponseEntity<>(ratings, HttpStatus.OK);
	}
	
//	@GetMapping("/api/ratings/movie/{movieId}")
//	public List<RatingDTO> getReviewsByMovie(@PathVariable Long movieId) {
//	    return ratingService.getRatingsByMovieId(movieId).stream()
//	        .map(review -> new ReviewDto(
//	            review.getId(),
//	            review.getMovieId(),
//	            review.getRating(),
//	            review.getReview(),
//	            userService.getUsernameById(review.getUserId()) // Assuming a method to get username
//	        ))
//	        .collect(Collectors.toList());
//	}


//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<RatingDTO>> getRatingsByUserId(@PathVariable("userId") Long userId) {
//        List<RatingDTO> ratings = ratingService.getRatingsByUserId(userId);
//        return new ResponseEntity<>(ratings, HttpStatus.OK);
//    }
}