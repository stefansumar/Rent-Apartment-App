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

import beans.Amenity;

public class AmenityDAO {
	public HashMap<Long, Amenity> amenities;
	public String contextPath;
	
	public AmenityDAO(String contextPath) {
		super();
		this.contextPath = contextPath;
		this.amenities = new HashMap<Long, Amenity>();
		loadAmenities();
	}

	public HashMap<Long, Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(HashMap<Long, Amenity> amenities) {
		this.amenities = amenities;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public void loadAmenities(){
		amenities.clear();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/amenity.json");
		String line = "";
		String amenity = "";
		ArrayList<Amenity> amenityList = new ArrayList<Amenity>();
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((line = br.readLine()) != null) {
				amenity += line;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			amenityList = objectMapper.readValue(amenity, new TypeReference<ArrayList<Amenity>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		for(Amenity a : amenityList){
			amenities.put(a.getId(), a);
		}
	}
	
	public Amenity find(Long id) {
		for(Amenity amenity : amenities.values()) {
			if(amenity.getId().equals(id)) {
				return amenity;
			}
		}
		
		return null;
	}
	
	public void saveAmenities(){		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/amenity.json");
		
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, amenities.values());
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
