package services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataParam;

import beans.Address;
import beans.Amenity;
import beans.Apartment;
import beans.Location;
import beans.User;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.UserDAO;
import dto.ApartmentDTO;

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
	
	@POST
	@Path("/uploadImage")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadImage(@FormDataParam("fileToUpload") InputStream uploadedInputStream,
			@FormDataParam("name") String name) {
		String fileLocation = ctx.getRealPath("images/" + name);
		System.out.println(fileLocation);

		try {
			OutputStream out = new FileOutputStream(new File(
					fileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(fileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {

			e.printStackTrace();
		}
		return Response.status(200).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addApartment(@Context HttpServletRequest request, ApartmentDTO newApartment) {
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User user = userDAO.findUserByUsername(newApartment.getHostUsername());
		
		if(user.getRole().equals("HOST")) { // OVO MOZE SAMO HOST, ISPRAVI
			return Response.status(403).build();
		}
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenityDAO");
		
		HashMap<Long, Apartment> apartments = apartmentDAO.getApartments();
		HashMap<Long, Amenity> allAmenities = amenityDAO.getAmenities();
		Apartment apartment = new Apartment();
		
		
		Long id = 0L;
		
		while (apartments.containsKey(id)) {	
			id = ThreadLocalRandom.current().nextLong(0, 65000);
		}
		
		apartment.setId(id);
		apartment.setName(newApartment.getName());
		apartment.setType(newApartment.getType());
		apartment.setPricePerNight(newApartment.getPricePerNight().toString());
		apartment.setRoomCount(newApartment.getRoomCount());
		apartment.setGuestCount(newApartment.getGuestCount());
		apartment.setImage(newApartment.getImage());
		apartment.setHostUsername(newApartment.getHostUsername());
		apartment.setDescription(newApartment.getDescription());
		
		Address address = new Address(newApartment.getLocation().getAddress().getStreet(), newApartment.getLocation().getAddress().getPlace(), newApartment.getLocation().getAddress().getPostalCode());
		Location location = new Location(newApartment.getLocation().getGeoWidth(), newApartment.getLocation().getGeoHeight(), address);
		ArrayList<Amenity> amenities = new ArrayList<Amenity>();
		for(Amenity amenity : allAmenities.values()) {
			for(Long amenityId : newApartment.getAmenities()) {
				if(amenity.getId().equals(amenityId)) {
					amenities.add(amenity);
				}
			}
		}
		
		apartment.setAmenities(amenities);
		apartment.setLocation(location);
		
		apartments.put(id, apartment);
		apartmentDAO.setApartments(apartments);
		apartmentDAO.saveApartments(apartments);
		ctx.setAttribute("apartmentDAO", apartmentDAO);
		
		
		
		
		return Response.status(200).build();
		
	}
		
	
}
