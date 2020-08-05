package services;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Amenity;
import beans.Apartment;
import beans.User;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.UserDAO;

@Path("/amenity")
public class AmenityService {
	
	@Context
	ServletContext ctx;
	
	@PostConstruct 
	public void init() { 
		if (ctx.getAttribute("amenityDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenityDAO", new AmenityDAO(contextPath));	
		}
	}
	
	@GET
	@Path("/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAmenities(@PathParam(value = "username") String username, @Context HttpServletRequest request){

		ArrayList<Amenity> amenities = new ArrayList<Amenity>();
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenityDAO");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		
		User user = userDAO.findUserByUsername(username);
		
		if(!user.getRole().equals("ADMIN")) {
			return Response.status(403).build();
		}
		
		for(Amenity amenity : amenityDAO.getAmenities().values()) {
			if(!amenity.isDeleted())
				amenities.add(amenity);
		}
		
		return Response.status(200).entity(amenities).build();
	}
	
	@PUT
	@Path("/{id}/{name}/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editAmenity(@PathParam(value = "id") Long id, @PathParam(value = "name") String name, @PathParam(value = "username") String username) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User user = userDAO.findUserByUsername(username);
		
		if(!user.getRole().equals("ADMIN")) {
			return Response.status(403).build();
		}
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenityDAO");
		
		Amenity a = amenityDAO.find(id);
		if(a == null) {
			return Response.status(400).build();
		}
		
		HashMap<Long, Apartment> apartments = apartmentDAO.getApartments();
		HashMap<Long, Amenity> amenities = amenityDAO.getAmenities();
		
		try {
			for(Apartment apartment : apartments.values()) {
				for(Amenity amenity : apartment.getAmenities()) {
					if(amenity.getId().equals(id)) {
						amenity.setName(name);
					}
				}
			}
			
			a.setName(name);
			amenities.put(id, a);
			amenityDAO.saveAmenities();
			apartmentDAO.saveApartments(apartments);
			
			ctx.setAttribute("apartmentDAO", apartmentDAO);
			ctx.setAttribute("amenityDAO", amenityDAO);
			return Response.status(200).build();
			
		} catch (Exception e) {
			return Response.status(400).build();
		}
		
		
	}
	
	@DELETE
	@Path("/{id}/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteAmenity(@PathParam(value = "id") Long id, @PathParam(value = "username") String username) {

		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User user = userDAO.findUserByUsername(username);
		
		if(!user.getRole().equals("ADMIN")) {
			return Response.status(403).build();
		}
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenityDAO");
		
		Amenity a = amenityDAO.find(id);
		if(a == null) {
			return Response.status(400).build();
		}
		
		HashMap<Long, Apartment> apartments = apartmentDAO.getApartments();
		HashMap<Long, Amenity> amenities = amenityDAO.getAmenities();
		
		try {
			for(Apartment apartment : apartments.values()) {
				for(Amenity amenity : apartment.getAmenities()) {
					if(amenity.getId().equals(id)) {
						amenity.setDeleted(true);
					}
				}
			}
			
			a.setDeleted(true);
			amenities.put(id, a);
			amenityDAO.saveAmenities();
			apartmentDAO.saveApartments(apartments);
			
			ctx.setAttribute("apartmentDAO", apartmentDAO);
			ctx.setAttribute("amenityDAO", amenityDAO);
			return Response.status(200).build();
			
		} catch (Exception e) {
			return Response.status(400).build();
		}
		
		
	}

}
