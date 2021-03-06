let cardDiv;
let apartmentId;
let apartmentId1;
let commentDiv;
let finalRate = 0; 
let userRole;
let pricePerNight; 
let username1;
let array=[];
let apartmentForEdit;
let role2;

$(document).ready(function() {
	getAllApartments();
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

function createCard(apartment,role){
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
	
	
	
	if(role === "GUEST"){
	
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
    console.log(array);




	
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

function callMoreModal(apartment){
	apartmentForEdit = apartment;
	console.log(userRole);
	apartmentId = apartment.id;
	$('#apartmentImage .col-md-5').html('<img class="imageSize" src="'+ apartment.image  + '">');
	
	if(userRole !== 'GUEST'){
		const editButton = document.createElement('button');
		editButton.innerHTML = 'Edit';
		editButton.className = 'btn btn-info mt-2';
		editButton.onclick = function () { callEditApartmentModal(apartmentForEdit); };
		$('#apartmentImage .col-md-5').append(editButton);
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = 'Delete';
		deleteButton.className = 'btn btn-danger mt-2 ml-2';
		deleteButton.onclick = function () { confirmDeleteApartment(apartmentId); };
		$('#apartmentImage .col-md-5').append(deleteButton);
	}
	
	$('#apartmentNameText').text(apartment.name);
	$('#pricePerNightText').text(apartment.pricePerNight + "$");
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

function getAllApartments(){
	$('#profile').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#amenityTable').hide();
	$('#usersTable').hide();
	$('#newApartment').hide();
	$('#editApartment').hide();
	$('#searchDiv').hide();
	$('#searchResDiv').hide();
	$('#searchUserDiv').hide();
	$('#searchButtonUser').hide();
	cardDiv = document.getElementById('cardDiv');
	$('#cardDiv').html('');
	$('#cardDiv').show();
	$('#reservationsCardDiv').hide();
	$('#searchButtonRes').hide();
	$('#searchButton').show();
	
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user);
        	username1 = user.username;
        	userRole = user.role;
        	if(user.role === "ADMIN"){
        		$('#addNewApartmentId').hide();
	    		$.get({
	    			url: 'rest/apartment/all',
	    			contentType: 'application/json',
	    			success: function(all) {
	    				allApartments = all;
	    				console.log(all);
	    				
	    				for(let apartment of all){
	    					createCard(apartment,user.role);
	
	    				}
	    				
	    			}
	    		});
	        } else if (user.role === "GUEST"){
	        	$('#addNewApartmentId').hide();
	    		$.get({
	    			url: 'rest/apartment/allActive',
	    			contentType: 'application/json',
	    			success: function(all) {
	    				allApartments = all;
	    				console.log(all);
	    				$('#amenitiesId').hide();
	    				$('#usersId').hide();
	    				for(let apartment of all){
	    					createCard(apartment,user.role);
	
	    				}
	    				
	    			}
	    		});
	        } else if (user.role === "HOST"){
	        	$('#addNewApartmentId').show();
	        	let username = user.username;
	    		$.get({
	    			url: 'rest/apartment/' + username,
	    			contentType: 'application/json',
	    			success: function(all) {
	    				allApartments = all;
	    				console.log(all);
	    				$('#amenitiesId').hide();
	    				for(let apartment of all){
	    					createCard(apartment,user.role);
	    				}
	    				
	    			}
	    		});
	        }
        }

    });
}

function confirmDeleteApartment (apartmentId){
	console.log(apartmentId);
	$('#moreModal').modal('hide');
	$('#confirmDeleteApartmentModal').modal('show');
}

function commentsModal(apartment){
	finalRate = 0;
	console.log(apartment.id);
	$('#commentsModal').modal('show');
	
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user);
        	role2=user.role;
        	
        	if(user.role === "ADMIN" || user.role === "HOST"){
	    		$.get({
	    			url: 'rest/comment/all',
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
        	} else if (user.role === 'GUEST'){
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
	
	const confirmeComButton = document.createElement('button');
	confirmeComButton.className = 'btn btn-info forButton3';
	confirmeComButton.innerHTML = 'Confirme';
	confirmeComButton.onclick = function () { confirmeComment(comment); };
	
	commentDiv.appendChild(userHeader);
	commentDiv.appendChild(line1);
	commentDiv.appendChild(commentString);
	commentDiv.appendChild(rate);
	
	if(role2=== "HOST" && comment.visible === false){
		commentDiv.appendChild(confirmeComButton);
	}
	
	containerList.appendChild(commentDiv);
	
}
function confirmeComment(comment){
	$.ajax({
        url: 'rest/comment/' + comment.id ,
		contnentType: 'application/json',
		type: 'PUT',
        success: function () {
			$('#successMessage').text('You have successfully set comment on visible.');
			$('#successMessage').css({"color": "#7FFF00", "font-size": "16px"});
			$("#successMessage").show().delay(3000).fadeOut();
			$('#commentsModal').modal('hide');
			getAllApartments(); 
        }
	});
}

function deleteApartment(){
	console.log(apartmentId);
	let id = apartmentId;
	$.ajax({
		url: 'rest/apartment/' + id,
		contnentType: 'application/json',
		type: 'DELETE',
        success: function () {
        	$('#confirmDeleteApartmentModal').modal('hide');
        	getAllApartments();
        	alert('Successfuly deleted apartment');

        	
        }
	});
	
}

var currentUser;
vectorSource = null;
Glongitude = "";
Glatitude = "";
let loc;
var ams = [];
let imagePath;
	
$(document).ready(function() {
	initMap();
});

function addNewApartment(){
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	currentUser = user;
        	$('#cardDiv').hide();
        	$('#searchTextField').hide();
			$('#searchButton').hide();
			$('#searchButtonRes').hide();
        	$('#profile').hide();
        	$('#changePassword').hide();
			$('#amenityTable').hide();
			$('#reservationsCardDiv').hide();
			$('#usersTable').hide();
        	$('#editProfile').hide();    
        	$('#editProfile').hide();  
        	$('#editApartment').hide();
        	$('#newApartment').show();

        }
    });
}

