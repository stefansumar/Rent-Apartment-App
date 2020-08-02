package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.User;

public class UserDAO {

	private HashMap<String, User> users;
	private String contextPath;
	
	public UserDAO(){
		users=new HashMap<String, User>();
		loadUsers();	
	}
	
	public UserDAO(String contextPath){
		users=new HashMap<String, User>();
		this.contextPath = contextPath;
		loadUsers();
	}
	
	
	
	public HashMap<String, User> getUsers() { return users; }

	public void setUsers(HashMap<String, User> users) { this.users = users; }

	public void loadUsers() {
		users.clear();
		
		ObjectMapper objectMapper = new ObjectMapper();
		String line;
		
		ArrayList<Administrator> administrators = new ArrayList<Administrator>();
		ArrayList<Host> hosts = new ArrayList<Host>();
		ArrayList<Guest> guests = new ArrayList<Guest>();
		
		String admin = "";
		String host = "";
		String guest = "";
		
		File adminFile = new File(this.contextPath + "/json/admin.json");
		File hostFile = new File(this.contextPath + "/json/host.json");
		File guestFile = new File(this.contextPath + "/json/guest.json");
		
		// Ucitavanje administratora
		try(BufferedReader br = new BufferedReader(new FileReader(adminFile))){
			while((line = br.readLine()) != null) {
				admin += line;
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		try {
			administrators = objectMapper.readValue(admin, new TypeReference<ArrayList<Administrator>>() {});
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		for(Administrator a : administrators) {
			this.users.put(a.getUsername(), a);
		}
		
		line = "";
		
		// Ucitavanje domacina
		try(BufferedReader br = new BufferedReader(new FileReader(hostFile))){
			while((line = br.readLine()) != null) {
				host += line;
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		try {
			hosts = objectMapper.readValue(host, new TypeReference<ArrayList<Host>>() {});
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		for(Host h : hosts) {
			this.users.put(h.getUsername(), h);
		}
		
		line = "";
		
		// Ucitavanje gostiju
		try(BufferedReader br = new BufferedReader(new FileReader(guestFile))){
			while((line = br.readLine()) != null) {
				guest += line;
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		try {
			guests = objectMapper.readValue(guest, new TypeReference<ArrayList<Guest>>() {});
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		for(Guest g : guests) {
			this.users.put(g.getUsername(), g);
		}
				
	}
	
	public User findUser(String username, String password) {
		for(User user : users.values()) {
			if(user.getUsername().equals(username)){
				if(user.getPassword().equals(password)) {
					return user;
				} else
					return null;
			}
		}
		return null;
	}
	
	public boolean userExsist(String username) {
		for(User user : this.users.values()) {
			if(user.getUsername().equals(username)) 
				return true;
		}
		
		return false;
		
	}
	
	public void registerUser() {
		ObjectMapper objectMapper = new ObjectMapper();
		
		ArrayList<User> guests = new ArrayList<User>();

		
		for(User user : this.users.values()) {
			if(user.getRole().equals("GUEST")){
				guests.add(user);
			} 
		}
		
		//Cuvanje novog gosta
		File guestJson = new File(this.contextPath + "/json/guest.json");
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(guestJson, guests);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public User findUserByUsername(String username) {
		for(User user : users.values()) {
			if(user.getUsername().equals(username)){
				return user;
			}
		}
		return null;
	}
	
	public void saveUsers(){
		ObjectMapper objectMapper = new ObjectMapper();
		
		ArrayList<Administrator> admins = new ArrayList<Administrator>();
		ArrayList<Host> hosts = new ArrayList<Host>();
		ArrayList<Guest> guests = new ArrayList<Guest>();
		
		for (User user: this.users.values()) {
			if (user.getRole().equals("ADMIN")) {
				admins.add( (Administrator)user );
			} else if(user.getRole().equals("HOST")){
				hosts.add((Host)user);
			} else if(user.getRole().equals("GUEST")){
				guests.add((Guest)user);
			}
		}
		
		File file1 = new File(this.contextPath + "/json/admin.json");
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file1, admins);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		File file2 = new File(this.contextPath + "/json/prodavci.json");
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file2, hosts);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		File file3 = new File(this.contextPath + "/json/admini.json");
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file3, guests);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	
}
