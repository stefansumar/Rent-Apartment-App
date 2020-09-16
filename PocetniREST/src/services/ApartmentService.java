package services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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
import dto.SearchApartmentDTO;

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
	
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllActiveApartments(@PathParam("username") String username){
		ArrayList<Apartment> all = new ArrayList<Apartment>();
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		for(Apartment apartment : apartmentDAO.getApartments().values()) {
			if(apartment.getHostUsername().equals(username)) {
				if(!apartment.isDeleted()) {
					all.add(apartment);
				}
			}
		}
		
		return Response.status(200).entity(all).build();
	}
	
	@GET
	@Path("/one/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getOneApartment(@PathParam("id") Long id){
		Apartment one = null;
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		for(Apartment apartment : apartmentDAO.getApartments().values()) {
			if(apartment.getId().equals(id)) {
				if(!apartment.isDeleted()) {
					one=apartment;
				}
			}
		}
		
		return Response.status(200).entity(one).build();
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
		
		if(!user.getRole().equals("HOST")) {
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
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editApartment(@PathParam("id") Long id, @Context HttpServletRequest request, ApartmentDTO apartment) {
		User loggedIn = (User) request.getSession().getAttribute("loggedIn");
		
		if(loggedIn.getRole().equals("GUEST")) {
			return Response.status(403).entity("You don't have permission to update an apartment.").build();
		}

		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		HashMap<Long, Apartment> apartments = apartmentDAO.getApartments();
		Apartment eApartment = apartments.get(id);
		
		if(eApartment != null) {
			eApartment.setName(apartment.getName());
			eApartment.setType(apartment.getType());
			eApartment.setPricePerNight(apartment.getPricePerNight().toString());
			eApartment.setRoomCount(apartment.getRoomCount());
			eApartment.setGuestCount(apartment.getGuestCount());
			eApartment.setLocation(apartment.getLocation());
			eApartment.setImage(apartment.getImage());
			eApartment.setDescription(apartment.getDescription());
			apartments.put(id, eApartment);
			apartmentDAO.setApartments(apartments);
			apartmentDAO.saveApartments(apartments);
			ctx.setAttribute("apartmentDAO", apartmentDAO);
			return Response.status(200).build();
		} else {
			return Response.status(400).entity("Apartment is not found.").build();
		}
		
	}
	
	@POST
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response search(@Context HttpServletRequest request, SearchApartmentDTO searchDTO) {
		User loggedIn = (User) request.getSession().getAttribute("loggedIn");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		HashMap<Long, Apartment> apartments = new HashMap<Long, Apartment>();
		
		if(loggedIn == null || loggedIn.getRole().equals("GUEST")) {
			for(Apartment a : apartmentDAO.getApartments().values()) {
				if(!a.isDeleted()) {
					apartments.put(a.getId(), a);
				}
			}
		} else if (loggedIn.getRole().equals("ADMIN")) {
			apartments = apartmentDAO.getApartments();
		} else if (loggedIn.getRole().equals("HOST")) {
			for(Apartment a : apartmentDAO.getApartments().values()) {
				if(a.getHostUsername().equals(loggedIn.getUsername())) {
					apartments.put(a.getId(), a);
				}
			}
		} 
	
		// Search by date
		ArrayList<Apartment> byDates = new ArrayList<>();
		if(!searchDTO.getStartDate().equals("") && !searchDTO.getEndDate().equals("")) {
			System.out.println("Usao u datume");
			LocalDate startDate = LocalDate.parse(searchDTO.getStartDate());
			LocalDate endDate = LocalDate.parse(searchDTO.getEndDate());
			for(Apartment a : apartments.values()) {
				LocalDate aStartDate = LocalDate.parse(a.getStartDate());
				LocalDate aEndDate = LocalDate.parse(a.getEndDate());
				if((aStartDate.isBefore(startDate) || aStartDate.equals(startDate)) && (aEndDate.isAfter(endDate) || aEndDate.equals(endDate))) {
					byDates.add(a);
				}
			}
		} else {
			for(Apartment a : apartments.values()) {
				byDates.add(a);
			}
		}
		
		// Search by location
		ArrayList<Apartment> byLocation = new ArrayList<>();
		if(!(searchDTO.getPlace().equals(""))) {
			System.out.println("Usao u place");
			for(Apartment a : apartments.values()) {
				if(a.getLocation().getAddress().getPlace().equals(searchDTO.getPlace())) {
					byLocation.add(a);
				}
			}
			
		} else {
			byLocation = byDates;
		}
		
		// Search by price
		ArrayList<Apartment> byPrice = new ArrayList<Apartment>();
		if(!searchDTO.getMinPrice().equals("") && !searchDTO.getMaxPrice().equals("")) {
			System.out.println("Usao u cenu");
			Float minPrice = Float.parseFloat(searchDTO.getMinPrice());
			Float maxPrice = Float.parseFloat(searchDTO.getMaxPrice());
			for(Apartment a : byLocation) {
				if(Float.parseFloat(a.getPricePerNight()) >= minPrice && Float.parseFloat(a.getPricePerNight()) <= maxPrice) {
					byPrice.add(a);
				}
			}
			
		} else {
			byPrice = byLocation;
			
		}
		
		// Search by rooms
		ArrayList<Apartment> byRooms = new ArrayList<Apartment>();
		if(!searchDTO.getMinRooms().equals("") && !searchDTO.getMaxRooms().equals("")) {
			System.out.println("Usao u sobe");
			Integer minRooms = Integer.parseInt(searchDTO.getMinRooms());
			Integer maxRooms = Integer.parseInt(searchDTO.getMaxRooms());
			for(Apartment a : byPrice) {
				if(a.getRoomCount() >= minRooms && a.getRoomCount() <= maxRooms) {
					byRooms.add(a);
				}
			}
			
		} else {
			byRooms = byPrice;
		}
		
		// Search by number of guests
		ArrayList<Apartment> byGuests = new ArrayList<Apartment>();
		if(!searchDTO.getNoGuests().equals("")) {
			System.out.println("Usao u goste");
			Integer noGuests = Integer.parseInt(searchDTO.getNoGuests());
			for(Apartment a : byRooms) {
				if(a.getGuestCount() == noGuests) {
					byGuests.add(a);
				}
			}
		} else {
			byGuests = byRooms;
		}
		
		
		return Response.status(200).entity(byGuests).build();
		
	}
	
	
}
