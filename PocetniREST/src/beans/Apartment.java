package beans;

import java.time.LocalDate;
import java.util.ArrayList;

public class Apartment {

	private Long id;
	private String type;
	private String name;
	private String description;
	private int roomCount;
	private int guestCount;
	private Location location;
	private ArrayList<LocalDate> datesForRent = new ArrayList<LocalDate>();
    private ArrayList<LocalDate> datesAvailable = new ArrayList<LocalDate>();
    private String hostUsername;
    private ArrayList<Comment> comments = new ArrayList<Comment>();
    private String image;
    private ArrayList<String> images = new ArrayList<String>();
    private String pricePerNight;
    private String timeForCheckIn = "14:00";
    private String timeForCheckOut = "10:00";
    private boolean status = true;
    private ArrayList<Amenity> amenities = new ArrayList<Amenity>();
    private ArrayList<Reservation> reservations = new ArrayList<Reservation>();
    
    public Apartment() {}

	public Apartment(Long id, String type, String name, String description, int roomCount, int guestCount,
			Location location, ArrayList<LocalDate> datesForRent, ArrayList<LocalDate> datesAvailable,
			String hostUsername, ArrayList<Comment> comments, String image, ArrayList<String> images,
			String pricePerNight, String timeForCheckIn, String timeForCheckOut, boolean status,
			ArrayList<Amenity> amenities, ArrayList<Reservation> reservations) {
		super();
		this.id = id;
		this.type = type;
		this.name = name;
		this.description = description;
		this.roomCount = roomCount;
		this.guestCount = guestCount;
		this.location = location;
		this.datesForRent = datesForRent;
		this.datesAvailable = datesAvailable;
		this.hostUsername = hostUsername;
		this.comments = comments;
		this.image = image;
		this.images = images;
		this.pricePerNight = pricePerNight;
		this.timeForCheckIn = timeForCheckIn;
		this.timeForCheckOut = timeForCheckOut;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public ArrayList<Comment> getComments() {
		return comments;
	}

	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public ArrayList<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(ArrayList<Amenity> amenities) {
		this.amenities = amenities;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}
  
}
