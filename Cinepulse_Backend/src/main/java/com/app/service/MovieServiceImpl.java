package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.MovieDTO;
import com.app.entities.CinemaHall;
import com.app.entities.Movie;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.CinemaHallRepository;
import com.app.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {
	private final ModelMapper modelMapper;
	private final MovieRepository movieRepository;
	 @Autowired
	    private CinemaHallRepository cinemaHallRepository;

	@Autowired
	public MovieServiceImpl(ModelMapper modelMapper, MovieRepository movieRepository) {
		this.modelMapper = modelMapper;
		this.movieRepository = movieRepository;
	}

	@Override
	public MovieDTO addMovie(MovieDTO movieDTO) {
		Movie movie = modelMapper.map(movieDTO, Movie.class);
		movieRepository.save(movie);
		return modelMapper.map(movie, MovieDTO.class);
	}


	
	 @Transactional
	    public void deleteMovie(Long movieId) {
	        // Find the movie to delete
	        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

	        // Find and update associated cinema halls
	        List<CinemaHall> cinemaHalls = cinemaHallRepository.findByMovie(movie);
	        for (CinemaHall cinemaHall : cinemaHalls) {
	            cinemaHall.setMovie(null); // Remove the association
	            cinemaHallRepository.save(cinemaHall); // Save the updated cinema hall
	        }

	        // Delete the movie
	        movieRepository.delete(movie);
	    }

	@Override
	public MovieDTO updateMovie(Long movieId, MovieDTO movieDTO) {
		Movie movie = movieRepository.findByMovieId(movieId);
		if (movie == null) {
			throw new ResourceNotFoundException("Movie not found with id: " + movieId);
		}

		// Update only the fields that are not null in the DTO
		if (movieDTO.getName() != null) {
			movie.setName(movieDTO.getName());
		}
		if (movieDTO.getThumbnail() != null) {
			movie.setThumbnail(movieDTO.getThumbnail());
		}
		if (movieDTO.getBackgroundImage() != null) {
			movie.setBackgroundImage(movieDTO.getBackgroundImage());
		}
		if (movieDTO.getDescription() != null) {
			movie.setDescription(movieDTO.getDescription());
		}
		if (movieDTO.getReleaseDate() != null) {
			movie.setReleaseDate(movieDTO.getReleaseDate());
		}
		if (movieDTO.getFormats() != null) {
			movie.setFormats(movieDTO.getFormats());
		}
		if (movieDTO.getLanguages() != null) {
			movie.setLanguages(movieDTO.getLanguages());
		}
		if (movieDTO.getGenres() != null) {
			movie.setGenres(movieDTO.getGenres());
		}
		if (movieDTO.getCertificate() != null) {
			movie.setCertificate(movieDTO.getCertificate());
		}
		if (movieDTO.getType() != null) {
			movie.setType(movieDTO.getType());
		}

		// Save the updated movie
		movieRepository.save(movie);

		// Return the updated movie as a DTO
		return modelMapper.map(movie, MovieDTO.class);
	}

	@Override
	public List<MovieDTO> getAllMovoie() {
		List<Movie> movies = movieRepository.findAll();
		if(movies==null) {
			throw new ResourceNotFoundException("Movie not found");
		}
		return movies.stream().map(movie -> modelMapper.map(movie, MovieDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<MovieDTO> getMovieByName(String movieName) {
	    List<Movie> movies = movieRepository.findByNameContainingIgnoreCase(movieName);
	    if (movies.isEmpty()) {
	        throw new ResourceNotFoundException("No movies found with name containing: " + movieName);
	    }
	    return movies.stream()
	                 .map(movie -> modelMapper.map(movie, MovieDTO.class))
	                 .collect(Collectors.toList());
	}

	@Override
	public MovieDTO getMovieById(Long movieId) {
		  Movie movie = movieRepository.findByMovieId(movieId);
			if(movie==null) {
				throw new ResourceNotFoundException("Movie not found");
			}
		return modelMapper.map(movie, MovieDTO.class);
	}
}