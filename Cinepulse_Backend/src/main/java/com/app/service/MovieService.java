package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.MovieDTO;

public interface MovieService {
	MovieDTO addMovie(MovieDTO movirDTO);
	void deleteMovie(Long id);
	MovieDTO updateMovie(Long movieId ,MovieDTO movirDTO);
	List<MovieDTO> getAllMovoie();
	List<MovieDTO> getMovieByName(String movieName);
	MovieDTO getMovieById(Long movieId);
}