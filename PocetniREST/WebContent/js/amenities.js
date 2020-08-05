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
        				const editIcon = document.createElement('img');
        				editIcon.src = 'images/edit1.png';
        				editIcon.className = 'editDeleteButtons';
        				editButton.append(editIcon);
        				tdEdit.append(editButton);
        				tr.append(tdEdit);
        				
        				const tdDelete = document.createElement('td');
        				tdDelete.className = 'rowHeight';
        				const deleteButton = document.createElement('a');
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