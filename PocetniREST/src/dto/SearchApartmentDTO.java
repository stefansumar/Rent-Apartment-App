package dto;

public class SearchApartmentDTO {
	private String startDate;
	private String endDate;
	private String place;
	private String country;
	private String minPrice;
	private String maxPrice;
	private String minRooms;
	private String maxRooms;
	private String noGuests;
	
	public SearchApartmentDTO() {
		super();
	}

	public SearchApartmentDTO(String startDate, String endDate, String place, String country, String minPrice,
			String maxPrice, String minRooms, String maxRooms, String noGuests) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.place = place;
		this.country = country;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.minRooms = minRooms;
		this.maxRooms = maxRooms;
		this.noGuests = noGuests;
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

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(String minPrice) {
		this.minPrice = minPrice;
	}

	public String getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(String maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getMinRooms() {
		return minRooms;
	}

	public void setMinRooms(String minRooms) {
		this.minRooms = minRooms;
	}

	public String getMaxRooms() {
		return maxRooms;
	}

	public void setMaxRooms(String maxRooms) {
		this.maxRooms = maxRooms;
	}

	public String getNoGuests() {
		return noGuests;
	}

	public void setNoGuests(String noGuests) {
		this.noGuests = noGuests;
	}
	
}
