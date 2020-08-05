package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Amenity;
import beans.User;
import dao.AmenityDAO;
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
			amenities.add(amenity);
		}
		
		return Response.status(200).entity(amenities).build();
	}

}
