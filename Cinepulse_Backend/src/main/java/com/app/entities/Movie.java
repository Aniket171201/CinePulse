package com.app.entities;

import java.time.LocalDate;
import java.util.Set;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "movie", indexes = { @Index(name = "idx_movie_id", columnList = "id") })
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long movieId;

	@NotBlank(message = "Name is mandatory")
	@Size(min = 1, max = 255, message = "Name must be between 1 and 255 characters")
	private String name;

	@Column(name = "thumbnail")
	@NotNull(message = "Thumbnail is mandatory")
	private String thumbnail;

	@Column(name = "background_image")
	@NotNull(message = "Background image is mandatory")
	private String backgroundImage;

	@NotBlank(message = "Description is mandatory")
	private String description;

	@NotNull(message = "Release date is mandatory")
	private LocalDate releaseDate;


	@Enumerated(EnumType.STRING)
	@NotNull(message = "Formats are mandatory")
	private Formats formats;

	@Enumerated(EnumType.STRING)
	@NotNull(message = "Languages are mandatory")
	private Languages languages;


	@Enumerated(EnumType.STRING)
    @NotNull(message = "Genres are mandatory")
	private Genres genres;

	@Enumerated(EnumType.STRING)
	//@NotNull(message = "Certificate is mandatory")
	private Certificate certificate;

	@Enumerated(EnumType.STRING)
	@NotNull(message = "Type is mandatory")
	private Type type;

	private Double rating;

	@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	@JsonManagedReference
	private Set<Rating> ratings;

	@OneToMany(mappedBy = "movie", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<CinemaHall> cinemaHalls;

	public Movie() {
		super();
	}

	public Movie(Long movieId, String name, String thumbnail, String backgroundImage, String description,
			LocalDate releaseDate, Formats formats, Languages languages, Genres genres, Certificate certificate,
			Type type, Set<Rating> ratings) {
		super();
		this.movieId = movieId;
		this.name = name;
		this.thumbnail = thumbnail;
		this.backgroundImage = backgroundImage;
		this.description = description;
		this.releaseDate = releaseDate;
		this.formats = formats;
		this.languages = languages;
		this.genres = genres;
		this.certificate = certificate;
		this.type = type;
		this.ratings = ratings;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String bs) {
		this.thumbnail = bs;
	}

	public String getBackgroundImage() {
		return backgroundImage;
	}

	public void setBackgroundImage(String bs) {
		this.backgroundImage = bs;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(LocalDate releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Formats getFormats() {
		return formats;
	}

	public void setFormats(Formats formats) {
		this.formats = formats;
	}

	public Languages getLanguages() {
		return languages;
	}

	public void setLanguages(Languages languages) {
		this.languages = languages;
	}

	public Genres getGenres() {
		return genres;
	}

	public void setGenres(Genres genres) {
		this.genres = genres;
	}

	public Certificate getCertificate() {
		return certificate;
	}

	public void setCertificate(Certificate certificate) {
		this.certificate = certificate;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Set<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(Set<Rating> ratings) {
		this.ratings = ratings;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public List<CinemaHall> getCinemaHalls() {
		return cinemaHalls;
	}

	public void setCinemaHalls(List<CinemaHall> cinemaHalls) {
		this.cinemaHalls = cinemaHalls;
	}

	@Override
	public String toString() {
		return "Movie [movieId=" + movieId + ", name=" + name + ", thumbnail=" + thumbnail + ", backgroundImage="
				+ backgroundImage + ", description=" + description + ", releaseDate=" + releaseDate + ", formats="
				+ formats + ", languages=" + languages + ", genres=" + genres + ", certificate=" + certificate
				+ ", type=" + type + ", rating=" + rating + ", ratings=" + ratings + ", cinemaHalls=" + cinemaHalls
				+ "]";
	}

	

	
}