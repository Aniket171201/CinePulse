package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.MovieDTO;
import com.app.service.MovieService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {
    
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }
    
    
    @Secured("ROLE_ADMIN")
    @PostMapping("/add")
    public ResponseEntity<MovieDTO> addMovie(@Valid @RequestBody MovieDTO movieDTO) {
        MovieDTO addedMovie = movieService.addMovie(movieDTO);
        return ResponseEntity.ok(addedMovie);
    }
    
    
    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> deleteMovie(@PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
    @Secured("ROLE_ADMIN")
    @PatchMapping("/{movieId}")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable("movieId") Long movieId, @Valid @RequestBody MovieDTO movieDTO) {
        MovieDTO updatedMovie = movieService.updateMovie(movieId, movieDTO);
        return ResponseEntity.ok(updatedMovie);
    }

    @GetMapping
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        List<MovieDTO> movies = movieService.getAllMovoie();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{movieName}")
    public ResponseEntity<List<MovieDTO>> getMovieByName(@PathVariable("movieName") String movieName) {
        List<MovieDTO> movie = movieService.getMovieByName(movieName);
        return ResponseEntity.ok(movie);
    }
    
    @PostMapping("/getMovie/{movieId}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable("movieId") Long movieId) {
       MovieDTO movie = movieService.getMovieById(movieId);
        return ResponseEntity.ok(movie);
    }
    
    
    
    
}