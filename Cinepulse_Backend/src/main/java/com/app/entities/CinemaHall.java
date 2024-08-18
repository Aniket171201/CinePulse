package com.app.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class CinemaHall {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cinemaHallId;

	private String name;

	private String location;

	@OneToMany(mappedBy = "cinemaHall" ,cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	private Set<Show> shows;

	@ManyToOne()
	@JoinColumn(name = "movie_id", nullable = true)
	@JsonBackReference
	private Movie movie;

	public CinemaHall() {
		super();
	}

	public CinemaHall(String name, String location, Set<Show> shows) {
		super();
		this.name = name;
		this.location = location;
		this.shows = shows;
	}

	public Long getCinemaHallId() {
		return cinemaHallId;
	}

	public void setCinemaHallId(Long cinemaHallId) {
		this.cinemaHallId = cinemaHallId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Set<Show> getShows() {
		return shows;
	}

	public void setShows(Set<Show> shows) {
		this.shows = shows;
	}

	
	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	@Override
	public String toString() {
		return "CinemaHall [cinemaHallId=" + cinemaHallId + ", name=" + name + ", location=" + location + ", shows="
				+ shows + ", movie=" + movie + "]";
	}
	
	

}