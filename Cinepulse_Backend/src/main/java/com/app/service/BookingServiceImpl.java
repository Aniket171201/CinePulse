//package com.app.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import javax.persistence.EntityNotFoundException;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.app.dto.BookingDTO;
//import com.app.entities.Booking;
//import com.app.entities.Show;
//import com.app.entities.User;
//import com.app.repository.BookingRepository;
//import com.app.repository.ShowRepository;
//import com.app.repository.UserRepository;
//
//import io.jsonwebtoken.lang.Collections;
//
//@Service
//@Transactional
//public class BookingServiceImpl implements BookingService {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ShowRepository showRepository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Override
//    public BookingDTO createBooking(BookingDTO bookingDTO) {
//        // Fetch User and Show entities
//        User user = userRepository.findById(bookingDTO.getUserId())
//                .orElseThrow(() -> new EntityNotFoundException("User not found"));
//        Show show = showRepository.findById(bookingDTO.getShowId())
//                .orElseThrow(() -> new EntityNotFoundException("Show not found"));
//        
//
//        // Check if enough seats are available
//        if (show.getAvailableSeats() < bookingDTO.getSeats()) {
//            throw new RuntimeException("Not enough seats available for this show");
//        }
//
//        // Create Booking entity and set relationships
//        Booking booking = modelMapper.map(bookingDTO, Booking.class);
//        booking.setUser(user);
//        booking.setShow(show);
//
//        // Reduce available seats in the show
//        show.setAvailableSeats(show.getAvailableSeats() - bookingDTO.getSeats());
//        showRepository.save(show); // Update the show in the database
//
//        // Save the booking
//        Booking savedBooking = bookingRepository.save(booking);
//        
//        // Log the booking details to verify
//        System.out.println("Saved Booking ID: " + savedBooking.getId());
//        
//        // Map to DTO
//        BookingDTO resultDTO = modelMapper.map(savedBooking, BookingDTO.class);
//        resultDTO.setUserId(savedBooking.getUser().getUserId());
//        resultDTO.setShowId(savedBooking.getShow().getShowId());
//        resultDTO.setBookingId(savedBooking.getId());
//        
//        // Log the resultDTO to verify
//        System.out.println("BookingDTO ID: " + resultDTO.getBookingId());
//
//        return resultDTO;
//    }
//
//
//    @Override
//    public BookingDTO updateBooking(Long bookingId, BookingDTO bookingDTO) {
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
//
//        // Handle potential changes in the number of seats booked
//        int seatsDifference = bookingDTO.getSeats() - booking.getSeats();
//        if (seatsDifference != 0) {
//            Show show = booking.getShow();
//            if (seatsDifference > 0 && show.getAvailableSeats() < seatsDifference) {
//                throw new RuntimeException("Not enough seats available for this update");
//            }
//            show.setAvailableSeats(show.getAvailableSeats() - seatsDifference);
//            showRepository.save(show);
//        }
//
//        // Map fields from DTO to entity (excluding IDs)
//        modelMapper.map(bookingDTO, booking);
//
//        Booking updatedBooking = bookingRepository.save(booking);
//        return modelMapper.map(updatedBooking, BookingDTO.class);
//    }
//
//    @Override
//    public void deleteBooking(Long bookingId) {
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
//
//        // Increase available seats in the show
//        Show show = booking.getShow();
//        show.setAvailableSeats(show.getAvailableSeats() + booking.getSeats());
//        showRepository.save(show);
//
//        bookingRepository.delete(booking);
//    }
//
//    @Override
//    public BookingDTO getBookingById(Long bookingId) {
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
//
//        // Ensure that all required fields in the Booking entity are not null
//        if (booking.getUser() == null || booking.getShow() == null) {
//            throw new RuntimeException("Booking has incomplete data");
//        }
//
//        // Map to DTO
//        BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
//
//        // Ensure all required fields in the DTO are set
//        if (bookingDTO.getBookingId() == null) {
//            bookingDTO.setBookingId(booking.getId());
//        }
//        if (bookingDTO.getUserId() == null) {
//            bookingDTO.setUserId(booking.getUser().getUserId());
//        }
//        if (bookingDTO.getShowId() == null) {
//            bookingDTO.setShowId(booking.getShow().getShowId());
//        }
//
//        // Log the result to verify
//        System.out.println("BookingDTO: " + bookingDTO);
//
//        return bookingDTO;
//    }
//
//
//    @Override
//    public List<BookingDTO> getBookingsByUserId(Long userId) {
//        List<Booking> bookings = bookingRepository.findByUser_UserId(userId);
//
//        // Check if bookings list is empty or null
//        if (bookings == null || bookings.isEmpty()) {
//            return null; // Return an empty list if no bookings found
//        }
//
//        List<BookingDTO> bookingDTOs = bookings.stream()
//                .map(booking -> {
//                    // Ensure non-null values in the Booking entity
//                    if (booking.getUser() == null || booking.getShow() == null) {
//                        throw new RuntimeException("Booking data is incomplete for bookingId: " + booking.getId());
//                    }
//
//                    // Map to DTO
//                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
//
//                    // Ensure all required fields in the DTO are set
//                    if (bookingDTO.getBookingId() == null) {
//                        bookingDTO.setBookingId(booking.getId());
//                    }
//                    if (bookingDTO.getUserId() == null) {
//                        bookingDTO.setUserId(booking.getUser().getUserId());
//                    }
//                    if (bookingDTO.getShowId() == null) {
//                        bookingDTO.setShowId(booking.getShow().getShowId());
//                    }
//
//                    return bookingDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Log the result to verify
//        System.out.println("BookingDTOs: " + bookingDTOs);
//
//        return bookingDTOs;
//    }
//
//
//    @Override
//    public List<BookingDTO> getBookingsByShowId(Long showId) {
//        List<Booking> bookings = bookingRepository.findByShow_ShowId(showId);
//
//        // Check if bookings list is empty or null
//        if (bookings == null || bookings.isEmpty()) {
//            return null; // Return an empty list if no bookings found
//        }
//
//        List<BookingDTO> bookingDTOs = bookings.stream()
//                .map(booking -> {
//                    // Ensure non-null values in the Booking entity
//                    if (booking.getUser() == null || booking.getShow() == null) {
//                        throw new RuntimeException("Booking data is incomplete for bookingId: " + booking.getId());
//                    }
//
//                    // Map to DTO
//                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
//
//                    // Ensure all required fields in the DTO are set
//                    if (bookingDTO.getBookingId() == null) {
//                        bookingDTO.setBookingId(booking.getId());
//                    }
//                    if (bookingDTO.getUserId() == null) {
//                        bookingDTO.setUserId(booking.getUser().getUserId());
//                    }
//                    if (bookingDTO.getShowId() == null) {
//                        bookingDTO.setShowId(booking.getShow().getShowId());
//                    }
//
//                    return bookingDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Log the result to verify
//        System.out.println("BookingDTOs: " + bookingDTOs);
//
//        return bookingDTOs;
//    }
//
//}




