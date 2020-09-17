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

import beans.Apartment;
import beans.Commentt;
import beans.Reservation;
import beans.Status;
import beans.User;
import dao.ApartmentDAO;
import dao.CommentDAO;
import dao.ReservationDAO;
import dao.UserDAO;
import dto.CommentDTO;
import dto.ReservationDTO;

@Path("/comment")
public class CommentService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("commentDAO") == null){
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("commentDAO", new CommentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Commentt> getAllApartments(){
		
		ArrayList<Commentt> all = new ArrayList<Commentt>();
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("commentDAO");
		
		for(Commentt comment : commentDAO.getComments().values()) {
			all.add(comment);
		}
		
		
		return all;
	}
	
	@GET
	@Path("/allVisible")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Commentt> getAllVisibleApartments(){
		
		ArrayList<Commentt> all = new ArrayList<Commentt>();
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("commentDAO");
		
		for(Commentt comment : commentDAO.getComments().values()) {
			if(comment.isVisible()) {
				all.add(comment);
			}
		}
		
		
		return all;
	}
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addComment(@Context HttpServletRequest request, CommentDTO newComment) {
		
		/*UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
		User user = userDAO.findUserByUsername(newComment.getGuestUsername());
		
		if(!user.getRole().equals("GUEST")) {
			return Response.status(403).build();
		}*/
		 System.out.println(newComment.getApartmentId());
		 System.out.println(newComment.getComment());
		 System.out.println(newComment.getCommenter());
		 System.out.println(newComment.getGuestUsername());
		 System.out.println(newComment.getRate());
		 System.out.println(newComment.isVisible());
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("commentDAO");
	
		
		HashMap<Long, Commentt> comments = commentDAO.getComments();
		
		Commentt comment = new Commentt();
		
		
		
		
		Long id = 0L;
		
		while (comments.containsKey(id)) {	
			id = ThreadLocalRandom.current().nextLong(0, 65000);
		}
		
		comment.setId(id);
		comment.setApartmentId(newComment.getApartmentId());
		comment.setComment(newComment.getComment());
		comment.setCommenter(newComment.getCommenter());
		comment.setGuestUsername(newComment.getGuestUsername());
		comment.setRate(newComment.getRate());
		comment.setVisible(newComment.isVisible());
		
	
		comments.put(id, comment);
		commentDAO.setComments(comments);
		commentDAO.saveComments();
		
	
		ctx.setAttribute("commentDAO", commentDAO);
		
		return Response.status(200).build();
		
	}	
	@PUT
	@Path("/{commentId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeVisible(@PathParam(value = "commentId") Long commentId) {
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("commentDAO");		
		
		Commentt comment = commentDAO.findCommentById(commentId);
		
	


	
		try {
			HashMap<Long, Commentt> comments = commentDAO.getComments();
			comments.remove(commentId);
			comment.setVisible(true);
			comments.put(commentId, comment);
			commentDAO.setComments(comments);
			ctx.setAttribute("commentDAO", commentDAO);
			commentDAO.saveComments();

			
			return Response.status(200).build();
		
		} catch (Exception e) {
			e.printStackTrace();
		}

		
		return Response.status(400).build();
	}
}