function chooseAmenities (){
	$('#chooseAmenitiesModal').modal('show');

	$.get({
		url: 'rest/amenity/' + currentUser.username,
		contentType: 'application/json',
		success: function(amenities) {
			console.log(amenities);
			let modalBody = document.getElementById('chooseAmenitiesBody');
			modalBody.innerHTML = '';
			for(let amenity of amenities){
				let showAmenity = document.createElement('input');
				showAmenity.type = 'checkbox';
				showAmenity.value = amenity.id;
				showAmenity.className = 'ml-2';
				showAmenity.onchange = function () {console.log(showAmenity.value);};
				modalBody.append(showAmenity);
				modalBody.append(" " + amenity.name + " ");

			}

		}
	});

}

function addLocation(){
	$('#addLocationModal').modal('show');
}

function chooseImage(){
	$('#chooseImageModal').modal('show');
}

function choosePicture(){
	$('#aptImagePlaceholder').hide();
	
}

function savePicture(){
	let file;
	if(($('#imagePath'))[0].files.length > 0){
		file = ($('#imagePath'))[0].files[0];
		
		var formData = new FormData();
		formData.append("fileToUpload", file);
		formData.append("name", file.name);
		
		$.ajax({
			url: "rest/apartment/uploadImage",
			type: 'post',
			data: formData, 
			processData: false,
			contentType: false,
			success: function(response) {
				imagePath = 'images/' + ($('#imagePath'))[0].files[0].name;
				$('#chooseImageModal').modal('hide');
			}
		});
		
	}
}

function initMap() {

    var map = new ol.Map({
        target: 'map', 
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM(),
        })],
        view: new ol.View({
            center: ol.proj.fromLonLat([19.83, 45.26]),
            zoom: 4
        })

    });

    map.on('singleclick', function(evt) {

        if (vectorSource != null && vectorSource != undefined)
            vectorSource.clear()

        console.log(evt.coordinate);
        // convert coordinate to EPSG-4326
        console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857',
            'EPSG:4326'));


        var features = [];

        var item = ol.proj.transform(evt.coordinate, 'EPSG:3857',
            'EPSG:4326')
        var longitude = item[0];
        var latitude = item[1];
        Glongitude = item[0]
        Glatitude = item[1]
        
        document.getElementById('gwAdd').value = Glatitude;
        document.getElementById('ghAdd').value = Glongitude;

        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'))
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 1],
                src: "./images/pin.png"
            }))
        });

        iconFeature.setStyle(iconStyle);
        features.push(iconFeature);
        vectorSource = new ol.source.Vector({
            features: features
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(vectorLayer);
    });
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function saveLocation() {
	let street = $('#streetAdd').val();
	let place = $('#placeAdd').val();
	let postalCode = $('#postalAdd').val();
	let gw = $('#gwAdd').val();
	let gh = $('#ghAdd').val();
	
	if(street === '' || place === '' || postalCode === '' || gw === '' || gh === ''){
		$('#locationError').text('All fields are required!');
		$('#locationError').css({"color": "red", "font-size": "16px"});
		$('#locationError').show().delay(3000).fadeOut();
		return;
	}
	
	let addr = new Address(street, place, postalCode);
	loc = new Location(gw, gh, addr);

	$('#addLocationModal').modal('hide');
}

