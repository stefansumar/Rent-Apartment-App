package beans;

public class Comment {
	
	private String commenter;
	private String guestUsername;
	private Long apartmentId;
	private String comment;
	private int rate;
	
	public Comment () {}

	public Comment(String commenter, String guestUsername, Long apartmentId, String comment, int rate) {
		super();
		this.commenter = commenter;
		this.guestUsername = guestUsername;
		this.apartmentId = apartmentId;
		this.comment = comment;
		this.rate = rate;
	}

	public String getCommenter() {
		return commenter;
	}

	public void setCommenter(String commenter) {
		this.commenter = commenter;
	}

	public String getGuestUsername() {
		return guestUsername;
	}

	public void setGuestUsername(String guestUsername) {
		this.guestUsername = guestUsername;
	}

	public Long getapartmentId() {
		return apartmentId;
	}

	public void setApartmentId(Long apartmentId) {
		this.apartmentId = apartmentId;
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
