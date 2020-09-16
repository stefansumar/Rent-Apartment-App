function search(){
	let startDateSearch = $('#startDateSearch').val();
	let endDateSearch = $('#endDateSearch').val();
	let placeSearch = $('#placeSearch').val();
	let minPriceSearch = $('#minPriceSearch').val();
	let maxPriceSearch = $('#maxPriceSearch').val();
	let minRoomsSearch = $('#minRoomsSearch').val();
	let maxRoomsSearch = $('#maxRoomsSearch').val();
	let noGuestsSearch = $('#noGuestsSearch').val();
	
	var searchDTO = new SearchApartmentDTO(startDateSearch, endDateSearch, placeSearch, minPriceSearch, maxPriceSearch,
			minRoomsSearch, maxRoomsSearch, noGuestsSearch);
	console.log(searchDTO);
	
	$.post({
		url: 'rest/apartment/search',
		contentType: 'application/json',
		data: JSON.stringify(searchDTO),
        success: function (searched) {
        	document.getElementById('cardDiv').innerHTML = '';
        	console.log(searched);
        	for(let ap of searched){
        		createCard(ap);
        	}
        }
	});
	
}

class SearchApartmentDTO {
	constructor(startDate, endDate, place, minPrice, maxPrice, minRooms, maxRooms, noGuests){
		this.startDate = startDate;
		this.endDate = endDate;
		this.place = place;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.minRooms = minRooms;
		this.maxRooms = maxRooms;
		this.noGuests = noGuests;
	}
}

function clearFilters(){
	document.getElementById('startDateSearch').value = '';
	document.getElementById('endDateSearch').value = '';
	document.getElementById('placeSearch').value = '';
	document.getElementById('minPriceSearch').value = '';
	document.getElementById('maxPriceSearch').value = '';
	document.getElementById('minRoomsSearch').value = '';
	document.getElementById('maxRoomsSearch').value = '';
	document.getElementById('noGuestsSearch').value = '';
	search();
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