function selectAmenities(){
	let allAmenities = document.getElementById('chooseAmenitiesBody').getElementsByTagName('input');
	for(let i = 0; i < allAmenities.length; i++){
		if(allAmenities[i].checked == true){
			ams.push(allAmenities[i].value);
		}
	}
	console.log(ams);
	$('#chooseAmenitiesModal').modal('hide');
}

function saveApartment(){
	let img = imagePath;
	console.log(img);
	let hostUsername = currentUser.username;
	let name = $('#apartmentName').val();
	let type = $('#selectType').val();
	let pricePerNight = $('#pricePerNight').val();
	let roomCount = $('#selectNoRooms').val();
	let guestCount = $('#selectNoGuests').val();
	let startDate = $('#startDate').val();
	let endDate = $('#endDate').val();
	let timeForCheckIn = $('#startTime').val();
	let timeForCheckOut = $('#endTime').val();
	let description = $('#apartmentDescription').val();
	
	if(name === '' || type === '' || pricePerNight === '', roomCount === '', guestCount === '', startDate === '', endDate === '', timeForCheckIn === '', timeForCheckOut === ''){
		$('#newAptError').text('All fields except description are required!');
		$('#newAptError').css({"color": "red", "font-size": "14px"});
		$('#newAptError').show().delay(3000).fadeOut();
		return;
	}
	
	if(loc == null){
		$('#newAptError').text('Location is required.');
		$('#newAptError').css({"color": "red", "font-size": "14px"});
		$('#newAptError').show().delay(3000).fadeOut();
		return;
	}

	if(img == ''){
		$('#newAptError').text('Picture is required');
		$('#newAptError').css({"color": "red", "font-size": "14px"});
		$('#newAptError').show().delay(3000).fadeOut();
		return;
	}
	
	let newApartment = new Apartment(name, type, pricePerNight, roomCount, guestCount, startDate, endDate, timeForCheckIn, timeForCheckOut, loc, hostUsername, ams, img, description);
	console.log(newApartment);
	
	$.ajax({
		type: 'post',
		url: 'rest/apartment',
		contentType: 'application/json',
		data: JSON.stringify(newApartment),
        type: 'POST',
        success : function () {
        	getAllApartments();
        	alert('Successfully added new apartment.');
        }
	});
}
function saveReservation(){
	
	let guestUsername = username1;
	let nightCount = $('#selectNoNights').val();
	let price =  pricePerNight*nightCount;
	let startDate1 = $('#datepicker').val();
	let message = $('#message').val();
	let status = 'CREATED';
	let startDate;
	  dArr = startDate1.split("-");  // ex input "17-09-2020"
	  startDate= dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]; 
	
	console.log(nightCount,startDate,message );
	if(nightCount === '' || startDate === '' || message === ''){
		$('#newResError').text('All fields are required!');
		$('#newResError').css({"color": "red", "font-size": "20px"});
		$('#newResError').show().delay(3000).fadeOut();
		return;
	}
	
	
	let newReservation = new Reservation(apartmentId1, startDate,nightCount, price, message, guestUsername, status);
	console.log(newReservation);
	
	$.ajax({
		type: 'post',
		url: 'rest/reservation',
		contentType: 'application/json',
		data: JSON.stringify(newReservation),
        type: 'POST',
        success : function () {
        	getAllApartments();
        	$('#reservationModal').modal('hide');
        	
        	alert('Reservation has been sent.');
        }
	});
}

class Apartment {
	constructor(name, type, pricePerNight, roomCount, guestCount, startDate, endDate, timeForCheckIn, timeForCheckOut, location, hostUsername, amenities, image, description){
		this.name = name;
		this.type = type;
		this.pricePerNight = pricePerNight;
		this.roomCount = roomCount;
		this.guestCount = guestCount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.timeForCheckIn = timeForCheckIn;
		this.timeForCheckOut = timeForCheckOut;
		this.location = location;
		this.amenities = amenities;
		this.hostUsername = hostUsername;
		this.image = image;	
		this.description = description;
	}
}
class Reservation {
	constructor(apartmentId,startDate, nightCount, price,  message, guestUsername,status){
		this.apartmentId = apartmentId;
		this.startDate = startDate;
		this.nightCount = nightCount;
		this.price = price;
		this.message = message;
		this.guestUsername = guestUsername;
		this.status = status;
	}
}

