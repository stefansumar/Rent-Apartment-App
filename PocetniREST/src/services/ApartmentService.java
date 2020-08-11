package services;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import dao.ApartmentDAO;

@Path("/apartment")
public class ApartmentService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("apartmentDAO") == null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Apartment> getAllApartments(){
		
		ArrayList<Apartment> all = new ArrayList<Apartment>();
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		for(Apartment apartment : apartmentDAO.getApartments().values()) {
			if(!apartment.isDeleted()) {
				all.add(apartment);
			}
		}
		
		
		return all;
	}
	
	@GET
	@Path("/allActive")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Apartment> getAllActiveApartments(){
		System.out.println("Usao");
		ArrayList<Apartment> all = new ArrayList<Apartment>();
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		for(Apartment apartment : apartmentDAO.getApartments().values()) {
			if(!apartment.isDeleted()) {
				if(apartment.isStatus()) {
					all.add(apartment);
				}
			}
		}
		
		
		return all;
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteApartment(@PathParam("id") Long id) {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		HashMap<Long, Apartment> apartments = apartmentDAO.getApartments();
		
		try {
			Apartment apartment = apartmentDAO.find(id);
			if(apartment != null) {
				apartment.setDeleted(true);
				apartmentDAO.setApartments(apartments);
				apartmentDAO.saveApartments(apartments);
				ctx.setAttribute("apartmentDAO", apartmentDAO);
				return Response.status(200).build();

			} else {
				return Response.status(400).build();
			}
		} catch (Exception e) {
			return Response.status(500).build();
		}
		
	}
	
}
