function myProfile(){

    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user);
        	$('#cardDiv').hide();
        	$('#searchTextField').hide();
        	$('#searchButton').hide();
        	$('#editProfile').hide();
        	$('#changePassword').hide();
			$('#amenityTable').hide();
			$('#reservationsCardDiv').hide();
			$('#usersTable').hide();
        	$('#newApartment').hide();
        	$('#profile').html("");
        	$('#profile').show();
        	$('#profile').append("<img src=\"images/avatar.png\" class=\"avatar\"></img>");
        	$('#profile').append("<h2 class=\"text-center\"> " + "My info" + "</h2>");
        	$('#profile').append("<h4 class=\"text-center\"> " + "Firstname:" + " " + user.firstName + "</h4>");
        	$('#profile').append("<h4 class=\"text-center\"> " + "Last name:" + " " + user.lastName + "</h4>");
        	$('#profile').append("<h4 class=\"text-center\"> " + "Username:" + " " + user.username + "</h4>");
        	$('#profile').append("<h4 class=\"text-center\"> " + "Gender:" + " " + user.gender + "</h4>");
        	$('#profile').append("<h4 class=\"text-center\"> " + "Role:" + " " + user.role + "</h4>");
        	$('#profile').append("<input type=\"submit\" value=\"Edit My Info\" onclick=\"editProfile()\">");
        	
        }
    });
    
    
    
}
