var currentUser;
vectorSource = null;
Glongitude = "";
Glatitude = "";
let loc;
var ams = [];
var formData;
	
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
        	$('#profile').hide();
        	$('#changePassword').hide();
        	$('#amenityTable').hide();
        	$('#editProfile').hide();    
        	$('#editProfile').hide();  
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
	
	if(($('#imagePath'))[0].files.length > 0){
		$('#aptImagePlaceholder').hide();
		file = ($('#imagePath'))[0].files[0];
		console.log(file);
		
		formData = new FormData();
		formData.append("fileToUpload", file);
		formData.append("name", file.name);
	}
	
	$('#chooseImageModal').modal('hide');
	
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
	}
	
	console.log(formData);
	if(formData == null || formData == ''){
		$('#newAptError').text('Picture is required');
		$('#newAptError').css({"color": "red", "font-size": "14px"});
		$('#newAptError').show().delay(3000).fadeOut();
	}
}

class Apartment {
	constructor(name, type, pricePerNight, roomCount, guestCount, startDate, endDate, timeForCheckIn, timeForCheckOut, location, hostUsername, amenities, image){
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
