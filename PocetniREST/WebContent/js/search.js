let currentApartments;
let userRole1;
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
	$.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user);
        	username1 = user.username;
        	userRole1 = user.role;
        }
        });
	$.post({
		url: 'rest/apartment/search',
		contentType: 'application/json',
		data: JSON.stringify(searchDTO),
        success: function (searched) {
        	currentApartments = searched;
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
	
	const reservationButton = document.createElement('button');
	reservationButton.className = 'btn forButton2';
	reservationButton.innerHTML = 'Make reservation';
	reservationButton.onclick = function () { reservationModal(apartment); };
	
	
	
	if(userRole === "GUEST"){

		typeRow.appendChild(reservationButton);
	}
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
function reservationModal(apartment){

	 array = [];
	array.length = 0;
	console.log(apartment.reservations);
	for(let reservation of apartment.reservations){      
		if(reservation.status == "ACCEPTED"){
	    var a=1;
		var dt=new Date(reservation.startDate);
		array.push(reservation.startDate);
		while(a<reservation.nightCount){
			var date;
			dt.setDate(dt.getDate()+1);
			a=a+1;
		    console.log(dt.toString());

		   date=convertDate(dt.toString());
		    array.push(date);
		
		    
		}	
		
	}
	}
   //console.log(array);




	
	apartmentId1 = apartment.id;
	pricePerNight= apartment.pricePerNight;
	document.getElementById('message').value = '';
	document.getElementById('datepicker').value = '';
	document.getElementById('selectNoNights').value = '';
	
	var end = "";
	var y = "";
	var m = "";
	var d = "";
	
	 end = apartment.endDate.split("-");
	 y = end[0];
	 m = end[1];
	 d = end[2];
	
	$('#datepicker').datepicker({
		dateFormat: 'dd-mm-yy',		
	    maxDate:new Date(apartment.endDate), 
	    minDate:new Date(),
   beforeShowDay: function(date){
       var string = jQuery.datepicker.formatDate('yy-mm-dd', date);   
       return [$.inArray(string, array) == -1];
       
   }
	});
	
	var maximumDate = d+"-"+m+"-"+y;
	$("#datepicker" ).datepicker( "option", "maxDate", maximumDate);
	console.log(y, m, d);
	
	$('#reservationModal').modal('show');	

}

function convertDate(d){
	 var dArr1 = [];
	  dArr1 = d.split(" ");
	 
	  if(dArr1[1] == "Jan")
		  dArr1[1] = 1;
	  else if(dArr1[1] == "Feb")
		  dArr1[1] = 2;
	  else if(dArr1[1] == "Mar")
		  dArr1[1] = 3;  
	  else if(dArr1[1] == "Apr")
		  dArr1[1] = 4;
	  else if(dArr1[1] == "May")
		  dArr1[1] = 5;
	  else if(dArr1[1] == "Jun")
		  dArr1[1] = 6;
	  else if(dArr1[1] == "Jul")
		  dArr1[1] = 7;
	  else if(dArr1[1] == "Aug")
		  dArr1[1] = 8;
	  else if(dArr1[1] == "Sep")
		  dArr1[1] = 9;
	  else if(dArr1[1] == "Oct")
		  dArr1[1] = 10;
	  else if(dArr1[1] == "Nov")
		  dArr1[1] = 11;
	  else if(dArr1[1] == "Dec")
		  dArr1[1] = 12;
	  
	  if(dArr1[1]<10){
	  var date = dArr1[3]+ "-0" +dArr1[1]+ "-" +dArr1[2]; 
	}
	  else 
		  var date = dArr1[3]+ "-" +dArr1[1]+ "-" +dArr1[2]; 
	  return date;
}


function sortByPriceAscending(){
	
	if(currentApartments == null){
		alert('Click search first.');
		return;
	}
	
	currentApartments.sort(function(a, b) {
	    return a.pricePerNight - b.pricePerNight;
	});
	
	document.getElementById('cardDiv').innerHTML = '';
	for(let ap of currentApartments){
		createCard(ap);
	}
	
}

function sortByPriceDescending(){
	if(currentApartments == null){
		alert('Click search first.');
		return;
	}
	
	currentApartments.sort(function(a, b) {
	    return -(a.pricePerNight - b.pricePerNight);
	});
	
	document.getElementById('cardDiv').innerHTML = '';
	for(let ap of currentApartments){
		createCard(ap);
	}
}