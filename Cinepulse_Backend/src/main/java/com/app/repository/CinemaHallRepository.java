package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.CinemaHall;
import com.app.entities.Movie;

public interface CinemaHallRepository extends JpaRepository<CinemaHall, Long> {
	List<CinemaHall> findByName(String name);

	Optional<CinemaHall> findByCinemaHallId(Long id);

	List<CinemaHall> findByNameContainingIgnoreCase(String name);
	
	 List<CinemaHall> findByMovie_MovieIdAndLocation(Long movieId, String location);
	 
	 List<CinemaHall> findByMovie(Movie movie);


}