
package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.RatingDTO;
import com.app.dto.UserDTO;

public interface RatingService {
	RatingDTO addRating(RatingDTO ratingDTO);

	RatingDTO updateRating(Long ratingId, RatingDTO ratingDTO);

	void deleteRating(Long ratingId);

	RatingDTO getRatingById(Long ratingId);

	List<RatingDTO> getRatingsByMovieId(Long movieId);
//    List<RatingDTO> getRatingsByUserId(Long userId);
}