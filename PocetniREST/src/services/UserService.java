package services;

import java.util.ArrayList;
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
import dao.CommentDAO;
import dao.UserDAO;
import dto.SearchUserDTO;

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
		
		if(u.isBlocked()) {
			return u;
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
	public Response signOut(@Context HttpServletRequest request) {
		try {
		request.getSession().invalidate();
		return Response.status(200).build();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return Response.status(400).build();
		
	}
	
	@GET
	@Path("/getCurrentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User getCurrentUser(@Context HttpServletRequest request){
		User user = (User) request.getSession().getAttribute("loggedIn");
		
		return user;
	}
		
	@GET
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<User> getAllUsers(){
		
		ArrayList<User> all = new ArrayList<User>();
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		
		for(User user : userDAO.getUsers().values()) {
			all.add(user);
		}
		
		
		return all;
	}
	
	@PUT
	@Path("/{username}/{firstName}/{lastName}/{gender}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editUser(@PathParam(value = "username") String username, @PathParam(value = "firstName") String firstName, @PathParam(value = "lastName") String lastName, @PathParam(value = "gender") String gender) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User userForChange = userDAO.findUserByUsername(username);
	
		try {
			HashMap<String, User> users = userDAO.getUsers();
			users.remove(username);
			userForChange.setFirstName(firstName);
			userForChange.setLastName(lastName);
			userForChange.setGender(gender);
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
	
	@PUT
	@Path("/changePassword/{username}/{currentPassword}/{newPassword}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changePassword(@PathParam(value = "username") String username, @PathParam(value = "currentPassword") String currentPassword, @PathParam(value = "newPassword") String newPassword) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User user = userDAO.findUserByUsername(username);
		
		if(!user.getPassword().equals(currentPassword)) {
			return Response.status(400).build();
		}
		
		try {
			HashMap<String, User> users = userDAO.getUsers();
			users.remove(username);
			user.setPassword(newPassword);
			users.put(username, user);
			userDAO.setUsers(users);
			ctx.setAttribute("userDAO", userDAO);
			userDAO.saveUsers();
			
			return Response.status(200).build();
		
		} catch (Exception e) {
			e.printStackTrace();
		}

		
		return Response.status(400).build();
	}
	

	@POST
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response search(SearchUserDTO searchUserDTO) {
	
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		HashMap<String, User> users = new HashMap<String, User>();
		
		

			users = userDAO.getUsers();
		
			ArrayList<User> byRole = new ArrayList<>();

		if(!searchUserDTO.getSelectRole().equals("") ) {
			for(User u : users.values()) {				
				if(u.getRole().equals(searchUserDTO.getSelectRole())) {			
					byRole.add(u);
				}
			}
		} else {
			for(User u : users.values()) {
				byRole.add(u);
			}
		}
		
	
		ArrayList<User> byGender = new ArrayList<>();
		
		if(!(searchUserDTO.getSelectGender().equals(""))) {
			for(User u : byRole) {
				if(u.getGender().equals(searchUserDTO.getSelectGender())) {
					byGender.add(u);
				}
			}
			
		} else {
			byGender = byRole;
		}
		
		ArrayList<User> byUsername = new ArrayList<>();
		
		if(!(searchUserDTO.getUsernameUserSearch().equals(""))) {
			for(User u : byGender) {
				if(u.getUsername().equals(searchUserDTO.getUsernameUserSearch())) {
					byUsername.add(u);
				}
			}
			
		} else {
			byUsername = byGender;
		}

		
		return Response.status(200).entity(byUsername).build();
		
	}

	@PUT
	@Path("/block/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response blockUser(@PathParam("username") String username) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		HashMap<String, User> users = userDAO.getUsers();
		User user = userDAO.findUserByUsername(username);
		user.setBlocked(true);
		
		users.put(user.getUsername(), user);
		userDAO.setUsers(users);
		ctx.setAttribute("userDAO", userDAO);
		userDAO.saveUsers();
		return Response.status(200).build();
	}
	
	@PUT
	@Path("/unblock/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response unblockUser(@PathParam("username") String username) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		HashMap<String, User> users = userDAO.getUsers();
		User user = userDAO.findUserByUsername(username);
		user.setBlocked(false);
		
		users.put(user.getUsername(), user);
		userDAO.setUsers(users);
		ctx.setAttribute("userDAO", userDAO);
		userDAO.saveUsers();
		return Response.status(200).build();
	}
	
	
		
}
