package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CinemaHallDTO;
import com.app.entities.CinemaHall;
import com.app.entities.Movie;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.CinemaHallRepository;
import com.app.repository.MovieRepository;

@Service
public class CinemaHallServiceImpl implements CinemaHallService {

	@Autowired
	private CinemaHallRepository cinemaHallRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	

	@Override
	public List<CinemaHallDTO> getAllCinemaHalls() {
		List<CinemaHall> cinemaHalls = cinemaHallRepository.findAll();
		if (cinemaHalls.isEmpty()) {
			throw new ResourceNotFoundException("No Cinema Halls found");
		}
		return cinemaHalls.stream().map(cinemaHall -> modelMapper.map(cinemaHall, CinemaHallDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public CinemaHallDTO getCinemaHallByName(String name) {
		List<CinemaHall> cinemaHalls = cinemaHallRepository.findByName(name);
		if (!cinemaHalls.isEmpty()) {
			return cinemaHalls.stream().map(cinemaHall -> modelMapper.map(cinemaHall, CinemaHallDTO.class)).findFirst()
					.orElseThrow(() -> new ResourceNotFoundException("cinema hall not found"));
		}
		 throw new ResourceNotFoundException("Cinema Hall Not found"); // Or throw an exception if needed
	}

	@Override
	public CinemaHallDTO findCinemaHallById(Long id) {
		Optional<CinemaHall> cinemaHallOpt = cinemaHallRepository.findById(id);
        CinemaHall cinemaHall = cinemaHallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CinemaHall not found with id " + id));

        CinemaHallDTO cinemaHallDTO = modelMapper.map(cinemaHall, CinemaHallDTO.class);
        

        cinemaHallDTO.setId(cinemaHall.getCinemaHallId());
        
        // Explicitly set the movieId if needed
        if (cinemaHall.getMovie() != null) {
            cinemaHallDTO.setMovieId(cinemaHall.getMovie().getMovieId());
        }

        return cinemaHallDTO;
	}

	@Override
	public CinemaHallDTO addCinemaHall(CinemaHallDTO hallDTO) {
		CinemaHall cinemaHall = modelMapper.map(hallDTO, CinemaHall.class);
		CinemaHall savedCinemaHall = cinemaHallRepository.save(cinemaHall);
		return modelMapper.map(savedCinemaHall, CinemaHallDTO.class);
	}

	@Override
	public void deleteCinemaHall(Long id) {
		if (cinemaHallRepository.existsById(id)) {
			cinemaHallRepository.deleteById(id);
		} else {
			throw new ResourceNotFoundException("cinemaHall not found");
		}

	}

	@Override
	public CinemaHallDTO updateCinemaHall(Long id, CinemaHallDTO hallDTO) {
		// Fetch existing cinema hall
		Optional<CinemaHall> cinemaHallOpt = cinemaHallRepository.findById(id);
		if (cinemaHallOpt.isPresent()) {
			CinemaHall existingCinemaHall = cinemaHallOpt.get();

			// Update fields only if they are present in the DTO
			if (hallDTO.getName() != null && !hallDTO.getName().equals("")) {
				existingCinemaHall.setName(hallDTO.getName());
			}
			if (hallDTO.getLocation() != null && !hallDTO.getLocation().equals("")) {
				existingCinemaHall.setLocation(hallDTO.getLocation());
			}

			// Save the updated cinema hall
			CinemaHall updatedCinemaHall = cinemaHallRepository.save(existingCinemaHall);

			// Return updated DTO
			return modelMapper.map(updatedCinemaHall, CinemaHallDTO.class);
		} else {
			throw new ResourceNotFoundException("cinema hall not found"); // Or throw an exception if needed
		}
	}

	@Override
	public List<CinemaHallDTO> searchCinemaHallsByName(String name) {

	    List<CinemaHall> cinemaHalls = cinemaHallRepository.findByNameContainingIgnoreCase(name);
	    if (cinemaHalls.isEmpty()) {
	        throw new ResourceNotFoundException("No Cinema Halls found with name containing: " + name);
	    }

	    // Manually map the id to cinemaHallId in the DTO
	    return cinemaHalls.stream().map(cinemaHall -> {
	        CinemaHallDTO cinemaHallDTO = modelMapper.map(cinemaHall, CinemaHallDTO.class);
	        cinemaHallDTO.setId(cinemaHall.getCinemaHallId()); // Ensure id is correctly set
	        return cinemaHallDTO;
	    }).collect(Collectors.toList());
	}

	@Override
	public CinemaHall associateMovieWithCinemaHall(Long cinemaHallId, Long movieId) {
		CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallId)
				.orElseThrow(() -> new ResourceNotFoundException("Cinema Hall not found"));

		Movie movie = movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

		cinemaHall.setMovie(movie);

		return cinemaHallRepository.save(cinemaHall);

	}
	
	
    public List<CinemaHallDTO> findCinemaHallsByMovieAndLocation(Long movieId, String location) {
        List<CinemaHall> cinemaHalls = cinemaHallRepository.findByMovie_MovieIdAndLocation(movieId, location);
        return cinemaHalls.stream()
                .map(this::convertToCinemaHallDTO)
                .collect(Collectors.toList());
    }

    private CinemaHallDTO convertToCinemaHallDTO(CinemaHall cinemaHall) {
        CinemaHallDTO dto = new CinemaHallDTO();
        dto.setId(cinemaHall.getCinemaHallId());
        dto.setName(cinemaHall.getName());
        dto.setLocation(cinemaHall.getLocation());
        dto.setMovieId(cinemaHall.getMovie() != null ? cinemaHall.getMovie().getMovieId() : null);
        return dto;
    }
	
	

}