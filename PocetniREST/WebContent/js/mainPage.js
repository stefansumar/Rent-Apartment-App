let cardDiv;

$(document).ready(function() {
	$('#profile').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#amenityTable').hide();
	cardDiv = document.getElementById('cardDiv');
	
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user);
        	
        	if(user.role === "ADMIN"){
	    		$.get({
	    			url: 'rest/apartment/all',
	    			contentType: 'application/json',
	    			success: function(all) {
	    				allApartments = all;
	    				console.log(all);
	    				
	    				for(let apartment of all){
	    					createCard(apartment);
	
	    				}
	    				
	    			}
	    		});
	        } else if (user.role === "GUEST"){
	    		$.get({
	    			url: 'rest/apartment/allActive',
	    			contentType: 'application/json',
	    			success: function(all) {
	    				allApartments = all;
	    				console.log(all);
	    				
	    				for(let apartment of all){
	    					createCard(apartment);
	
	    				}
	    				
	    			}
	    		});
	        }
        }

    });
    	
	
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

function createCard(apartment){
	const card = document.createElement('div');
	card.className = 'card mt-4 mb-2';
	const row = document.createElement('div');
	row.className = 'row';
	card.appendChild(row);
	// Prostor za sliku
	const firstColumn = document.createElement('div');
	firstColumn.className = 'col-md-4';
	const image = document.createElement('img');
	image.className = 'img-fluid mt-2 ml-2';
	firstColumn.appendChild(image);
	image.src = apartment.image;
	
	// Podaci o apartmanu
	const secondColumn = document.createElement('div');
	secondColumn.className = 'col-md-5';
	const header = document.createElement('h3');
	header.className = 'mt-2 designText';
	header.innerHTML = apartment.name;
	
	const price = document.createElement('h3');
	price.className = 'mt-2 price';
	price.innerHTML = apartment.pricePerNight + ' $';
	
	const typeRow = document.createElement('dl');
	typeRow.className = 'row forMargin';
	const type = document.createElement('dt');
	type.className = 'col-sm-3';
	type.innerHTML = 'Type:';
	const typeText = document.createElement('dd');
	typeText.className = 'col-sm-6';
	typeText. innerHTML = apartment.type;
	typeRow.appendChild(type);
	typeRow.appendChild(typeText);
	
	const streetRow = document.createElement('dl');
	streetRow.className = 'row forMargin';
	const street = document.createElement('dt');
	street.className = 'col-sm-3';
	street.innerHTML = 'Street:';
	const streetText = document.createElement('dd');
	streetText.className = 'col-sm-6';
	streetText. innerHTML = apartment.location.address.street;
	streetRow.appendChild(street);
	streetRow.appendChild(streetText);
	
	const placeRow = document.createElement('dl');
	placeRow.className = 'row forMargin';
	const place = document.createElement('dt');
	place.className = 'col-sm-3';
	place.innerHTML = 'Place:';
	const placeText = document.createElement('dd');
	placeText.className = 'col-sm-6';
	placeText. innerHTML = apartment.location.address.place;
	const moreButton = document.createElement('button');
	moreButton.className = 'btn btn-info forButton';
	moreButton.innerHTML = 'More';
	placeRow.appendChild(place);
	placeRow.appendChild(placeText);
	placeRow.appendChild(moreButton);
	
	const roomGuestRow = document.createElement('dl');
	roomGuestRow.className = 'row forMargin';
	const roomCount = document.createElement('dt');
	roomCount.className = 'col-sm-4';
	roomCount.innerHTML = 'No.Rooms:';
	const roomCountText = document.createElement('dd');
	roomCountText.className = 'col-sm-1';
	roomCountText. innerHTML = apartment.roomCount;
	const guestCount = document.createElement('dt');
	guestCount.className = 'col-sm-4';
	guestCount.innerHTML = 'No.Guests:';
	const guestCountText = document.createElement('dd');
	guestCountText.className = 'col-sm-1';
	guestCountText. innerHTML = apartment.guestCount;
	const commentsButton = document.createElement('button');
	commentsButton.className = 'btn btn-info forButton';
	commentsButton.innerHTML = 'Comments';
	roomGuestRow.appendChild(roomCount);
	roomGuestRow.appendChild(roomCountText);
	roomGuestRow.appendChild(guestCount);
	roomGuestRow.appendChild(guestCountText);
	roomGuestRow.appendChild(commentsButton);
	
	secondColumn.appendChild(header);
	secondColumn.appendChild(price);
	secondColumn.appendChild(typeRow);
	secondColumn.appendChild(streetRow);
	secondColumn.appendChild(placeRow);
	secondColumn.appendChild(roomGuestRow);

	row.appendChild(firstColumn);
	row.appendChild(secondColumn);
	
	cardDiv.appendChild(card);
	
}

