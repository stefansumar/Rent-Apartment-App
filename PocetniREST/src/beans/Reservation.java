package beans;

import java.time.LocalDate;

public class Reservation {
	
	private Long reservationId;
	private Long apartmentId;
	private LocalDate startDate;
	private int nightCount = 1;
	private float price;
	private String message;
	private String guestUsername;
	private Status status;
	
	public Reservation () {}

	public Reservation(Long reservationId, Long apartmentId, LocalDate startDate, int nightCount, float price,
			String message, String guestUsername, Status status) {
		super();
		this.reservationId = reservationId;
		this.apartmentId = apartmentId;
		this.startDate = startDate;
		this.nightCount = nightCount;
		this.price = price;
		this.message = message;
		this.guestUsername = guestUsername;
		this.status = status;
	}

	public Long getReservationId() {
		return reservationId;
	}

	public void setReservationId(Long reservationId) {
		this.reservationId = reservationId;
	}

	public Long getapartmentId() {
		return apartmentId;
	}

	public void setapartmentId(Long apartmentId) {
		this.apartmentId = apartmentId;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public int getNightCount() {
		return nightCount;
	}

	public void setNightCount(int nightCount) {
		this.nightCount = nightCount;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getGuestUsername() {
		return guestUsername;
	}

	public void setGuestUsername(String guestUsername) {
		this.guestUsername = guestUsername;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
}
