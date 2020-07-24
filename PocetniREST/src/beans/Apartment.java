package beans;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

public class Apartment {

	private String type;
	private int roomCount;
	private int guestCount;
	private Location location;
	private ArrayList<LocalDate> datesForRent = new ArrayList<LocalDate>();
    private ArrayList<LocalDate> datesAvailable = new ArrayList<LocalDate>();
    private String hostUsername;
    private ArrayList<Long> comments = new ArrayList<Long>();
    private ArrayList<String> images = new ArrayList<String>();
    private String pricePerNight;
    private LocalTime timeForCheckIn = LocalTime.of(14, 0, 0, 0);
    private LocalTime timeForCheckOut = LocalTime.of(10, 0, 0, 0);
    private boolean status = true;
    private ArrayList<Long> amenities = new ArrayList<Long>();
    private ArrayList<Long> reservations = new ArrayList<Long>();
    
    public Apartment() {}
    
	

	public Apartment(String type, int roomCount, int guestCount, Location location, ArrayList<LocalDate> datesForRent,
			ArrayList<LocalDate> datesAvailable, String hostUsername, ArrayList<Long> comments,
			ArrayList<String> images, String pricePerNight, LocalTime timeForCheckIn, LocalTime timeForCheckOut,
			boolean status, ArrayList<Long> amenities, ArrayList<Long> reservations) {
		super();
		this.type = type;
		this.roomCount = roomCount;
		this.guestCount = guestCount;
		this.location = location;
		this.datesForRent = datesForRent;
		this.datesAvailable = datesAvailable;
		this.hostUsername = hostUsername;
		this.comments = comments;
		this.images = images;
		this.pricePerNight = pricePerNight;
		this.timeForCheckIn = timeForCheckIn;
		this.timeForCheckOut = timeForCheckOut;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public ArrayList<LocalDate> getDatesForRent() {
		return datesForRent;
	}

	public void setDatesForRent(ArrayList<LocalDate> datesForRent) {
		this.datesForRent = datesForRent;
	}

	public ArrayList<LocalDate> getDatesAvailable() {
		return datesAvailable;
	}

	public void setDatesAvailable(ArrayList<LocalDate> datesAvailable) {
		this.datesAvailable = datesAvailable;
	}

	public String getHostUsername() {
		return hostUsername;
	}

	public void setHostUsername(String hostUsername) {
		this.hostUsername = hostUsername;
	}

	public ArrayList<Long> getComments() {
		return comments;
	}

	public void setComments(ArrayList<Long> comments) {
		this.comments = comments;
	}

	public ArrayList<String> getImages() {
		return images;
	}

	public void setImages(ArrayList<String> images) {
		this.images = images;
	}

	public String getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(String pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public LocalTime getTimeForCheckIn() {
		return timeForCheckIn;
	}

	public void setTimeForCheckIn(LocalTime timeForCheckIn) {
		this.timeForCheckIn = timeForCheckIn;
	}

	public LocalTime getTimeForCheckOut() {
		return timeForCheckOut;
	}

	public void setTimeForCheckOut(LocalTime timeForCheckOut) {
		this.timeForCheckOut = timeForCheckOut;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public ArrayList<Long> getAmenities() {
		return amenities;
	}

	public void setAmenities(ArrayList<Long> amenities) {
		this.amenities = amenities;
	}

	public ArrayList<Long> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Long> reservations) {
		this.reservations = reservations;
	}
	
    
}
