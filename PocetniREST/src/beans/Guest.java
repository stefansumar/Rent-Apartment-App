package beans;

import java.util.ArrayList;

public class Guest extends User {
	
	public ArrayList<Apartment> rented = new ArrayList<Apartment>();
	public ArrayList<Reservation> reservations = new ArrayList<Reservation>();
	public Guest() {
		super();
		this.setRole("GUEST");
		
	}
	
	public ArrayList<Apartment> getRented() {
		return rented;
	}
	public void setRented(ArrayList<Apartment> rented) {
		this.rented = rented;
	}
	public ArrayList<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}
	
}
