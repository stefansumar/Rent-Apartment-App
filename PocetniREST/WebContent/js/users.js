let userList=[];
let userList1;
let user;
let apartments;
let role;
function users(){
	$('#cardDiv').hide();
	$('#searchTextField').hide();
	$('#searchButton').hide();
	$('#editProfile').hide();
	$('#changePassword').hide();
	$('#profile').hide();
	$('#newApartment').hide();
	$('#amenityTable').hide();
	$('#reservationsCardDiv').hide();
    $('#usersTable').show();
    userList=[];
    
    $.get({
        url: 'rest/user/getCurrentUser',
		contnentType: 'application/json',
        success: function (user) {
        	console.log(user.username);
        	role = user.role;
        	$.get({
        		 url: 'rest/user/getAllUsers',
        			contnentType: 'application/json',
        	        success: function (userList1) {
        	        	if( role == "HOST"){
        	        		 $.get({
        	        		        url: 'rest/apartment/' + user.username,
        	        				contnentType: 'application/json',
        	        		        success: function (apartments) {    		        	
        	        		        	for(let user of userList1){
        	        		        		for(let apartment of apartments){      	        		        
        	        		        			for(let reservation of apartment.reservations){      	        		        				
        	        		        				if(reservation.guestUsername==user.username){
        	        		        							if(!userList.includes(user))	
        	        		        					           userList.push(user);
        	        		        				}
        	        		        			}
        	        		        		}
        	        		        	}
        	        		        	let number = 0;
        	                			$('#usersTableBody').html('');
        	                			for(let user of userList){
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
        	                				tdName.innerHTML = user.firstName;
        	                				tr.append(tdName);
        	                				
        	                				const tdSurname = document.createElement('td');
        	                				tdSurname.className = 'rowHeight';
        	                				tdSurname.innerHTML = user.lastName;
        	                				tr.append(tdSurname);
        	                				
        	                				const tdUserName = document.createElement('td');
        	                				tdUserName.className = 'rowHeight';
        	                				tdUserName.innerHTML = user.username;
        	                				tr.append(tdUserName);
        	                				
        	                				const tdGender = document.createElement('td');
        	                				tdGender.className = 'rowHeight';
        	                				tdGender.innerHTML = user.gender;
        	                				tr.append(tdGender);
        	                				
        	                				const tdRole = document.createElement('td');
        	                				tdRole.className = 'rowHeight';
        	                				tdRole.innerHTML = user.role;
        	                				tr.append(tdRole);
        	                			
        	                				
        	                				const tdBlock = document.createElement('td');
        	                				tdBlock.className = 'rowHeight';
        	                				const blockButton = document.createElement('a');
        	                				blockButton.onclick = function () { userTemp = user; blockUser(user); };
        	                				const blockIcon = document.createElement('img');
        	                				blockIcon.src = 'images/block3.png';
        	                				blockIcon.className = 'editDeleteButtons';
        	                				blockButton.append(blockIcon);
        	                				tdBlock.append(blockButton);
        	                				if(role == "ADMIN")
        	                				tr.append(tdBlock);
        	                				
        	                				const tbody = $('#usersTableBody');
        	                				tbody.append(tr);
        	        		        	
        	        		    	}
        	        		        }
        	             	});
        	        		 
        	        	}else if (role == "ADMIN"){
        	        		userList=userList1;
        	        	
        			let number = 0;
        			$('#usersTableBody').html('');
        			for(let user of userList){
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
        				tdName.innerHTML = user.firstName;
        				tr.append(tdName);
        				
        				const tdSurname = document.createElement('td');
        				tdSurname.className = 'rowHeight';
        				tdSurname.innerHTML = user.lastName;
        				tr.append(tdSurname);
        				
        				const tdUserName = document.createElement('td');
        				tdUserName.className = 'rowHeight';
        				tdUserName.innerHTML = user.username;
        				tr.append(tdUserName);
        				
        				const tdGender = document.createElement('td');
        				tdGender.className = 'rowHeight';
        				tdGender.innerHTML = user.gender;
        				tr.append(tdGender);
        				
        				const tdRole = document.createElement('td');
        				tdRole.className = 'rowHeight';
        				tdRole.innerHTML = user.role;
        				tr.append(tdRole);
        			
        				
        				const tdBlock = document.createElement('td');
        				tdBlock.className = 'rowHeight';
        				const blockButton = document.createElement('a');
        				blockButton.onclick = function () { userTemp = user; blockUser(user); };
        				const blockIcon = document.createElement('img');
        				blockIcon.src = 'images/block3.png';
        				blockIcon.className = 'editDeleteButtons';
        				blockButton.append(blockIcon);
        				tdBlock.append(blockButton);
        				if(role == "ADMIN")
        				tr.append(tdBlock);
        				
        				const tbody = $('#usersTableBody');
        				tbody.append(tr);
        			}
        		}
        	        	}
        	});
        }
        });
}

function blockUser(user){
	let id = user.id;
	$('#confirmBlockUserModal').modal('show');
}
function confirmBlock(){
	$('#confirmBlockUserModal').modal('hide');

}

