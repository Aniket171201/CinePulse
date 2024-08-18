package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
	Movie findByName(String moviename);
	Movie findByMovieId(Long id);
	List<Movie> findByNameContainingIgnoreCase(String name);
}