class Address {
	constructor(street, place, postalCode){
		this.street = street;
		this.place = place;
		this.postalCode = postalCode;
	}
}

class Location {
	constructor(geoWidth, geoHeight, address){
		this.geoWidth = geoWidth;
		this.geoHeight = geoHeight;
		this.address = address;
	}
}

class ApartmentEdit {
	constructor(name, type, pricePerNight, roomCount, guestCount, startDate, endDate, timeForCheckIn, timeForCheckOut, location, hostUsername, image, description){
		this.name = name;
		this.type = type;
		this.pricePerNight = pricePerNight;
		this.roomCount = roomCount;
		this.guestCount = guestCount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.timeForCheckIn = timeForCheckIn;
		this.timeForCheckOut = timeForCheckOut;
		this.location = location;
		this.hostUsername = hostUsername;
		this.image = image;	
		this.description = description;
	}
}

function callEditApartmentModal(apartment){
	console.log(apartment);
	$('#moreModal').modal('hide');
	$('#profile').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#amenityTable').hide();
	$('#usersTable').hide();
	$('#newApartment').hide();
	cardDiv = document.getElementById('cardDiv');
	$('#cardDiv').html('');
	$('#cardDiv').hide();
	$('#searchDiv').hide();
	$('#searchResDiv').hide();
	$('#searchUserDiv').hide();
	$('#searchButtonUser').hide();
	$('#searchButton').hide();
	$('#searchButtonRes').hide();
	$('#editApartment').show();
	
	document.getElementById('apartmentNameEdit').value = apartment.name;
	document.getElementById('selectTypeEdit').value = apartment.type;
	document.getElementById('pricePerNightEdit').value = apartment.pricePerNight;
	document.getElementById('selectNoRoomsEdit').value = apartment.roomCount;
	document.getElementById('selectNoGuestsEdit').value = apartment.guestCount;
	//document.getElementById('startDateEdit').value = apartment.name;
	//document.getElementById('endDateEdit').value = apartment.name;
	document.getElementById('startTimeEdit').value = apartment.timeForCheckIn;
	document.getElementById('endTimeEdit').value = apartment.timeForCheckOut;
	document.getElementById('apartmentDescriptionEdit').value = apartment.description;
	
	
}

function updateApartment(){
	let id = apartmentForEdit.id;
	let eStreet = apartmentForEdit.location.address.street;
	let ePlace = apartmentForEdit.location.address.place;
	let ePostalCode = apartmentForEdit.location.address.postalCode;
	let eGw = apartmentForEdit.location.geoWidth;
	let eGh = apartmentForEdit.location.geoHeight;
	let eName = $('#apartmentNameEdit').val();
	let eType = $('#selectTypeEdit').val();
	let ePrice = $('#pricePerNightEdit').val();
	let eNoGuests = $('#selectNoGuestsEdit').val();
	let eNoRooms = $('#selectNoRoomsEdit').val();
	let eStartDate = $('#startDateEdit').val();
	let eEndDate = $('#endDateEdit').val();
	let eCheckIn = $('#startTimeEdit').val();
	let eCheckOut = $('#endTimeEdit').val();
	let eDescription = $('#apartmentDescriptionEdit').val();
	let eImage = apartmentForEdit.image;
	
	if($('#streetAdd').val() != ''){
		eStreet = $('#streetAdd').val();
	}
	
	if($('#placeAdd').val() != ''){
		ePlace = $('#placeAdd').val();
	}
	
	if($('#postalAdd').val() != ''){
		ePostalCode = $('#postalAdd').val();
	}
	
	if($('#gwAdd').val() != ''){
		eGw = $('#gwAdd').val();
	}
	
	if($('#ghAdd').val() != ''){
		eGh = $('#ghAdd').val();
	}
	
	if(imagePath != null){
		eImage = imagePath;
	}
	
	let eAddress = new Address(eStreet, ePlace, ePostalCode);
	
	let eLocation = new Location(eGw, eGh, eAddress);
	
	let apartment = new ApartmentEdit(eName, eType, ePrice, eNoRooms, eNoGuests, eStartDate, eEndDate, eCheckIn, eCheckOut, eLocation, apartmentForEdit.hostUsername, eImage, eDescription);
	
	console.log(apartment);
	
	$.ajax({
		url: 'rest/apartment/' + id ,
		contentType: 'application/json',
		type: 'PUT',
		data: JSON.stringify(apartment),
        success: function () {
        	getAllApartments();
        	alert('Apartment is edited successfully.');
        }
		
	});
	
	
}

function showSearchDiv(){
	$('#searchDiv').show();
}

function hideSearchDiv(){
	$('#searchDiv').hide();
}




