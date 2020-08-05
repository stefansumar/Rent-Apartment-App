package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

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
			all.add(apartment);
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
		System.out.println(apartmentDAO.getApartments().size());
		for(Apartment apartment : apartmentDAO.getApartments().values()) {
			if(apartment.isStatus()) {
				all.add(apartment);
			}
		}
		
		
		return all;
	}
}
