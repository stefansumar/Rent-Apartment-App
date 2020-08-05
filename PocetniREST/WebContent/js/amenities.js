let username;
let amenityTemp;

function amenities(){
	$('#cardDiv').hide();
	$('#searchTextField').hide();
	$('#searchButton').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#profile').hide();
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
        				deleteButton.onclick = function () { deleteAmenity(amenity); };
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
	console.log(amenity);
	$('#confirmDeleteAmenityModal').modal('show');
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