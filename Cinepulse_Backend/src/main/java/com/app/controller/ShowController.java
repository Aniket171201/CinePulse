//package com.app.controller;
//
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.dto.ShowDTO;
//import com.app.service.ShowService;
//
//@RestController
//@RequestMapping("/api/shows")
//public class ShowController {
//
//    @Autowired
//    private ShowService showService;
//
//    @PostMapping
//    public ResponseEntity<ShowDTO> createShow(@RequestBody ShowDTO showDTO) {
//        ShowDTO createdShow = showService.createShow(showDTO);
//        return new ResponseEntity<>(createdShow, HttpStatus.CREATED);
//    }
//
//    @PatchMapping("/{showId}")
//    public ResponseEntity<?> updateShow(
//            @PathVariable Long showId,
//            @RequestBody ShowDTO showDTO) {
//        ShowDTO updatedShow = showService.updateShow(showId, showDTO);
//        
//        if(updatedShow != null) {
//        	return ResponseEntity.ok(updatedShow);
//        }else {
//        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("show not found");
//        }
//        
//    }
//    
//    @DeleteMapping(	"/{showId}")
//    public ResponseEntity<Void> deleteShow(@PathVariable("showId") Long showId) {
//        showService.deleteShow(showId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/{showId}")
//    public ResponseEntity<ShowDTO> getShowById(@PathVariable("showId") Long showId) {
//        ShowDTO showDTO = showService.getShowById(showId);
//        return new ResponseEntity<>(showDTO, HttpStatus.OK);
//    }
//
//    @GetMapping("/cinema-hall/{cinemaHallId}")
//    public ResponseEntity<List<ShowDTO>> getShowsByCinemaHallId(@PathVariable("cinemaHallId") Long cinemaHallId) {
//        List<ShowDTO> shows = showService.getShowsByCinemaHallId(cinemaHallId);
//        return new ResponseEntity<>(shows, HttpStatus.OK);
//    }
//
//    @GetMapping("/movie/{movieId}/location/{location}")
//    public ResponseEntity<List<ShowDTO>> getShowsByMovieIdAndLocation(
//            @PathVariable("movieId") Long movieId,
//            @PathVariable("location") String location) {
//        List<ShowDTO> shows = showService.getShowsByMovieIdAndLocation(movieId, location);
//        return new ResponseEntity<>(shows, HttpStatus.OK);
//    }
//    
//    @PostMapping("/{showId}/bookSeats")
//    public ResponseEntity<ShowDTO> bookSeats(
//            @PathVariable Long showId,
//            @RequestBody List<String> seatNumbers) {
//        ShowDTO updatedShow = showService.bookSeats(showId, seatNumbers);
//        return ResponseEntity.ok(updatedShow);
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ShowDTO;
import com.app.exception.ResourceNotFoundException;
import com.app.service.ShowService;

@RestController
@RequestMapping("/api/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    @PostMapping
    public ResponseEntity<ShowDTO> createShow(@Valid @RequestBody ShowDTO showDTO) {
        ShowDTO createdShow = showService.createShow(showDTO);
        return new ResponseEntity<>(createdShow, HttpStatus.CREATED);
    }

    @PatchMapping("/{showId}")
    public ResponseEntity<?> updateShow(
            @PathVariable Long showId,
            @RequestBody ShowDTO showDTO) {
        ShowDTO updatedShow = showService.updateShow(showId, showDTO);
        
        if(updatedShow != null) {
        	return ResponseEntity.ok(updatedShow);
        }else {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("show not found");
        }
        
    }
    
    @DeleteMapping(	"/{showId}")
    public ResponseEntity<Void> deleteShow(@PathVariable("showId") Long showId) {
        showService.deleteShow(showId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{showId}")
    public ResponseEntity<ShowDTO> getShowById(@PathVariable("showId") Long showId) {
    	System.out.println(showId+"asdasdasdd");
        ShowDTO showDTO = showService.getShowById(showId);
        return new ResponseEntity<>(showDTO, HttpStatus.OK);
    }

    @GetMapping("/cinema-hall/{cinemaHallId}")
    public ResponseEntity<List<ShowDTO>> getShowsByCinemaHallId(@PathVariable("cinemaHallId") Long cinemaHallId) {
        List<ShowDTO> shows = showService.getShowsByCinemaHallId(cinemaHallId);
        if(shows ==null) {
        	throw new ResourceNotFoundException("No show available");
        }
        return new ResponseEntity<>(shows, HttpStatus.OK);
    }

    @GetMapping("/movie/{movieId}/location/{location}")
    public ResponseEntity<List<ShowDTO>> getShowsByMovieIdAndLocation(
            @PathVariable("movieId") Long movieId,
            @PathVariable("location") String location) {
        List<ShowDTO> shows = showService.getShowsByMovieIdAndLocation(movieId, location);
        if(shows ==null) {
        	throw new ResourceNotFoundException("No show available");
        }
        return new ResponseEntity<>(shows, HttpStatus.OK);
    }
    
    @PostMapping("/{showId}/bookSeats")
    public ResponseEntity<ShowDTO> bookSeats(
            @PathVariable Long showId,
            @RequestBody List<String> seatNumbers) {
        ShowDTO updatedShow = showService.bookSeats(showId, seatNumbers);
        return ResponseEntity.ok(updatedShow);
    }
}