//package com.app.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.app.entities.Show;
//
//public interface ShowRepository extends JpaRepository<Show, Long> {
//
//	@Modifying
//	@Transactional
//	@Query("DELETE FROM Show s WHERE s.showId = :showId")
//	void deleteByShowId(@Param("showId") Long showId);
//
//	// Corrected query to access movie through cinemaHall
//	@Query("SELECT s FROM Show s JOIN s.cinemaHall ch JOIN ch.movie m WHERE m.movieId = :movieId AND ch.location = :location")
//	List<Show> findByMovieIdAndLocation(@Param("movieId") Long movieId, @Param("location") String location);
//}




package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Show;

public interface ShowRepository extends JpaRepository<Show, Long> {

    // Corrected query to access movie through cinemaHall
    @Query("SELECT s FROM Show s JOIN s.cinemaHall ch JOIN ch.movie m WHERE m.movieId = :movieId AND ch.location = :location")
    List<Show> findByMovieIdAndLocation(@Param("movieId") Long movieId, @Param("location") String location);
}