var currentUser;
vectorSource = null;
Glongitude = "";
Glatitude = "";
	
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
}

function addLocation(){
	$('#addLocationModal').modal('show');
}

function initMap() {

    var map = new ol.Map({
        target: 'map', // id of the map div
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