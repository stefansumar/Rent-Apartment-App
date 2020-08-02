package services;

import java.util.HashMap;

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

import beans.User;
import dao.UserDAO;

@Path("/user")
public class UserService {

	@Context
	ServletContext ctx;
	
	@PostConstruct 
	public void init() { 
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));	
		}
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(User user, @Context HttpServletRequest request) {
		UserDAO users = (UserDAO) ctx.getAttribute("userDAO");
		User u = users.findUser(user.getUsername(), user.getPassword());

		if(u == null) {
			return null;
		}
		
		ctx.setAttribute("userDAO", users);
		request.getSession().setAttribute("loggedIn", u);
		
		return u;
	}
	
	@POST
	@Path("/signUp")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response signUp(User user, @Context HttpServletRequest request) {
		UserDAO users = (UserDAO) ctx.getAttribute("userDAO");
		boolean userExist = users.userExsist(user.getUsername());
		
		if(userExist) {
			return Response.status(400).build();
		}
		
		users.getUsers().put(user.getUsername(), user);
		ctx.setAttribute("userDAO", users);
		users.registerUser();
		
		return Response.status(200).build();
	}
	
	@GET
	@Path("/signOut")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void signOut(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/getCurrentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User getCurrentUser(@Context HttpServletRequest request){
		User user = (User) request.getSession().getAttribute("loggedIn");
		
		return user;
	}
	
	@PUT
	@Path("/{username}/{firstName}/{lastName}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editUser(@PathParam(value = "username") String username, @PathParam(value = "firstName") String firstName, @PathParam(value = "lastName") String lastName) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User userForChange = userDAO.findUserByUsername(username);
	
		try {
			HashMap<String, User> users = userDAO.getUsers();
			users.remove(username);
			userForChange.setFirstName(firstName);
			userForChange.setLastName(lastName);
			users.put(username, userForChange);
			userDAO.setUsers(users);
			ctx.setAttribute("userDAO", userDAO);
			userDAO.saveUsers();
			
			return Response.status(200).build();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Response.status(400).build();
	}
	
		
}
