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

import beans.Comment;
import dao.CommentDAO;

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
	public ArrayList<Comment> getAllApartments(){
		
		ArrayList<Comment> all = new ArrayList<Comment>();
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("commentDAO");
		
		for(Comment comment : commentDAO.getComments().values()) {
			all.add(comment);
		}
		
		
		return all;
	}
}
