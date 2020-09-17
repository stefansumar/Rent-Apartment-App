package dto;

import beans.Status;

public class ReservationDTO {

	private Long apartmentId;
	private String startDate;
	private int nightCount = 1;
	private float price;
	private String message;
	private String guestUsername;
	private Status status;
	public ReservationDTO(Long apartmentId, String startDate, int nightCount, float price, String message,
			String guestUsername, Status status) {
		super();
		this.apartmentId = apartmentId;
		this.startDate = startDate;
		this.nightCount = nightCount;
		this.price = price;
		this.message = message;
		this.guestUsername = guestUsername;
		this.status = status;
	}
	public ReservationDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getApartmentId() {
		return apartmentId;
	}
	public void setApartmentId(Long apartmentId) {
		this.apartmentId = apartmentId;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
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
