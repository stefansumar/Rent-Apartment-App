$(document).ready(function() {
	
	$('#registrationForm').submit(function(event){
		event.preventDefault();
		
		// Dobavljanje podataka sa forme
		let firstName=$('#firstName').val();
		let lastName=$('#lastName').val();
		let username=$('#username').val();
		let password=$('#password').val();
		let repeatPassword=$('#repeatPassword').val();
		let gender = 'MALE';
		let role = 'GUEST';
		// Treba dodati dropdown za pol u formi
		
		// Validacija polja
		if(!firstName && !lastName && !username && !password && !repeatPassword){
			$('#error').text('All fields are required!');
			$('#error').css({"color": "red", "font-size": "12px"});
			$('#error').show().delay(3000).fadeOut();
			return;
		}
		
		if(!firstName){
			$('#emptyFirstName').text('First name is required!');
			$('#emptyFirstName').css({"color": "red", "font-size": "12px"});
			$('#emptyFirstName').show().delay(3000).fadeOut();
			return;
		}
		
		if(firstName.length < 3){
			$('#lengthFirstName').text('First name must contain min. 3 caracters.');
			$('#lengthFirstName').css({"color": "red", "font-size": "12px"});
			$('#lengthFirstName').show().delay(3000).fadeOut();
			return;
		}
		
		if(!lastName){
			$('#emptyLastName').text('Last name is required!');
			$('#emptyLastName').css({"color": "red", "font-size": "12px"});
			$('#emptyLastName').show().delay(3000).fadeOut();
			return;
		}
		
		if(lastName.length < 3){
			$('#lengthLastName').text('Last name must contain min. 3 caracters.');
			$('#lengthLastName').css({"color": "red", "font-size": "12px"});
			$('#lengthLastName').show().delay(3000).fadeOut();
			return;
		}
		
		if(!username){
			$('#emptyUsername').text('Username is required!');
			$('#emptyUsername').css({"color": "red", "font-size": "12px"});
			$('#emptyUsername').show().delay(3000).fadeOut();
			return;
		}
		
		if(username.length < 5){
			$('#lengthUsername').text('Username must contain min. 5 caracters.');
			$('#lengthUsername').css({"color": "red", "font-size": "12px"});
			$('#lengthUsername').show().delay(3000).fadeOut();
			return;
		}
		
		if(!password){
			$('#emptyPassword').text('Password is required!');
			$('#emptyPassword').css({"color": "red", "font-size": "12px"});
			$('#emptyPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(password.length < 8){
			$('#lengthPassword').text('Password must contain min. 8 caracters.');
			$('#lengthPassword').css({"color": "red", "font-size": "12px"});
			$('#lengthPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(!repeatPassword){
			$('#emptyRepeatPassword').text('You must repeat your password!');
			$('#emptyRepeatPassword').css({"color": "red", "font-size": "12px"});
			$('#emptyRepeatPassword').show().delay(3000).fadeOut();
			return;
		}
		
		if(password != repeatPassword){
			$('#matchPassword').text('Passwords does not match!');
			$('#matchPassword').css({"color": "red", "font-size": "12px"});
			$('#matchPassword').show().delay(3000).fadeOut();
			return;
		}
		
		//Poziv bekenda
		$.ajax({
			type: 'post',
			url: 'rest/user/signUp',
			contentType: 'application/json',
			data: JSON.stringify({
				"firstName" : firstName, 
				"lastName" : lastName,
				"username" : username,
				"password" : password,
				"gender" : gender,
				"role" : role
				}),
				success: function(data) {
					console.log(JSON.stringify(data));
					$('#success').text('You are successfully signed up.');
					$('#success').css({"color": "#7FFF00", "font-size": "12px"});
					$("#success").show().delay(1000).fadeOut(function(){
						
						window.location = "./login.html";
						
					});
					
				},
				error: function() {
					console.log('ZASTO UDJES OVDE MAMU TI JEBEM')
					$('#error').text('Username is already taken.');
					$('#error').css({"color": "red", "font-size": "12px"});
					$('#error').show().delay(3000).fadeOut();
				}

		});
		
		
	});
	
	
});