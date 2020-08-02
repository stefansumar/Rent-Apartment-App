var currentUser;

function editProfile(){
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	currentUser = user;
        	$('#searchTextField').hide();
        	$('#searchButton').hide();
        	$('#profile').hide();
        	$('#editProfile').show();    
        	
        	let firstName = user.firstName;
        	let lastName = user.lastName;
        	let username = user.username;
        	
        	document.getElementById('firstNameEdit').value = firstName;
        	document.getElementById('lastNameEdit').value = lastName;
        	document.getElementById('usernameEdit').value = username;
        }
    });
}


$(document).ready(function() {
	$('#editProfileForm').submit(function(event){
		event.preventDefault();
		let firstName = $('#firstNameEdit').val();
		let lastName = $('#lastNameEdit').val();
		let username = $('#usernameEdit').val();

		$.ajax({
	        url: 'rest/user/' + username + '/' + firstName + '/' + lastName,
			contnentType: 'application/json',
			type: 'PUT',
	        success: function () {}
		});
		
	});	
	
	
});

