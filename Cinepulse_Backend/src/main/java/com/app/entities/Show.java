


package com.app.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "movie_show")
public class Show {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long showId;

	private LocalDateTime showTime;

	private Integer availableSeats;

	@ManyToOne
	@JoinColumn(name = "cinema_hall_id", nullable = false)
	private CinemaHall cinemaHall;

	@OneToMany(mappedBy = "show",cascade = CascadeType.ALL)
	private Set<Booking> bookings;

	@ElementCollection
	@MapKeyColumn(name = "seat_number")
	@Column(name = "is_booked")
	@CollectionTable(name = "show_seats", joinColumns = @JoinColumn(name = "show_id"))
	private Map<String, Boolean> seats = new HashMap<>();

	public Show() {
		super();
	}

	public Show(LocalDateTime showTime, Integer availableSeats, CinemaHall cinemaHall, Set<Booking> bookings) {
		super();
		this.showTime = showTime;
		this.availableSeats = availableSeats;
		this.cinemaHall = cinemaHall;
		this.bookings = bookings;
		
		// Initialize seats map with default values (false = not booked)
	    for (int row = 0; row < 5; row++) { // Assuming 5 rows (A to E)
	        for (int col = 0; col < 8; col++) { // Assuming 8 columns (1 to 8)
	            String seatNumber = (char)('A' + row) + Integer.toString(col + 1);
	            seats.put(seatNumber, false);
	        }
	    }
		System.out.println("\nCTORcalled\n");

	}
	
	
	
	

	public void bookSeats(List<String> seatNumbers) {
		int seatsToBook = seatNumbers.size();
		
		// Temporary workaround: Initialize seats map if it's empty
	    if (seats.isEmpty()) {
	        for (int row = 0; row < 5; row++) {
	            for (int col = 0; col < 8; col++) {
	                String seatNumber = (char)('A' + row) + Integer.toString(col + 1);
	                seats.put(seatNumber, false);
	            }
	        }}

		// Check if enough seats are available
		if (availableSeats < seatsToBook) {
			throw new IllegalArgumentException("Not enough seats available");
		}

		// Book seats
		for (String seat : seatNumbers) {
		    if (!seats.containsKey(seat)) {
		        throw new IllegalArgumentException("Seat " + seat + " does not exist");
		    } else if (seats.get(seat)) {
		        throw new IllegalArgumentException("Seat " + seat + " is already booked");
		    }
		}
		// Update available seats
		availableSeats -= seatsToBook;
		
		 // Book seats and trigger dirty checking
	    Map<String, Boolean> updatedSeats = new HashMap<>(seats); // Create a copy
	    for (String seat : seatNumbers) {
	        // ... existing booking logic ...
	        updatedSeats.put(seat, true);
	    }
	    seats = updatedSeats; // Reassign the map

	}
	
	
	
	

	// Optionally, a method to cancel booking
	public void cancelSeats(List<String> seatNumbers) {
		int seatsToCancel = seatNumbers.size();

		// Check if seats are booked
		for (String seat : seatNumbers) {
			if (!seats.containsKey(seat) || !seats.get(seat)) {
				throw new IllegalArgumentException("Seat " + seat + " is not booked");
			}
			seats.put(seat, false);
		}

		// Update available seats
		availableSeats += seatsToCancel;
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

	public int getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}

	public CinemaHall getCinemaHall() {
		return cinemaHall;
	}

	public void setCinemaHall(CinemaHall cinemaHall) {
		this.cinemaHall = cinemaHall;
	}

	public Set<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(Set<Booking> bookings) {
		this.bookings = bookings;
	}

	public Map<String, Boolean> getSeats() {
		return seats;
	}

	public void setSeats(Map<String, Boolean> seats) {
		this.seats = seats;
	}

	@Override
	public String toString() {
		return "Show [showId=" + showId + ", showTime=" + showTime + ", availableSeats=" + availableSeats + ", movie="
				+ ", cinemaHall=" + cinemaHall + ", bookings=" + bookings + "]";
	}

}