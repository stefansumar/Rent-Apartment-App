$(document).ready(function() {
	$('#profile').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();

	
});

function signOut(){
	$.get({
		url: 'rest/user/signOut',
		contentType: 'application/json',
		success: function() {
			sessionStorage.setItem("loggedIn", null);
			window.location = './login.html';
		}
	});
	
}

