let allApartments;
let cardDiv;
let finalRate = 0;

function showLoginForm(){
	window.location = "./login.html";
}

function showSignUpForm(){
	window.location = "./registration.html";
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
	moreButton.onclick = function() { callMoreModal(apartment); };
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
	commentsButton.onclick = function () { commentsModal(apartment); };
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

$(document).ready(function() {
	cardDiv = document.getElementById('cardDiv');
	console.log(cardDiv);
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


});

function callMoreModal(apartment){
	$('#apartmentImage .col-md-5').html('<img class="imageSize" src="'+ apartment.image  + '">');
	$('#apartmentName').text(apartment.name);
	$('#pricePerNight').text(apartment.pricePerNight + "$");
	$('#type').html("<b>   Type:   </b> " + apartment.type);
	$('#street').html("<b>   Street:   </b> " + apartment.location.address.street);
	$('#place').html("<b>   Place:   </b> " + apartment.location.address.place);
	$('#roomGuests').html("<b>   No.Rooms:   </b> " + apartment.roomCount + "<b>   No.Guests:   </b> " + apartment.guestCount);
	$('#advertiser').html("<b>   Advertiser:   </b> " + apartment.hostUsername);
	if(apartment.description){
	$('#description').html("<b>   Description:   </b> " + apartment.description);
	} else {
		$('#description').html("<b>   Description:   </b> There is no description for this apartment. ");
	}
	
	$('#amenities').html(" ");
	$('#amenities').html("<b>   Amenities:   </b> ");
	if(apartment.amenities.length !== 0){
		for(let amenity of apartment.amenities){
			if(!amenity.deleted){
				const correctImg = document.createElement('img');
				correctImg.className = 'correctImageSize';
				correctImg.src = 'images/correct.png';
				$('#amenities').append(correctImg);
				$('#amenities').append(" " + amenity.name + " ");
			}
		}
	} else {
		$('#amenities').html(" ");
		$('#amenities').html("<b>   Amenities:   </b> There are no avaible amenities in this apartment.");
	}
	
	$('#moreModal').modal('show');

}

function commentsModal(apartment){
	finalRate = 0;
	console.log(apartment.id);
	$('#commentsModal').modal('show');

	$.get({
		url: 'rest/comment/allVisible',
		contentType: 'application/json',
		success: function(all) {
			allApartments = all;
			console.log(all);
			
			$('#allComments').html('');
			
			let counter = 0;
			for(let comment of all){
				if(apartment.id == comment.apartmentId){
					counter = counter + 1;
					finalRate = finalRate + comment.rate;
				}
			}
			if(counter !== 0){
				finalRate = finalRate/counter;
				console.log(finalRate);
			}
			
			if(finalRate !== 0){
				$('#allComments').html('<p class="mt-2 mb-2 user_name">Rate: ' + finalRate + '/10</p>');
			} else {
				$('#allComments').html('');
				$('#allComments').html('<p class="mt-2 mb-2">There are no comments for this apartment.</p>');
				
			}
			
			for(let comment of all){
				if(apartment.id == comment.apartmentId){
					createCommentCard(comment);
				}
			}
			
		}
	});
        	


	
}

function createCommentCard(comment){

	let line1 = document.createElement('hr');
	let line2 = document.createElement('hr');
	let containerList = document.getElementById('allComments');
	let commentDiv = document.createElement('div');
	commentDiv.className = 'media-body commentBorder mt-2';
	let userHeader = document.createElement('h4');
	userHeader.className = 'media-heading user_name';
	userHeader.innerHTML = comment.commenter + ' (' + comment.guestUsername + ')';
	let commentString = document.createElement('p');
	commentString.className = 'mb-1';
	commentString.innerHTML = comment.comment;
	let rate = document.createElement('p');
	rate.className = 'mt-1';
	rate.innerHTML = '<b>Rate: </b>' + comment.rate;

	commentDiv.appendChild(userHeader);
	commentDiv.appendChild(line1);
	commentDiv.appendChild(commentString);
	commentDiv.appendChild(rate);
	containerList.appendChild(commentDiv);
	
}
