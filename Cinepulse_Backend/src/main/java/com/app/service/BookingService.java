//package com.app.service;
//
//import java.util.List;
//
//import com.app.dto.BookingDTO;
//
//public interface BookingService {
//
//    BookingDTO createBooking(BookingDTO bookingDTO);
//
//    BookingDTO updateBooking(Long bookingId, BookingDTO bookingDTO);
//
//    void deleteBooking(Long bookingId);
//
//    BookingDTO getBookingById(Long bookingId);
//
//    List<BookingDTO> getBookingsByUserId(Long userId);
//
//    List<BookingDTO> getBookingsByShowId(Long showId);
//}

//
//package com.app.service;
//
//import java.util.List;
//
//import com.app.dto.BookingDTO;
//
//public interface BookingService {
//
//    BookingDTO createBooking(BookingDTO bookingDTO);
//
//    BookingDTO updateBooking(Long bookingId, BookingDTO bookingDTO);
//
//    void deleteBooking(Long bookingId);
//
//    BookingDTO getBookingById(Long bookingId);
//
//    List<BookingDTO> getBookingsByUserId(Long userId);
//
//    List<BookingDTO> getBookingsByShowId(Long showId);
//}




package com.app.service;

import java.util.List;

import com.app.dto.BookingDTO;

public interface BookingService {

    BookingDTO createBooking(BookingDTO bookingDTO);

    BookingDTO updateBooking(Long bookingId, BookingDTO bookingDTO);

    void deleteBooking(Long bookingId);

    BookingDTO getBookingById(Long bookingId);

    List<BookingDTO> getBookingsByUserId(Long userId);

    List<BookingDTO> getBookingsByShowId(Long showId);
}