//
//
//package com.app.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import javax.persistence.EntityNotFoundException;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.app.dto.BookingDTO;
//import com.app.entities.Booking;
//import com.app.entities.Show;
//import com.app.entities.User;
//import com.app.repository.BookingRepository;
//import com.app.repository.ShowRepository;
//import com.app.repository.UserRepository;
//
//import io.jsonwebtoken.lang.Collections;
//
//@Service
//@Transactional
//public class BookingServiceImpl implements BookingService {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ShowRepository showRepository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Override
//    public BookingDTO createBooking(BookingDTO bookingDTO) {
//        // Fetch User and Show entities
//        User user = userRepository.findById(bookingDTO.getUserId())
//                .orElseThrow(() -> new EntityNotFoundException("User not found"));
//        Show show = showRepository.findById(bookingDTO.getShowId())
//                .orElseThrow(() -> new EntityNotFoundException("Show not found"));
//        
//
//        // Check if enough seats are available
//        if (show.getAvailableSeats() < bookingDTO.getSeats()) {
//            throw new RuntimeException("Not enough seats available for this show");
//        }
//
//        // Create Booking entity and set relationships
//        Booking booking = modelMapper.map(bookingDTO, Booking.class);
//        booking.setUser(user);
//        booking.setShow(show);
//
//        // Reduce available seats in the show
//        show.setAvailableSeats(show.getAvailableSeats() - bookingDTO.getSeats());
//        showRepository.save(show); // Update the show in the database
//
//        // Save the booking
//        Booking savedBooking = bookingRepository.save(booking);
//        
//        // Log the booking details to verify
//        System.out.println("Saved Booking ID: " + savedBooking.getId());
//        
//        // Map to DTO
//        BookingDTO resultDTO = modelMapper.map(savedBooking, BookingDTO.class);
//        resultDTO.setUserId(savedBooking.getUser().getUserId());
//        resultDTO.setShowId(savedBooking.getShow().getShowId());
//        resultDTO.setBookingId(savedBooking.getId());
//        
//        // Log the resultDTO to verify
//        System.out.println("BookingDTO ID: " + resultDTO.getBookingId());
//
//        return resultDTO;
//    }
//
//
//    @Override
//    public BookingDTO updateBooking(Long bookingId, BookingDTO bookingDTO) {
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
//
//        // Handle potential changes in the number of seats booked
//        int seatsDifference = bookingDTO.getSeats() - booking.getSeats();
//        if (seatsDifference != 0) {
//            Show show = booking.getShow();
//            if (seatsDifference > 0 && show.getAvailableSeats() < seatsDifference) {
//                throw new RuntimeException("Not enough seats available for this update");
//            }
//            show.setAvailableSeats(show.getAvailableSeats() - seatsDifference);
//            showRepository.save(show);
//        }
//
//        // Map fields from DTO to entity (excluding IDs)
//        modelMapper.map(bookingDTO, booking);
//
//        Booking updatedBooking = bookingRepository.save(booking);
//        return modelMapper.map(updatedBooking, BookingDTO.class);
//    }
//
//    @Override
//    public void deleteBooking(Long bookingId) {
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
//
//        // Increase available seats in the show
//        Show show = booking.getShow();
//        show.setAvailableSeats(show.getAvailableSeats() + booking.getSeats());
//        showRepository.save(show);
//
//        bookingRepository.delete(booking);
//    }
//
//    @Override
//    public BookingDTO getBookingById(Long bookingId) {
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
//
//        // Ensure that all required fields in the Booking entity are not null
//        if (booking.getUser() == null || booking.getShow() == null) {
//            throw new RuntimeException("Booking has incomplete data");
//        }
//
//        // Map to DTO
//        BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
//
//        // Ensure all required fields in the DTO are set
//        if (bookingDTO.getBookingId() == null) {
//            bookingDTO.setBookingId(booking.getId());
//        }
//        if (bookingDTO.getUserId() == null) {
//            bookingDTO.setUserId(booking.getUser().getUserId());
//        }
//        if (bookingDTO.getShowId() == null) {
//            bookingDTO.setShowId(booking.getShow().getShowId());
//        }
//
//        // Log the result to verify
//        System.out.println("BookingDTO: " + bookingDTO);
//
//        return bookingDTO;
//    }
//
//
//    @Override
//    public List<BookingDTO> getBookingsByUserId(Long userId) {
//        List<Booking> bookings = bookingRepository.findByUser_UserId(userId);
//
//        // Check if bookings list is empty or null
//        if (bookings == null || bookings.isEmpty()) {
//            return null; // Return an empty list if no bookings found
//        }
//
//        List<BookingDTO> bookingDTOs = bookings.stream()
//                .map(booking -> {
//                    // Ensure non-null values in the Booking entity
//                    if (booking.getUser() == null || booking.getShow() == null) {
//                        throw new RuntimeException("Booking data is incomplete for bookingId: " + booking.getId());
//                    }
//
//                    // Map to DTO
//                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
//
//                    // Ensure all required fields in the DTO are set
//                    if (bookingDTO.getBookingId() == null) {
//                        bookingDTO.setBookingId(booking.getId());
//                    }
//                    if (bookingDTO.getUserId() == null) {
//                        bookingDTO.setUserId(booking.getUser().getUserId());
//                    }
//                    if (bookingDTO.getShowId() == null) {
//                        bookingDTO.setShowId(booking.getShow().getShowId());
//                    }
//
//                    return bookingDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Log the result to verify
//        System.out.println("BookingDTOs: " + bookingDTOs);
//
//        return bookingDTOs;
//    }
//
//
//    @Override
//    public List<BookingDTO> getBookingsByShowId(Long showId) {
//        List<Booking> bookings = bookingRepository.findByShow_ShowId(showId);
//
//        // Check if bookings list is empty or null
//        if (bookings == null || bookings.isEmpty()) {
//            return null; // Return an empty list if no bookings found
//        }
//
//        List<BookingDTO> bookingDTOs = bookings.stream()
//                .map(booking -> {
//                    // Ensure non-null values in the Booking entity
//                    if (booking.getUser() == null || booking.getShow() == null) {
//                        throw new RuntimeException("Booking data is incomplete for bookingId: " + booking.getId());
//                    }
//
//                    // Map to DTO
//                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
//
//                    // Ensure all required fields in the DTO are set
//                    if (bookingDTO.getBookingId() == null) {
//                        bookingDTO.setBookingId(booking.getId());
//                    }
//                    if (bookingDTO.getUserId() == null) {
//                        bookingDTO.setUserId(booking.getUser().getUserId());
//                    }
//                    if (bookingDTO.getShowId() == null) {
//                        bookingDTO.setShowId(booking.getShow().getShowId());
//                    }
//
//                    return bookingDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Log the result to verify
//        System.out.println("BookingDTOs: " + bookingDTOs);
//
//        return bookingDTOs;
//    }
//
//}








