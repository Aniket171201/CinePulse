package com.app.dto;

import java.time.LocalDate;

import com.app.deserializer.GenresDeserializer;
import com.app.deserializer.LanguagesDeserializer;
import com.app.deserializer.TypeDeserializer;
import com.app.entities.Certificate;
import com.app.entities.Formats;
import com.app.entities.Genres;
import com.app.entities.Languages;
import com.app.entities.Type;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class MovieDTO {
	private Long movieId;
	private String name; 
	private String thumbnail;
	private String backgroundImage;
	private String description;
	private LocalDate releaseDate;
	private Formats formats;
	@JsonDeserialize(using = LanguagesDeserializer.class)
	private Languages languages;
	@JsonDeserialize(using = GenresDeserializer.class)
	private Genres genres;
	private Certificate certificate;
	@JsonDeserialize(using = TypeDeserializer.class)
	private Type type;
	private Double rating;

	public MovieDTO() {
	}

	public MovieDTO(String name, String thumbnail, String backgroundImage, String description,
			LocalDate releaseDate, Formats formats, Languages languages, Genres genres,
			Certificate certificate, Type type) {
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

	public void setThumbnail(String string) {
		this.thumbnail = string;
	}

	public String getBackgroundImage() {
		return backgroundImage;
	}

	public void setBackgroundImage(String string) {
		this.backgroundImage = string;
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

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	

}