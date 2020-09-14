let username;
let amenityTemp;

function amenities(){
	$('#cardDiv').hide();
	$('#searchTextField').hide();
	$('#searchButton').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#profile').hide();
	$('#newApartment').hide();
	$('#usersTable').hide();
	$('#reservationsCardDiv').hide();
	$('#amenityTable').show();

	
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user.username);
        	username = user.username;
        	$.get({
        		url: 'rest/amenity/' + user.username,
        		contentType: 'application/json',
        		success: function(amenities) {
        			let number = 0;
        			$('#amenityTableBody').html('');
        			for(let amenity of amenities){
        				number = number + 1;
        				const tr = document.createElement('tr');
        				tr.className = 'rowHeight';
        				const th = document.createElement('th');
        				th.scope = 'row';
        				th.className = 'rowHeight';
        				th.innerHTML = number;
        				tr.append(th);
        				
        				const tdName = document.createElement('td');
        				tdName.className = 'rowHeight';
        				tdName.innerHTML = amenity.name;
        				tr.append(tdName);
        				
        				const tdEdit = document.createElement('td');
        				tdEdit.className = 'rowHeight';
        				const editButton = document.createElement('a');
        				editButton.onclick = function () { amenityTemp = amenity; editAmenity(amenity); };
        				const editIcon = document.createElement('img');
        				editIcon.src = 'images/edit1.png';
        				editIcon.className = 'editDeleteButtons';
        				editButton.append(editIcon);
        				tdEdit.append(editButton);
        				tr.append(tdEdit);
        				
        				const tdDelete = document.createElement('td');
        				tdDelete.className = 'rowHeight';
        				const deleteButton = document.createElement('a');
        				deleteButton.onclick = function () { amenityTemp = amenity; deleteAmenity(amenity); };
        				const deleteIcon = document.createElement('img');
        				deleteIcon.src = 'images/delete.png';
        				deleteIcon.className = 'editDeleteButtons';
        				deleteButton.append(deleteIcon);
        				tdDelete.append(deleteButton);
        				tr.append(tdDelete);
        				
        				const tbody = $('#amenityTableBody');
        				tbody.append(tr);
        			}
        		}
        	});
        
        }
    });
	
	
	
}

function editAmenity(amenity){
	console.log(amenity.name);
	document.getElementById('amenityNameEdit').value = amenity.name;
	$('#editAmenityModal').modal('show');
}

function deleteAmenity(amenity){
	let id = amenity.id;
	$('#confirmDeleteAmenityModal').modal('show');
}

function addNewAmenityModal(){
	document.getElementById('newAmenityName').value = "";
	$('#addNewAmenityModal').modal('show');
}

function saveChanges(){
	let id = amenityTemp.id;
	let name = $('#amenityNameEdit').val();
	
	if(!name){
		$('#emptyAmenityEditName').text('Amenity name is required!');
		$('#emptyAmenityEditName').css({"color": "red", "font-size": "12px"});
		$('#emptyAmenityEditName').show().delay(3000).fadeOut();
		return;
	}
	
	if(name.length < 3){
		$('#ltAmenityEditName').text('Amenity name must contain min. 3 characters.');
		$('#ltAmenityEditName').css({"color": "red", "font-size": "12px"});
		$('#ltAmenityEditName').show().delay(3000).fadeOut();
		return;
	}
	
	if(name.length > 20){
		$('#gtAmenityEditName').text('Amenity name must contain max. 20 characters.');
		$('#gtAmenityEditName').css({"color": "red", "font-size": "12px"});
		$('#gtAmenityEditName').show().delay(3000).fadeOut();
		return;
	}
	
	$.ajax({
		url: 'rest/amenity/' + id + '/' + name + '/' + username,
		contnentType: 'application/json',
		type: 'PUT',
        success: function () {
        	$('#editAmenityModal').modal('hide');
        	amenities();
        	
        }
	});
	
}

function confirmDelete(){
	let id = amenityTemp.id;
	$.ajax({
		url: 'rest/amenity/' + id + '/' + username,
		contnentType: 'application/json',
		type: 'DELETE',
        success: function () {
        	$('#confirmDeleteAmenityModal').modal('hide');
        	amenities();
        	
        }
	});
}

function addNewAmenity(){
	let name = $('#newAmenityName').val();
	console.log(name);
	
	if(!name){
		$('#emptyNewAmenityName').text('Amenity name is required!');
		$('#emptyNewAmenityName').css({"color": "red", "font-size": "12px"});
		$('#emptyNewAmenityName').show().delay(3000).fadeOut();
		return;
	}
	
	if(name.length < 3){
		$('#ltNewAmenityName').text('Amenity name must contain min. 3 characters.');
		$('#ltNewAmenityName').css({"color": "red", "font-size": "12px"});
		$('#ltNewAmenityName').show().delay(3000).fadeOut();
		return;
	}
	
	if(name.length > 20){
		$('#gtNewAmenityName').text('Amenity name must contain max. 20 characters.');
		$('#gtNewAmenityName').css({"color": "red", "font-size": "12px"});
		$('#gtNewAmenityName').show().delay(3000).fadeOut();
		return;
	}
	
	$.post({
        url: 'rest/amenity/' + username + '/' + name,
		contnentType: 'application/json',
        success: function () {
        	$('#addNewAmenityModal').modal('hide');
        	amenities();
        	alert('New Amenity is successfully added.');
        }
	});
	
	
}