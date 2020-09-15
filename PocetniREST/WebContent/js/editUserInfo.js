var currentUser;

function editProfile(){
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	currentUser = user;
        	$('#cardDiv').hide();
        	$('#searchTextField').hide();
        	$('#searchButton').hide();
        	$('#profile').hide();
        	$('#changePassword').hide();
			$('#amenityTable').hide();
			$('#usersTable').hide();
			$('#newApartment').hide();
			$('#reservationsCardDiv').hide();
        	$('#editProfile').show();    
        	
        	let firstName = user.firstName;
        	let lastName = user.lastName;
        	let username = user.username;
        	let gender = user.gender;
        	
        	document.getElementById('firstNameEdit').value = firstName;
        	document.getElementById('lastNameEdit').value = lastName;
        	document.getElementById('usernameEdit').value = username;
        	document.getElementById('selectGenderEdit').value = gender;
        }
    });
}


$(document).ready(function() {
	$('#editProfileForm').submit(function(event){
		event.preventDefault();
		let firstName = $('#firstNameEdit').val();
		let lastName = $('#lastNameEdit').val();
		let username = $('#usernameEdit').val();
		let gender = $('#selectGenderEdit').val();
		
		if(!firstName && !lastName){
			$('#errorMessage').text('All fields are required!');
			$('#errorMessage').css({"color": "red", "font-size": "12px"});
			$('#errorMessage').show().delay(3000).fadeOut();
			return;
		}
		
		if(!firstName){
			$('#emptyFirstNameEdit').text('First name is required!');
			$('#emptyFirstNameEdit').css({"color": "red", "font-size": "12px"});
			$('#emptyFirstNameEdit').show().delay(3000).fadeOut();
			return;
		}
		
		if(firstName.length < 3){
			$('#lengthFirstNameEdit').text('First name must contain min. 3 caracters.');
			$('#lengthFirstNameEdit').css({"color": "red", "font-size": "12px"});
			$('#lengthFirstNameEdit').show().delay(3000).fadeOut();
			return;
		}
		
		if(!lastName){
			$('#emptyLastNameEdit').text('Last name is required!');
			$('#emptyLastNameEdit').css({"color": "red", "font-size": "12px"});
			$('#emptyLastNameEdit').show().delay(3000).fadeOut();
			return;
		}
		
		if(lastName.length < 3){
			$('#lengthLastNameEdit').text('Last name must contain min. 3 caracters.');
			$('#lengthLastNameEdit').css({"color": "red", "font-size": "12px"});
			$('#lengthLastNameEdit').show().delay(3000).fadeOut();
			return;
		}

		$.ajax({
	        url: 'rest/user/' + username + '/' + firstName + '/' + lastName + '/' + gender,
			contnentType: 'application/json',
			type: 'PUT',
	        success: function () {
				$('#successMessage').text('You are successfully edited your profile info.');
				$('#successMessage').css({"color": "#7FFF00", "font-size": "16px"});
				$("#successMessage").show().delay(3000).fadeOut();
	        }
		});
		
	});	
	
	
});

