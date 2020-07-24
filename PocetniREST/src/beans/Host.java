package beans;

import java.util.ArrayList;

public class Host extends User {
	
	public ArrayList<Apartment> forRent = new ArrayList<Apartment>();
	public Host() {
		super();
		this.setRole("HOST");
	}
	public ArrayList<Apartment> getForRent() {
		return forRent;
	}
	public void setForRent(ArrayList<Apartment> forRent) {
		this.forRent = forRent;
	}
	
}
