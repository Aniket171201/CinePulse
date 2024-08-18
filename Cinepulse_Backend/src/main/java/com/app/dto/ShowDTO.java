
package com.app.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ShowDTO {
    private Long showId;
    private LocalDateTime showTime;
    private Integer availableSeats;
    private Long movieId;
    private Long cinemaHallId;
    
    
    //for record of seat booking
    private List<String> bookedSeats; 
    
    public List<String> getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(List<String> bookedSeats) {
        this.bookedSeats = bookedSeats;

    }

    public ShowDTO() {
    }

    public ShowDTO(Long showId, LocalDateTime showTime, Integer availableSeats, Long movieId, Long cinemaHallId) {
        this.showId = showId;
        this.showTime = showTime;
        this.availableSeats = availableSeats;
        this.movieId = movieId;
        this.cinemaHallId = cinemaHallId;
    }

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public LocalDateTime getShowTime() {
        return showTime;
    }

    public void setShowTime(LocalDateTime showTime) {
        this.showTime = showTime;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getCinemaHallId() {
        return cinemaHallId;
    }

    public void setCinemaHallId(Long cinemaHallId) {
        this.cinemaHallId = cinemaHallId;
    }

    @Override
    public String toString() {
        return "ShowDTO [showId=" + showId + ", showTime=" + showTime + ", availableSeats=" + availableSeats
                + ", movieId=" + movieId + ", cinemaHallId=" + cinemaHallId + "]";
    }
}