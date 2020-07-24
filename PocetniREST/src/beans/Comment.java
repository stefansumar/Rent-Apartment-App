package beans;

public class Comment {
	
	private String commenter;
	private Guest guest;
	private Apartment apartment;
	private String comment;
	private int rate;
	
	public Comment () {}

	public Comment(String commenter, Guest guest, Apartment apartment, String comment, int rate) {
		super();
		this.commenter = commenter;
		this.guest = guest;
		this.apartment = apartment;
		this.comment = comment;
		this.rate = rate;
	}

	public String getCommenter() {
		return commenter;
	}

	public void setCommenter(String commenter) {
		this.commenter = commenter;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}
	
}
