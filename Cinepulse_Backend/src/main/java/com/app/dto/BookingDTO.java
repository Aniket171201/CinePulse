//package com.app.dto;
//
//import com.app.entities.PaymentStatus;
//
//public class BookingDTO {
//    private Long bookingId;
//    private Long userId; // User ID associated with the booking
//    private Long showId; // Show ID associated with the booking
//    private int seats;
//    private PaymentStatus paymentStatus;
//
//    // Default constructor
//    public BookingDTO() {
//    }
//
//    // Parameterized constructor
//    public BookingDTO(Long bookingId, Long userId, Long showId, int seats, PaymentStatus paymentStatus) {
//        this.bookingId = bookingId;
//        this.userId = userId;
//        this.showId = showId;
//        this.seats = seats;
//        this.paymentStatus = paymentStatus;
//    }
//
//    // Getters and Setters
//    public Long getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(Long bookingId) {
//        this.bookingId = bookingId;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Long getShowId() {
//        return showId;
//    }
//
//    public void setShowId(Long showId) {
//        this.showId = showId;
//    }
//
//    public int getSeats() {
//        return seats;
//    }
//
//    public void setSeats(int seats) {
//        this.seats = seats;
//    }
//
//    public PaymentStatus getPaymentStatus() {
//        return paymentStatus;
//    }
//
//    public void setPaymentStatus(PaymentStatus paymentStatus) {
//        this.paymentStatus = paymentStatus;
//    }
//
//    @Override
//    public String toString() {
//        return "BookingDTO [bookingId=" + bookingId + ", userId=" + userId + ", showId=" + showId + ", seats=" + seats
//                + ", paymentStatus=" + paymentStatus + "]";
//    }
//}


//
//package com.app.dto;
//
//import com.app.entities.PaymentStatus;
//
//public class BookingDTO {
//    private Long bookingId;
//    private Long userId; // User ID associated with the booking
//    private Long showId; // Show ID associated with the booking
//    private int seats;
//    private PaymentStatus paymentStatus;
//
//    // Default constructor
//    public BookingDTO() {
//    }
//
//    // Parameterized constructor
//    public BookingDTO(Long bookingId, Long userId, Long showId, int seats, PaymentStatus paymentStatus) {
//        this.bookingId = bookingId;
//        this.userId = userId;
//        this.showId = showId;
//        this.seats = seats;
//        this.paymentStatus = paymentStatus;
//    }
//
//    // Getters and Setters
//    public Long getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(Long bookingId) {
//        this.bookingId = bookingId;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Long getShowId() {
//        return showId;
//    }
//
//    public void setShowId(Long showId) {
//        this.showId = showId;
//    }
//
//    public int getSeats() {
//        return seats;
//    }
//
//    public void setSeats(int seats) {
//        this.seats = seats;
//    }
//
//    public PaymentStatus getPaymentStatus() {
//        return paymentStatus;
//    }
//
//    public void setPaymentStatus(PaymentStatus paymentStatus) {
//        this.paymentStatus = paymentStatus;
//    }
//
//    @Override
//    public String toString() {
//        return "BookingDTO [bookingId=" + bookingId + ", userId=" + userId + ", showId=" + showId + ", seats=" + seats
//                + ", paymentStatus=" + paymentStatus + "]";
//    }
//}






package com.app.dto;

import com.app.entities.PaymentStatus;

public class BookingDTO {
    private Long bookingId;
    private Long userId; // User ID associated with the booking
    private Long showId; // Show ID associated with the booking
    private int seats;
    private PaymentStatus paymentStatus;

    private int totalPrice;
    
    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    // Default constructor
    public BookingDTO() {
    }

    // Parameterized constructor
    public BookingDTO(Long bookingId, Long userId, Long showId, int seats, PaymentStatus paymentStatus) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.showId = showId;
        this.seats = seats;
        this.paymentStatus = paymentStatus;
    }

    // Getters and Setters
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    @Override
    public String toString() {
        return "BookingDTO [bookingId=" + bookingId + ", userId=" + userId + ", showId=" + showId + ", seats=" + seats
                + ", paymentStatus=" + paymentStatus + "]";
    }
}