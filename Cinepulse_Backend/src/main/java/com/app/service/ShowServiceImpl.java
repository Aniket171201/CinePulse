//package com.app.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import javax.persistence.EntityNotFoundException;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.app.dto.ShowDTO;
//import com.app.entities.CinemaHall;
//import com.app.entities.Movie;
//import com.app.entities.Show;
//import com.app.exception.ResourceNotFoundException;
//import com.app.repository.CinemaHallRepository;
//import com.app.repository.MovieRepository;
//import com.app.repository.ShowRepository;
//
//@Service
//@Transactional
//public class ShowServiceImpl implements ShowService {
//
//	@Autowired
//	private ShowRepository showRepository;
//
//	@Autowired
//	private CinemaHallRepository cinemaHallRepository;
//
//	@Autowired
//	private MovieRepository movieRepository;
//
//	@Autowired
//	private ModelMapper modelMapper;
//
//	@Override
//	public ShowDTO createShow(ShowDTO showDTO) {
//		CinemaHall cinemaHall = cinemaHallRepository.findById(showDTO.getCinemaHallId())
//				.orElseThrow(() -> new EntityNotFoundException("Cinema Hall not found"));
//		Movie movie = movieRepository.findById(showDTO.getMovieId())
//				.orElseThrow(() -> new EntityNotFoundException("Movie not found"));
//
//		Show show = modelMapper.map(showDTO, Show.class);
//		show.setCinemaHall(cinemaHall);
//
//
//		Show savedShow = showRepository.save(show);
//		return modelMapper.map(savedShow, ShowDTO.class);
//	}
//
//	@Override
//	public ShowDTO updateShow(Long showId, ShowDTO showDTO) {
//		Show existingShow = showRepository.findById(showId)
//				.orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + showId));
//
//		// Apply updates only if the new value is not null
//		if (showDTO.getShowTime() != null) {
//			existingShow.setShowTime(showDTO.getShowTime());
//		}
//
//		if (showDTO.getAvailableSeats() != null) {
//			existingShow.setAvailableSeats(showDTO.getAvailableSeats());
//		}
//
//		// Save the updated show
//		Show updatedShow = showRepository.save(existingShow);
//
//		// Convert the updated entity to DTO
//		return modelMapper.map(updatedShow, ShowDTO.class);
//	}
//
////	@Override
////	public void deleteShow(Long showId) {
////		if (showRepository.existsById(showId)) {
////			showRepository.deleteById(showId);
////		} else {
////			throw new EntityNotFoundException("Show not found");
////		}
////	}
//	
//	
//	 @Transactional
//	    @Override
//	    public void deleteShow(Long showId) {
//	        // Check if the show exists before attempting to delete
//	        if (showRepository.existsById(showId)) {
//	            // Use the custom query to delete the show
//	            showRepository.deleteByShowId(showId);
//	        } else {
//	            throw new ResourceNotFoundException("Show with id " + showId + " not found");
//	        }
//	    }
//
//	@Override
//	public ShowDTO getShowById(Long showId) {
//		Show show = showRepository.findById(showId).orElseThrow(() -> new EntityNotFoundException("Show not found"));
//		return modelMapper.map(show, ShowDTO.class);
//	}
//
//	@Override
//	public List<ShowDTO> getShowsByCinemaHallId(Long cinemaHallId) {
//		CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallId)
//				.orElseThrow(() -> new EntityNotFoundException("Cinema Hall not found"));
//
//		List<Show> shows = cinemaHall.getShows().stream().collect(Collectors.toList());
//		// Populate the movieId and cinemaHallId for each ShowDTO
//		return shows.stream().map(show -> {
//			ShowDTO dto = modelMapper.map(show, ShowDTO.class);
//			dto.setMovieId(show.getCinemaHall().getMovie().getMovieId()); // Assuming getMovie() exists
//			dto.setCinemaHallId(show.getCinemaHall().getCinemaHallId());
//			return dto;
//		}).collect(Collectors.toList());
//	}
//
//	@Override
//	public List<ShowDTO> getShowsByMovieIdAndLocation(Long movieId, String location) {
//		return showRepository.findByMovieIdAndLocation(movieId, location).stream().map(show -> {
//			ShowDTO dto = modelMapper.map(show, ShowDTO.class);
//			dto.setMovieId(show.getCinemaHall().getMovie().getMovieId()); // Assuming getMovie() exists
//			dto.setCinemaHallId(show.getCinemaHall().getCinemaHallId());
//			return dto;
//		}).collect(Collectors.toList());
//	}
//
//	@Override
//	public ShowDTO bookSeats(Long showId, List<String> seatNumbers) {
//		Show show = showRepository.findById(showId).orElseThrow(() -> new EntityNotFoundException("Show not found"));
//
//		show.bookSeats(seatNumbers);
//		Show updatedShow = showRepository.save(show);
//
//		return modelMapper.map(updatedShow, ShowDTO.class);
//	}
//
//}







