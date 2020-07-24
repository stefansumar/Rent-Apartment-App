package beans;

public class Location {

	private String geoWidth;
	private String geoHeight;
	private Address address = new Address();
	
	public Location() {}

	public Location(String geoWidth, String geoHeight, Address address) {
		super();
		this.geoWidth = geoWidth;
		this.geoHeight = geoHeight;
		this.address = address;
	}

	public String getGeoWidth() {
		return geoWidth;
	}

	public void setGeoWidth(String geoWidth) {
		this.geoWidth = geoWidth;
	}

	public String getGeoHeight() {
		return geoHeight;
	}

	public void setGeoHeight(String geoHeight) {
		this.geoHeight = geoHeight;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
}
