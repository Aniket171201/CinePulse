package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {

	List<Rating> findByMovie_MovieId(Long movieId);
	
	Rating  findByRatingId(Long ratingId);
	
	@Modifying
    @Transactional
    @Query("DELETE FROM Rating r WHERE r.ratingId = :ratingId")
    void deleteByRatingId(@Param("ratingId") Long ratingId);

	@Query("SELECT AVG(r.rating) FROM Rating r WHERE r.movie.id = :movieId")
	Double findAverageRatingByMovieId(@Param("movieId") Long movieId);

}