package com.app.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ShowDTO;
import com.app.entities.CinemaHall;
import com.app.entities.Movie;
import com.app.entities.Show;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.CinemaHallRepository;
import com.app.repository.MovieRepository;
import com.app.repository.ShowRepository;

@Service
@Transactional
public class ShowServiceImpl implements ShowService {

	@Autowired
	private ShowRepository showRepository;

	@Autowired
	private CinemaHallRepository cinemaHallRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ShowDTO createShow(ShowDTO showDTO) {
		CinemaHall cinemaHall = cinemaHallRepository.findById(showDTO.getCinemaHallId())
				.orElseThrow(() -> new EntityNotFoundException("Cinema Hall not found"));
		Movie movie = movieRepository.findById(showDTO.getMovieId())
				.orElseThrow(() -> new EntityNotFoundException("Movie not found"));

		Show show = modelMapper.map(showDTO, Show.class);
		show.setCinemaHall(cinemaHall);


		Show savedShow = showRepository.save(show);
		return modelMapper.map(savedShow, ShowDTO.class);
	}

	@Override
	public ShowDTO updateShow(Long showId, ShowDTO showDTO) {
		Show existingShow = showRepository.findById(showId)
				.orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + showId));

		// Apply updates only if the new value is not null
		if (showDTO.getShowTime() != null) {
			existingShow.setShowTime(showDTO.getShowTime());
		}

		if (showDTO.getAvailableSeats() != null) {
			existingShow.setAvailableSeats(showDTO.getAvailableSeats());
		}

		// Save the updated show
		Show updatedShow = showRepository.save(existingShow);

		// Convert the updated entity to DTO
		return modelMapper.map(updatedShow, ShowDTO.class);
	}

	@Override
	public void deleteShow(Long showId) {
		if (showRepository.existsById(showId)) {
			showRepository.deleteById(showId);
		} else {
			throw new EntityNotFoundException("Show not found");
		}
	}

	@Override
	public ShowDTO getShowById(Long showId) {
	    Show show = showRepository.findById(showId)
	            .orElseThrow(() -> new EntityNotFoundException("Show not found"));

	    ShowDTO showDTO = modelMapper.map(show, ShowDTO.class);

	    // Populate bookedSeats in the DTO
	    showDTO.setBookedSeats(
	        show.getSeats().entrySet().stream()
	            .filter(Map.Entry::getValue) // Filter only booked seats (true values)
	            .map(Map.Entry::getKey)      // Extract seat numbers
	            .collect(Collectors.toList())
	    );

	    return showDTO;
	}

	@Override
	public List<ShowDTO> getShowsByCinemaHallId(Long cinemaHallId) {
		CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallId)
				.orElseThrow(() -> new EntityNotFoundException("Cinema Hall not found"));

		List<Show> shows = cinemaHall.getShows().stream().collect(Collectors.toList());
		if(shows==null) {
			throw new ResourceNotFoundException("No show available for this cinema hall");
		}
		// Populate the movieId and cinemaHallId for each ShowDTO
		return shows.stream().map(show -> {
			ShowDTO dto = modelMapper.map(show, ShowDTO.class);
			dto.setMovieId(show.getCinemaHall().getMovie().getMovieId()); // Assuming getMovie() exists
			dto.setCinemaHallId(show.getCinemaHall().getCinemaHallId());
			return dto;
		}).collect(Collectors.toList());
	}

	
	
	//not handle
	@Override
	public List<ShowDTO> getShowsByMovieIdAndLocation(Long movieId, String location) {
		return showRepository.findByMovieIdAndLocation(movieId, location).stream().map(show -> {
			ShowDTO dto = modelMapper.map(show, ShowDTO.class);
			dto.setMovieId(show.getCinemaHall().getMovie().getMovieId()); // Assuming getMovie() exists
			dto.setCinemaHallId(show.getCinemaHall().getCinemaHallId());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public ShowDTO bookSeats(Long showId, List<String> seatNumbers) {
		
		
		
		Show show = showRepository.findById(showId).orElseThrow(() -> new EntityNotFoundException("Show not found"));

		show.bookSeats(seatNumbers);
		Show updatedShow = showRepository.save(show);
//		System.out.println(show.getSeats());

		return modelMapper.map(updatedShow, ShowDTO.class);
	}

}