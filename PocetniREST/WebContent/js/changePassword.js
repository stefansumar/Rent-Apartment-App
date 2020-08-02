function changePassword(){
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	currentUser = user;
        	$('#searchTextField').hide();
        	$('#searchButton').hide();
        	$('#profile').hide();
        	$('#editProfile').hide(); 
        	$('#changePassword').show();
        	
        }
    });
}