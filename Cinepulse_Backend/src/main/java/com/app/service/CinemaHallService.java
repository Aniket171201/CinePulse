package com.app.service;

import java.util.List;

import com.app.dto.CinemaHallDTO;
import com.app.entities.CinemaHall;

public interface CinemaHallService {

	List<CinemaHallDTO> getAllCinemaHalls();

	CinemaHallDTO getCinemaHallByName(String name);

	CinemaHallDTO findCinemaHallById(Long id);

	CinemaHallDTO addCinemaHall(CinemaHallDTO hallDTO);

	void deleteCinemaHall(Long id);

	CinemaHallDTO updateCinemaHall(Long id, CinemaHallDTO hallDTO);

	public List<CinemaHallDTO> searchCinemaHallsByName(String name);

	public CinemaHall associateMovieWithCinemaHall(Long cinemaHallId, Long movieId);
	
	 public List<CinemaHallDTO> findCinemaHallsByMovieAndLocation(Long movieId, String location);

	//public List<CinemaHall> findCinemaHallsByMovieAndLocation(Long movieId, String location);

//	public List<CinemaHall> findCinemaHallsByMovieAndLocation(String movieName, String location);

}