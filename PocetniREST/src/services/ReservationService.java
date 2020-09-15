package services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Address;
import beans.Amenity;
import beans.Apartment;
import beans.Location;
import beans.Reservation;
import beans.Status;
import beans.User;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.ReservationDAO;
import dao.UserDAO;
import dto.ApartmentDTO;
import dto.ReservationDTO;

@Path("/reservation")
public class ReservationService {

	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("reservationDAO") == null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
		}
	}
	
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Reservation> getAllReservations(){
		ArrayList<Reservation> all = new ArrayList<Reservation>();
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
		
		for(Reservation reservation : reservationDAO.getReservations().values()) {
			
				all.add(reservation);
			
		}
		
		
		return all;
	}
	
	@PUT
	@Path("/{reservationId}/{newStatus}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeStatus(@PathParam(value = "reservationId") Long reservationId, @PathParam(value = "newStatus") Status newStatus) {
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation reservation = reservationDAO.findReservationById(reservationId);
		
	
		try {
			HashMap<Long, Reservation> reservations = reservationDAO.getReservations();
			reservations.remove(reservationId);
			reservation.setStatus(newStatus);
			reservations.put(reservationId, reservation);
			reservationDAO.setReservations(reservations);
			ctx.setAttribute("reservationDAO", reservationDAO);
			reservationDAO.saveReservations(reservations);
			
			return Response.status(200).build();
		
		} catch (Exception e) {
			e.printStackTrace();
		}

		
		return Response.status(400).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addReservation(@Context HttpServletRequest request, ReservationDTO newReservation) {
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User user = userDAO.findUserByUsername(newReservation.getGuestUsername());
		
		if(!user.getRole().equals("GUEST")) {
			return Response.status(403).build();
		}
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
	
		
		HashMap<Long, Reservation> reservations = reservationDAO.getReservations();
		
		Reservation reservation = new Reservation();
		
		
		Long id = 0L;
		
		while (reservations.containsKey(id)) {	
			id = ThreadLocalRandom.current().nextLong(0, 65000);
		}
		
		reservation.setReservationId(id);
		reservation.setapartmentId(newReservation.getApartmentId());
		reservation.setGuestUsername(newReservation.getGuestUsername());
		reservation.setMessage(newReservation.getMessage());
		reservation.setNightCount(newReservation.getNightCount());
		reservation.setPrice(newReservation.getPrice());
		reservation.setStartDate(newReservation.getStartDate());
		reservation.setStatus(newReservation.getStatus());
		
	
		reservations.put(id, reservation);
		reservationDAO.setReservations(reservations);
		reservationDAO.saveReservations(reservations);
		ctx.setAttribute("reservationDAO", reservationDAO);
		
		return Response.status(200).build();
		
	}	
}
