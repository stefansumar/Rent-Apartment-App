
let allReservations;
let reservationsCardDiv;
let apartment;
let role1;
let apartmentId2;
let commenter;
let commenterUsername;
let reservationList;
let currentReservations;
let user1;

function reservations(){
	$('#cardDiv').hide();
	$('#searchButton').hide();
	$('#searchButtonRes').show();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#profile').hide();
	$('#newApartment').hide();
	$('#amenityTable').hide();
    $('#usersTable').hide();
	$('#searchDiv').hide();
	$('#searchResDiv').hide();
	$('#searchUserDiv').hide();
	$('#searchButtonUser').hide();
    $('#reservationsCardDiv').show();
    
	$(document).ready(function() {
		reservationsCardDiv = document.getElementById('reservationsCardDiv');
		console.log(reservationsCardDiv);
		$.get({
			url: 'rest/reservation/all',
			contentType: 'application/json',
			success: function(all) {
				$('#reservationsCardDiv').html(" ");
				allReservations = all;
				currentReservations = allReservations;
				console.log(all);
				
				for(let reservation of all){
					createCardReservation(reservation);

				}
				
			}
		});


	});
	
}
function createCardReservation(reservation){
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	 user1=user;
        	commenter=user.firstName + " " + user.lastName;
        	commenterUsername=user.username;
        	role1 = user.role;
		$.get({
			url: 'rest/apartment/one/'+ reservation.apartmentId,
			contentType: 'application/json',
			success: function(one) {				
				apartment=one;
			 
				const card = document.createElement('div');
				card.className = 'card mt-4 mb-2';
				const row = document.createElement('div');
				row.className = 'row';
				card.appendChild(row);
				// Prostor za sliku
				const firstColumn = document.createElement('div');
				firstColumn.className = 'col-md-4';
				const image = document.createElement('img');
				image.className = 'img-fluid mt-4 ml-3';
				firstColumn.appendChild(image);
				image.src = apartment.image;
				
				/*
				const editButton = document.createElement('a');
				//editButton.onclick = function () { amenityTemp = amenity; editAmenity(amenity); };
				const editIcon = document.createElement('img');
				editIcon.src = 'images/edit4.png';
				editIcon.className = 'editDeleteButtons1';
				editButton.append(editIcon);
				*/
				
				// Podaci o apartmanu
				const secondColumn = document.createElement('div');
				secondColumn.className = 'col-md-5';
				const header = document.createElement('h3');
				header.className = 'mt-2 ml-4 designText';
				header.innerHTML = 'Reservation - ' + reservation.status + ' ';
				
				const price = document.createElement('h3');
				price.className = 'mt-2 price';
				price.innerHTML = reservation.price + ' $';
				
				const nameRow = document.createElement('dl');
				nameRow.className = 'row forMargin';
				const name = document.createElement('dt');
				name.className = 'col-sm-6';
				name.innerHTML = 'Apartment name:';
				const nameText = document.createElement('dd');
				nameText.className = 'col-sm-6';
				nameText. innerHTML = apartment.name;
				nameRow.appendChild(name);
				nameRow.appendChild(nameText);
				
				const guestUsernameRow = document.createElement('dl');
				guestUsernameRow.className = 'row forMargin';
				const guestUsername = document.createElement('dt');
				guestUsername.className = 'col-sm-6';
				guestUsername.innerHTML = 'Guest:';
				const guestUsernameText = document.createElement('dd');
				guestUsernameText.className = 'col-sm-6';
				guestUsernameText. innerHTML = reservation.guestUsername;
				guestUsernameRow.appendChild(guestUsername);
				guestUsernameRow.appendChild(guestUsernameText);
				
				const placeRow = document.createElement('dl');
				placeRow.className = 'row forMargin';
				
				const message = document.createElement('dt');
				message.className = 'col-sm-6';
				message.innerHTML = 'Message:';
				const messageText = document.createElement('dd');
				messageText.className = 'col-sm-6';
				messageText. innerHTML = reservation.message;
				
				placeRow.appendChild(message);
				placeRow.appendChild(messageText);
	
				
				const roomGuestRow = document.createElement('dl');
				roomGuestRow.className = 'row forMargin';
				
				const noNights = document.createElement('dt');
				noNights.className = 'col-sm-6';
				noNights.innerHTML = 'No.Nights:';
				const noNightsText = document.createElement('dd');
				noNightsText.className = 'col-sm-6';
				noNightsText. innerHTML = reservation.nightCount;
				
				const startDateRow = document.createElement('dl');
				startDateRow.className = 'row forMargin';
				
				const startDate = document.createElement('dt');
				startDate.className = 'col-sm-6';
				startDate.innerHTML = 'Start date:';
				const startDateText = document.createElement('dd');
				startDateText.className = 'col-sm-6';
				startDateText. innerHTML = reservation.startDate;
				
				roomGuestRow.appendChild(noNights);
				roomGuestRow.appendChild(noNightsText);
				startDateRow.appendChild(startDate);
				startDateRow.appendChild(startDateText);
				
				secondColumn.appendChild(header);
				secondColumn.appendChild(price);
				//secondColumn.appendChild(editButton);
				secondColumn.appendChild(nameRow);
				secondColumn.appendChild(guestUsernameRow);
				secondColumn.appendChild(placeRow);
				secondColumn.appendChild(roomGuestRow);
				secondColumn.appendChild(startDateRow);


				row.appendChild(firstColumn);
				row.appendChild(secondColumn);
				
				const quitButton = document.createElement('button');
				quitButton.className = 'btn btn-info forButton';
				quitButton.innerHTML = 'Quit';
				quitButton.onclick = function() { changeStatusReservation(reservation, 'CANCELED'); };
				
				
				const acceptButton = document.createElement('button');
				acceptButton.className = 'btn btn-info forButton';
				acceptButton.innerHTML = 'Accept';
				acceptButton.onclick = function() { changeStatusReservation(reservation, 'ACCEPTED'); };
				
				const declineButton = document.createElement('button');
				declineButton.className = 'btn forButton1';
				declineButton.innerHTML = 'Decline';
				declineButton.onclick = function() { changeStatusReservation(reservation, 'DECLINED'); };
				
				const commentButton = document.createElement('button');
				commentButton.className = 'btn forButton2';
				commentButton.innerHTML = 'Add comment';
				commentButton.onclick = function() { addCommentModal(reservation); };
				
				
				
				if(role1== 'ADMIN'){
					reservationsCardDiv.appendChild(card);
					
				}
				if(role1 == 'GUEST'){
					if(reservation.status=="CREATED" || reservation.status=="ACCEPTED" )
						startDateRow.appendChild(quitButton);
					if(reservation.guestUsername==user1.username)
						reservationsCardDiv.appendChild(card);
					if(reservation.status == "DECLINED" || reservation.status == "FINISHED"){
					    nameRow.appendChild(commentButton);
					}
				}
				if(role1 == 'HOST'){
					if(reservation.status=="CREATED"){
						roomGuestRow.appendChild(acceptButton);
						startDateRow.appendChild(declineButton);
					}else if(reservation.status=="ACCEPTED"){
						startDateRow.appendChild(declineButton);
					}
					if(apartment.hostUsername==user1.username)
						reservationsCardDiv.appendChild(card);
				}
				
			
			}
		});
		
		}
	});
		
	}