package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BookingDTO;
import com.app.entities.Booking;
import com.app.entities.Show;
import com.app.entities.User;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.BookingRepository;
import com.app.repository.ShowRepository;
import com.app.repository.UserRepository;

import io.jsonwebtoken.lang.Collections;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Fetch User and Show entities
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Show show = showRepository.findById(bookingDTO.getShowId())
                .orElseThrow(() -> new EntityNotFoundException("Show not found"));
        

        // Check if enough seats are available
        if (show.getAvailableSeats() < bookingDTO.getSeats()) {
            throw new ResourceNotFoundException("Not enough seats available for this show");
        }

        // Create Booking entity and set relationships
        Booking booking = modelMapper.map(bookingDTO, Booking.class);
        booking.setUser(user);
        booking.setShow(show);

        // Reduce available seats in the show
        show.setAvailableSeats(show.getAvailableSeats() - bookingDTO.getSeats());
        showRepository.save(show); // Update the show in the database

        // Save the booking
        Booking savedBooking = bookingRepository.save(booking);
        
        // No need to calculate totalPrice, just use the value from the DTO
        int totalPrice = bookingDTO.getTotalPrice();
        
        // Log the booking details to verify
        System.out.println("Saved Booking ID: " + savedBooking.getId());
        
        // Map to DTO
        BookingDTO resultDTO = modelMapper.map(savedBooking, BookingDTO.class);
        resultDTO.setUserId(savedBooking.getUser().getUserId());
        resultDTO.setShowId(savedBooking.getShow().getShowId());
        resultDTO.setBookingId(savedBooking.getId());
        
        // Log the resultDTO to verify
        System.out.println("BookingDTO ID: " + resultDTO.getBookingId());

        return resultDTO;
    }


    @Override
    public BookingDTO updateBooking(Long bookingId, BookingDTO bookingDTO) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        // Handle potential changes in the number of seats booked
        int seatsDifference = bookingDTO.getSeats() - booking.getSeats();
        if (seatsDifference != 0) {
            Show show = booking.getShow();
            if (seatsDifference > 0 && show.getAvailableSeats() < seatsDifference) {
                throw new RuntimeException("Not enough seats available for this update");
            }
            show.setAvailableSeats(show.getAvailableSeats() - seatsDifference);
            showRepository.save(show);
        }

        // Map fields from DTO to entity (excluding IDs)
        modelMapper.map(bookingDTO, booking);

        Booking updatedBooking = bookingRepository.save(booking);
        return modelMapper.map(updatedBooking, BookingDTO.class);
    }

    @Override
    public void deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        // Increase available seats in the show
        Show show = booking.getShow();
        show.setAvailableSeats(show.getAvailableSeats() + booking.getSeats());
        showRepository.save(show);

        bookingRepository.delete(booking);
    }

    @Override
    public BookingDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        // Ensure that all required fields in the Booking entity are not null
        if (booking.getUser() == null || booking.getShow() == null) {
            throw new ResourceNotFoundException("Booking has incomplete data");
        }

        // Map to DTO
        BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);

        // Ensure all required fields in the DTO are set
        if (bookingDTO.getBookingId() == null) {
            bookingDTO.setBookingId(booking.getId());
        }
        if (bookingDTO.getUserId() == null) {
            bookingDTO.setUserId(booking.getUser().getUserId());
        }
        if (bookingDTO.getShowId() == null) {
            bookingDTO.setShowId(booking.getShow().getShowId());
        }

        // Log the result to verify
        System.out.println("BookingDTO: " + bookingDTO);

        return bookingDTO;
    }


    @Override
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUser_UserId(userId);

        // Check if bookings list is empty or null
        if (bookings == null || bookings.isEmpty()) {
            return null; // Return an empty list if no bookings found
        }

        List<BookingDTO> bookingDTOs = bookings.stream()
                .map(booking -> {
                    // Ensure non-null values in the Booking entity
                    if (booking.getUser() == null || booking.getShow() == null) {
                        throw new ResourceNotFoundException("Booking data is incomplete for bookingId: " + booking.getId());
                    }

                    // Map to DTO
                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);

                    // Ensure all required fields in the DTO are set
                    if (bookingDTO.getBookingId() == null) {
                        bookingDTO.setBookingId(booking.getId());
                    }
                    if (bookingDTO.getUserId() == null) {
                        bookingDTO.setUserId(booking.getUser().getUserId());
                    }
                    if (bookingDTO.getShowId() == null) {
                        bookingDTO.setShowId(booking.getShow().getShowId());
                    }

                    return bookingDTO;
                })
                .collect(Collectors.toList());

        // Log the result to verify
        System.out.println("BookingDTOs: " + bookingDTOs);

        return bookingDTOs;
    }


    @Override
    public List<BookingDTO> getBookingsByShowId(Long showId) {
        List<Booking> bookings = bookingRepository.findByShow_ShowId(showId);

        // Check if bookings list is empty or null
        if (bookings == null || bookings.isEmpty()) {
            return null; // Return an empty list if no bookings found
        }

        List<BookingDTO> bookingDTOs = bookings.stream()
                .map(booking -> {
                    // Ensure non-null values in the Booking entity
                    if (booking.getUser() == null || booking.getShow() == null) {
                        throw new ResourceNotFoundException("Booking data is incomplete for bookingId: " + booking.getId());
                    }

                    // Map to DTO
                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);

                    // Ensure all required fields in the DTO are set
                    if (bookingDTO.getBookingId() == null) {
                        bookingDTO.setBookingId(booking.getId());
                    }
                    if (bookingDTO.getUserId() == null) {
                        bookingDTO.setUserId(booking.getUser().getUserId());
                    }
                    if (bookingDTO.getShowId() == null) {
                        bookingDTO.setShowId(booking.getShow().getShowId());
                    }

                    return bookingDTO;
                })
                .collect(Collectors.toList());

        // Log the result to verify
        System.out.println("BookingDTOs: " + bookingDTOs);

        return bookingDTOs;
    }

}