package beans;

import java.util.ArrayList;

public class Host extends User {
	
	public ArrayList<Long> forRent = new ArrayList<Long>();
	public Host() {
		super();
		this.setRole("HOST");
	}
	public ArrayList<Long> getForRent() {
		return forRent;
	}
	public void setForRent(ArrayList<Long> forRent) {
		this.forRent = forRent;
	}
	
}
