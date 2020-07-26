$(document).ready(function() {
	
	$('#loginForm').submit(function(event){
		event.preventDefault();
		
		// Dobavljanje podataka sa forme
		let username=$('#username').val();
		let password=$('#password').val();
		console.log(username);
		console.log(password);
		
		// Validacija polja
		if(!username && !password)
		{
			$('#error').text('All fields are required!');
			$('#error').css({"color": "red", "font-size": "12px"});
			$('#error').show().delay(3000).fadeOut();
			return;
		}
		
		if(!username)
		{
			$('#emptyUsername').text('Username is required!');
			$('#emptyUsername').css({"color": "red", "font-size": "12px"});
			$('#emptyUsername').show().delay(3000).fadeOut();
			return;
		}
		
		if(!password)
		{
			$('#emptyPassword').text('Password is required!');
			$('#emptyPassword').css({"color": "red", "font-size": "12px"});
			$('#emptyPassword').show().delay(3000).fadeOut();
			return;
		}		
		
		//Poziv bekenda
		$.ajax({
			type: 'post',
			url: 'rest/user/login',
			contentType: 'application/json',
			data: JSON.stringify({
				"username" : username, 
				"password" : password}),
				
			success: function(user)
			{
				console.log(user);
				if(user!= null)
				{
					sessionStorage.setItem("ulogovan", JSON.stringify(user));
					$('#success').text('Successful login.');
					$('#success').css({"color": "#7FFF00", "font-size": "12px"});
					$("#success").show().delay(1000).fadeOut(function(){
							window.location = "./mainPage.html";
						
					});
				} else {
					$('#error').text('Wrong username or password.');
					$('#error').css({"color": "red", "font-size": "12px"});
					$('#error').show().delay(3000).fadeOut();
				}
			}
			
		});
		
		
	});
	
	
});