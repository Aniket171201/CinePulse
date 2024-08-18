//package com.app.service;
//
//import java.util.List;
//import java.util.Map;
//
//import com.app.dto.ShowDTO;
//
//public interface ShowService {
//
//    ShowDTO createShow(ShowDTO showDTO);
//
//    public ShowDTO updateShow(Long showId, ShowDTO showDTO);
//
//    void deleteShow(Long showId);
//
//    ShowDTO getShowById(Long showId);
//
//    List<ShowDTO> getShowsByCinemaHallId(Long cinemaHallId);
//
//    List<ShowDTO> getShowsByMovieIdAndLocation(Long movieId, String location);
//    
//    public ShowDTO bookSeats(Long showId, List<String> seatNumbers);
//}




package com.app.service;

import java.util.List;
import java.util.Map;

import com.app.dto.ShowDTO;

public interface ShowService {

    ShowDTO createShow(ShowDTO showDTO);

    public ShowDTO updateShow(Long showId, ShowDTO showDTO);

    void deleteShow(Long showId);

    ShowDTO getShowById(Long showId);

    List<ShowDTO> getShowsByCinemaHallId(Long cinemaHallId);

    List<ShowDTO> getShowsByMovieIdAndLocation(Long movieId, String location);
    
    public ShowDTO bookSeats(Long showId, List<String> seatNumbers);
}