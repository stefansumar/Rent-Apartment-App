var currentUser;

function changePassword(){
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	currentUser = user;
        	$('#cardDiv').hide();
			$('#searchButton').hide();
			$('#searchButtonRes').hide();

        	$('#profile').hide();
        	$('#editProfile').hide(); 
			$('#amenityTable').hide();
			$('#usersTable').hide();
			$('#newApartment').hide();
			$('#reservationsCardDiv').hide();
			$('#searchDiv').hide();
			$('#searchResDiv').hide();
			$('#searchUserDiv').hide();
			$('#searchButtonUser').hide();
        	$('#changePassword').show();	
        }
    });
}

$(document).ready(function() {
	$('#changePasswordForm').submit(function(event){
		event.preventDefault();
		let username = currentUser.username;
		let realPassword = currentUser.password;
		let currentPassword = $('#currentPassword').val();
		let newPassword = $('#newPassword').val();
		let repeatNewPassword = $('#repeatNewPassword').val();
		console.log(realPassword)
		console.log(currentPassword);
		console.log(newPassword);
		console.log(repeatNewPassword);
		
		if(!currentPassword && !newPassword && !repeatNewPassword){
			$('#errorPasswordMessage').text('All fields are required!');
			$('#errorPasswordMessage').css({"color": "red", "font-size": "12px"});
			$('#errorPasswordMessage').show().delay(3000).fadeOut();
			return;
		}
		
		if(!currentPassword){
			$('#emptyCurrentPassword').text('Current password is required!');
			$('#emptyCurrentPassword').css({"color": "red", "font-size": "12px"});
			$('#emptyCurrentPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(currentPassword !== realPassword){
			$('#matchCurrentPassword').text('Wrong password');
			$('#matchCurrentPassword').css({"color": "red", "font-size": "12px"});
			$('#matchCurrentPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(!newPassword){
			$('#emptyNewPassword').text('New password is required!');
			$('#emptyNewPassword').css({"color": "red", "font-size": "12px"});
			$('#emptyNewPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(newPassword.length < 8){
			$('#lengthNewPassword').text('New password must contain min. 8 characters!');
			$('#lengthNewPassword').css({"color": "red", "font-size": "12px"});
			$('#lengthNewPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(!repeatNewPassword){
			$('#emptyRepeatNewPassword').text('Reenter password is required!');
			$('#emptyRepeatNewPassword').css({"color": "red", "font-size": "12px"});
			$('#emptyRepeatNewPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(repeatNewPassword !== newPassword){
			$('#matchNewPassword').text('Passwords does not match!');
			$('#matchNewPassword').css({"color": "red", "font-size": "12px"});
			$('#matchNewPassword').show().delay(3000).fadeOut();
			return;
		}
		
		$.ajax({
	        url: 'rest/user/changePassword/' + username + '/' + currentPassword + '/' + newPassword,
			contnentType: 'application/json',
			type: 'PUT',
	        success: function () {
	        	document.getElementById('currentPassword').value = "";
	        	document.getElementById('newPassword').value = "";
	        	document.getElementById('repeatNewPassword').value = "";
				$('#successPasswordMessage').text('You are successfully changed your password.');
				$('#successPasswordMessage').css({"color": "#7FFF00", "font-size": "16px"});
				$("#successPasswordMessage").show().delay(3000).fadeOut();
				
	        }
		});
		
	});	
	
	
});