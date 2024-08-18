
package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookingId;
	private int seats;
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "show_id", nullable = false)
	private Show show;
	
	@JoinColumn(name="total_price",nullable=true)
	private int totalPrice;
    
    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;

	public Booking(User user, Show show, int seats, PaymentStatus paymentStatus) {
		super();
		this.user = user;
		this.show = show;
		this.seats = seats;
		this.paymentStatus = paymentStatus;
	}

	public Booking() {
		super();
	}

	public Long getId() {
		return bookingId;
	}

	public void setId(Long id) {
		this.bookingId = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Show getShow() {
		return show;
	}

	public void setShow(Show show) {
		this.show = show;
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
		return "Booking [bookingId=" + bookingId + ", user=" + user + ", show=" + show + ", seats=" + seats
				+ ", paymentStatus=" + paymentStatus + "]";
	}
	
	

}