function addCommentModal(reservation){
	
	apartmentId2=reservation.apartmentId;
	document.getElementById('comment').value = '';
	document.getElementById('selectGrade').value = '';
	
	
	$('#addCommentModal').modal('show');	


}
function saveComment(){

	let newComment1 = $('#comment').val();
	let newGrade = $('#selectGrade').val();
	let visible = "false";

	if(newComment1 === '' || newGrade === '' ){
		$('#addCommError').text('All fields are required!');
		$('#addCommError').css({"color": "red", "font-size": "20px"});
		$('#addCommError').show().delay(3000).fadeOut();
		return;
	}
	
	
	let newCom = new Commentt(commenter,commenterUsername, apartmentId2, newComment1,newGrade,  visible);
	
	console.log(newCom);
	
	$.ajax({
		type: 'post',
		url: 'rest/comment',
		contentType: 'application/json',
		data: JSON.stringify(newCom),
        type: 'POST',
        success : function () {
        	reservations();
        	$('#addCommentModal').modal('hide');
        	
        	alert('Comment has been sent.');
        }
	});
}

function changeStatusReservation(reservation, newStatus){

	$.ajax({
        url: 'rest/reservation/' + reservation.reservationId + '/' + newStatus,
		contnentType: 'application/json',
		type: 'PUT',
        success: function () {
			$('#successMessage').text('You have successfully changed status of reservation.');
			$('#successMessage').css({"color": "#7FFF00", "font-size": "16px"});
			$("#successMessage").show().delay(3000).fadeOut();
			 reservations(); 
        }
	});
}
class Commentt {
	constructor( commenter, guestUsername,  apartmentId, comment,rate, visible){
		this.commenter = commenter;
		this.guestUsername = guestUsername;
		this.apartmentId = apartmentId;
		this.comment = comment;
		this.rate = rate;
		this.visible = visible;
	}

}
function sortByPriceAscendingRes(){
	
	currentReservations = allReservations;
	currentReservations.sort(function(a, b) {
	    return a.price - b.price;
	});
	
	document.getElementById('reservationsCardDiv').innerHTML = '';
	
	for(let reservation of currentReservations){
		
		if(role1== 'ADMIN'){
			createCardReservation(reservation);
			
		}
		if(role1 == 'GUEST'){

			if(reservation.guestUsername==user1.username)
				createCardReservation(reservation);
			
		}
		if(role1 == 'HOST'){
	
			if(apartment.hostUsername==user1.username)
				createCardReservation(reservation);
		}
		
		
	
	}
	
}
function sortByPriceDescendingRes(){

	currentReservations.sort(function(a, b) {
	    return -(a.price - b.price);
	});
	
	document.getElementById('reservationsCardDiv').innerHTML = '';
	
	for(let reservation of currentReservations){
		
		if(role1== 'ADMIN'){
			createCardReservation(reservation);
			
		}
		if(role1 == 'GUEST'){

			if(reservation.guestUsername==user1.username)
				createCardReservation(reservation);
			
		}
		if(role1 == 'HOST'){
	
			if(apartment.hostUsername==user1.username)
				createCardReservation(reservation);
		}
		
		
	
	}
}
function showSearchResDiv(){

	$('#searchResDiv').show();
	if(role1 == 'GUEST'){
		$('#usernameSearch').hide();
		$('#searchRes').hide();
		$('#clearFiltersRes').hide();
		
		
	}
	
}

function hideSearchResDiv(){
	$('#searchResDiv').hide();
}

function searchR(){
	
	let usernameSearch = $('#usernameSearch').val();
	console.log(usernameSearch);
	
	document.getElementById('reservationsCardDiv').innerHTML = '';
	
	for(let reservation of currentReservations){
			
			if(role1== 'ADMIN'){
				if(reservation.guestUsername == usernameSearch){
				    createCardReservation(reservation);		 
				}else 
					removeItemOnce(currentReservations,reservation);
			}
			if(role1 == 'HOST'){
		
				if(apartment.hostUsername==user1.username)
				{
					if(reservation.guestUsername == usernameSearch){
					    createCardReservation(reservation);
					 
					}else 
						removeItemOnce(currentReservations,reservation);
			}
			
			
		
			}
			}
	console.log(currentReservations);
}

function removeItemOnce(arr, value) {
	 var index = arr.indexOf(value);
	  if (index > -1) {
	    arr.splice(index, 1);
	  }
	  return arr;
}

function clearFiltersR(){
	reservations();
}
