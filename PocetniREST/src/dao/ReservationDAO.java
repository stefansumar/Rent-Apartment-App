package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;


import beans.Reservation;

public class ReservationDAO {
	public HashMap<Long, Reservation> reservations;
	public String contextPath;
	
	public ReservationDAO(String contextPath) {
		super();
		this.contextPath = contextPath;
		this.reservations = new HashMap<Long, Reservation>();
		loadReservations();
	}

	public HashMap<Long, Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(HashMap<Long, Reservation> reservations) {
		this.reservations = reservations;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public Reservation find(Long id) {
		for(Reservation reservation : reservations.values()) {
			if(reservation.getReservationId().equals(id)) {
				return reservation;
			}
		}
		
		return null;
	}
	
	public void loadReservations(){
		reservations.clear();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/reservation.json");
		String line = "";
		String reservation = "";
		ArrayList<Reservation> reservationList = new ArrayList<Reservation>();
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((line = br.readLine()) != null) {
				reservation += line;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			reservationList = objectMapper.readValue(reservation, new TypeReference<ArrayList<Reservation>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println(reservationList.size());
		for(Reservation ap : reservationList){
			
			reservations.put(ap.getReservationId(), ap);
		}
	}
	
	public void saveReservations(HashMap<Long, Reservation> reservations){
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT, true);
			
			File file = new File(this.contextPath + "/json/reservation.json");
			
			ArrayList<Reservation> apts = new ArrayList<>();
			
			for(Reservation reservation : reservations.values()) {
				apts.add(reservation);
			}
			
			objectMapper.writeValue(new File(contextPath + "/json/reservation.json"), apts);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
