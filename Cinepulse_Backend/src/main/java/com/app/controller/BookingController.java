//package com.app.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.dto.BookingDTO;
//import com.app.service.BookingService;
//
//@RestController
//@RequestMapping("/api/bookings")
//public class BookingController {
//
//    @Autowired
//    private BookingService bookingService;
//
//    @PostMapping
//    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
//        BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
//        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{bookingId}")
//    public ResponseEntity<BookingDTO> updateBooking(
//            @PathVariable("bookingId") Long bookingId,
//            @RequestBody BookingDTO bookingDTO) {
//        BookingDTO updatedBooking = bookingService.updateBooking(bookingId, bookingDTO);
//        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{bookingId}")
//    public ResponseEntity<Void> deleteBooking(@PathVariable("bookingId") Long bookingId) {
//        bookingService.deleteBooking(bookingId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/{bookingId}")
//    public ResponseEntity<BookingDTO> getBookingById(@PathVariable("bookingId") Long bookingId) {
//        BookingDTO bookingDTO = bookingService.getBookingById(bookingId);
//        return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
//    }
//
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<BookingDTO>> getBookingsByUserId(@PathVariable("userId") Long userId) {
//        List<BookingDTO> bookings = bookingService.getBookingsByUserId(userId);
//        return new ResponseEntity<>(bookings, HttpStatus.OK);
//    }
//
//    @GetMapping("/show/{showId}")
//    public ResponseEntity<List<BookingDTO>> getBookingsByShowId(@PathVariable("showId") Long showId) {
//        List<BookingDTO> bookings = bookingService.getBookingsByShowId(showId);
//        return new ResponseEntity<>(bookings, HttpStatus.OK);
//    }
//}


//
//
//package com.app.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.dto.BookingDTO;
//import com.app.service.BookingService;
//
//@RestController
//@RequestMapping("/api/bookings")
//public class BookingController {
//
//    @Autowired
//    private BookingService bookingService;
//
//    @PostMapping
//    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
//        BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
//        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{bookingId}")
//    public ResponseEntity<BookingDTO> updateBooking(
//            @PathVariable("bookingId") Long bookingId,
//            @RequestBody BookingDTO bookingDTO) {
//        BookingDTO updatedBooking = bookingService.updateBooking(bookingId, bookingDTO);
//        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{bookingId}")
//    public ResponseEntity<Void> deleteBooking(@PathVariable("bookingId") Long bookingId) {
//        bookingService.deleteBooking(bookingId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/{bookingId}")
//    public ResponseEntity<BookingDTO> getBookingById(@PathVariable("bookingId") Long bookingId) {
//        BookingDTO bookingDTO = bookingService.getBookingById(bookingId);
//        return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
//    }
//
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<BookingDTO>> getBookingsByUserId(@PathVariable("userId") Long userId) {
//        List<BookingDTO> bookings = bookingService.getBookingsByUserId(userId);
//        return new ResponseEntity<>(bookings, HttpStatus.OK);
//    }
//
//    @GetMapping("/show/{showId}")
//    public ResponseEntity<List<BookingDTO>> getBookingsByShowId(@PathVariable("showId") Long showId) {
//        List<BookingDTO> bookings = bookingService.getBookingsByShowId(showId);
//        return new ResponseEntity<>(bookings, HttpStatus.OK);
//    }
//}





package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingDTO;
import com.app.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@Valid @RequestBody BookingDTO bookingDTO) {
        BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> updateBooking(
            @PathVariable("bookingId") Long bookingId,
            @RequestBody BookingDTO bookingDTO) {
        BookingDTO updatedBooking = bookingService.updateBooking(bookingId, bookingDTO);
        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable("bookingId") Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable("bookingId") Long bookingId) {
        BookingDTO bookingDTO = bookingService.getBookingById(bookingId);
        return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUserId(@PathVariable("userId") Long userId) {
        List<BookingDTO> bookings = bookingService.getBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/show/{showId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByShowId(@PathVariable("showId") Long showId) {
        List<BookingDTO> bookings = bookingService.getBookingsByShowId(showId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
}