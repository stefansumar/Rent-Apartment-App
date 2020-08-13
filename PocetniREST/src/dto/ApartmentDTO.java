package dto;

import java.util.ArrayList;

import beans.Location;

public class ApartmentDTO {
	private String name;
	private String type;
	private Float pricePerNight;
	private int roomCount;
	private int guestCount;
	private String startDate;
	private String endDate;
	private Location location;
	private String hostUsername;
	private String image;
	private String timeForCheckIn;
	private String timeForCheckOut;
	private ArrayList<Long> amenities;
	
	public ApartmentDTO() {
		super();
	}
	
	public ApartmentDTO(String name, String type, Float pricePerNight, int roomCount, int guestCount, String startDate,
			String endDate, Location location, String hostUsername, String image, String timeForCheckIn,
			String timeForCheckOut, ArrayList<Long> amenities) {
		super();
		this.name = name;
		this.type = type;
		this.pricePerNight = pricePerNight;
		this.roomCount = roomCount;
		this.guestCount = guestCount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.location = location;
		this.hostUsername = hostUsername;
		this.image = image;
		this.timeForCheckIn = timeForCheckIn;
		this.timeForCheckOut = timeForCheckOut;
		this.amenities = amenities;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Float getPricePerNight() {
		return pricePerNight;
	}
	public void setPricePerNight(Float pricePerNight) {
		this.pricePerNight = pricePerNight;
	}
	public int getRoomCount() {
		return roomCount;
	}
	public void setRoomCount(int roomCount) {
		this.roomCount = roomCount;
	}
	public int getGuestCount() {
		return guestCount;
	}
	public void setGuestCount(int guestCount) {
		this.guestCount = guestCount;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getHostUsername() {
		return hostUsername;
	}
	public void setHostUsername(String hostUsername) {
		this.hostUsername = hostUsername;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getTimeForCheckIn() {
		return timeForCheckIn;
	}
	public void setTimeForCheckIn(String timeForCheckIn) {
		this.timeForCheckIn = timeForCheckIn;
	}
	public String getTimeForCheckOut() {
		return timeForCheckOut;
	}
	public void setTimeForCheckOut(String timeForCheckOut) {
		this.timeForCheckOut = timeForCheckOut;
	}
	public ArrayList<Long> getAmenities() {
		return amenities;
	}
	public void setAmenities(ArrayList<Long> amenities) {
		this.amenities = amenities;
	}
	
	
	
}
