package dto;

public class SearchUserDTO {
	private String selectRole ;
	private String selectGender ;
	private String usernameUserSearch;
	public SearchUserDTO(String selectRole, String selectGender, String usernameUserSearch) {
		super();
		this.selectRole = selectRole;
		this.selectGender = selectGender;
		this.usernameUserSearch = usernameUserSearch;
	}
	public SearchUserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getSelectRole() {
		return selectRole;
	}
	public void setSelectRole(String selectRole) {
		this.selectRole = selectRole;
	}
	public String getSelectGender() {
		return selectGender;
	}
	public void setSelectGender(String selectGender) {
		this.selectGender = selectGender;
	}
	public String getUsernameUserSearch() {
		return usernameUserSearch;
	}
	public void setUsernameUserSearch(String usernameUserSearch) {
		this.usernameUserSearch = usernameUserSearch;
	}
	
}
