package beans;

public class Comment {
	
	private Long id;
	private String commenter;
	private String guestUsername;
	private Long apartmentId;
	private String comment;
	private int rate;
	private boolean visible;
	
	public Comment () {
		super();
	}

	public Comment(Long id, String commenter, String guestUsername, Long apartmentId, String comment, int rate, boolean visible) {
		super();
		this.id = id;
		this.commenter = commenter;
		this.guestUsername = guestUsername;
		this.apartmentId = apartmentId;
		this.comment = comment;
		this.rate = rate;
		this.visible = visible;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getApartmentId() {
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

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	
	
	
}
