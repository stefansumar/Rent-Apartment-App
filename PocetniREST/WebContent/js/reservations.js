
let allReservations;
let reservationsCardDiv;
let apartment;

function reservations(){
	
	$('#cardDiv').hide();
	$('#searchTextField').hide();
	$('#searchButton').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#profile').hide();
	$('#newApartment').hide();
	$('#amenityTable').hide();
    $('#usersTable').hide();
    $('#reservationsCardDiv').show();
    
	$(document).ready(function() {
		reservationsCardDiv = document.getElementById('reservationsCardDiv');
		console.log(reservationsCardDiv);
		$.get({
			url: 'rest/reservation/all',
			contentType: 'application/json',
			success: function(all) {
				allReservations = all;
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
				
				const editButton = document.createElement('a');
				//editButton.onclick = function () { amenityTemp = amenity; editAmenity(amenity); };
				const editIcon = document.createElement('img');
				editIcon.src = 'images/edit4.png';
				editIcon.className = 'editDeleteButtons1';
				editButton.append(editIcon);
				
				
				// Podaci o apartmanu
				const secondColumn = document.createElement('div');
				secondColumn.className = 'col-md-5';
				const header = document.createElement('h3');
				header.className = 'mt-2 ml-4 designText';
				header.innerHTML = 'Reservation ' + reservation.reservationId + ' - ' + reservation.status + ' ';
				
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
				
				const moreButton = document.createElement('button');
				moreButton.className = 'btn btn-info forButton';
				moreButton.innerHTML = 'More';
				moreButton.onclick = function() { callMoreModal(apartment); };
				placeRow.appendChild(message);
				placeRow.appendChild(messageText);
				//placeRow.appendChild(moreButton);
				
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
				
				const commentsButton = document.createElement('button');
				commentsButton.className = 'btn btn-info forButton';
				commentsButton.innerHTML = 'Comments';
				commentsButton.onclick = function () { commentsModal(apartment); };
				roomGuestRow.appendChild(noNights);
				roomGuestRow.appendChild(noNightsText);
				startDateRow.appendChild(startDate);
				startDateRow.appendChild(startDateText);
			//	roomGuestRow.appendChild(commentsButton);
				
				secondColumn.appendChild(header);
				secondColumn.appendChild(price);
				secondColumn.appendChild(editButton);
				secondColumn.appendChild(nameRow);
				secondColumn.appendChild(guestUsernameRow);
				secondColumn.appendChild(placeRow);
				secondColumn.appendChild(roomGuestRow);
				secondColumn.appendChild(startDateRow);


				row.appendChild(firstColumn);
				row.appendChild(secondColumn);
				
				reservationsCardDiv.appendChild(card);
				
			}
		});
		
	
		
	}
