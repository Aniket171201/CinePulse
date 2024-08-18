//package com.app.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.app.entities.Booking;
//
//public interface BookingRepository extends JpaRepository<Booking, Long> {
//    List<Booking> findByUser_UserId(Long userId);
//    List<Booking> findByShow_ShowId(Long showId);
//}



//
//package com.app.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.app.entities.Booking;
//
//public interface BookingRepository extends JpaRepository<Booking, Long> {
//    List<Booking> findByUser_UserId(Long userId);
//    List<Booking> findByShow_ShowId(Long showId);
//}




package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_UserId(Long userId);
    List<Booking> findByShow_ShowId(Long showId);
}