package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Apartment;

public class ApartmentDAO {
	public HashMap<Long, Apartment> apartments;
	public String contextPath;
	
	public ApartmentDAO(String contextPath) {
		super();
		this.contextPath = contextPath;
		this.apartments = new HashMap<Long, Apartment>();
		loadApartments();
	}

	public HashMap<Long, Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(HashMap<Long, Apartment> apartments) {
		this.apartments = apartments;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public Apartment find(Long id) {
		for(Apartment apartment : apartments.values()) {
			if(apartment.getId().equals(id)) {
				return apartment;
			}
		}
		
		return null;
	}
	
	public void loadApartments(){
		apartments.clear();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/apartment.json");
		String line = "";
		String apartment = "";
		ArrayList<Apartment> apartmentList = new ArrayList<Apartment>();
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((line = br.readLine()) != null) {
				apartment += line;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			apartmentList = objectMapper.readValue(apartment, new TypeReference<ArrayList<Apartment>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		for(Apartment ap : apartmentList){
			apartments.put(ap.getId(), ap);
		}
	}
	
	public void saveApartments(){
		System.out.println("Usao u save apartments");
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/apartment.json");
		
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, apartments.values());
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
