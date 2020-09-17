package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.xml.stream.events.Comment;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Commentt;
import beans.Reservation;


public class CommentDAO {
	public HashMap<Long, Commentt> comments;
	public String contextPath;
	
	public CommentDAO(String contextPath) {
		super();
		this.contextPath = contextPath;
		this.comments = new HashMap<Long, Commentt>();
		loadComments();
	}

	public HashMap<Long, Commentt> getComments() {
		return comments;
	}

	public void setComments(HashMap<Long, Commentt> comments) {
		this.comments = comments;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public void loadComments(){
		comments.clear();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/comment.json");
		String line = "";
		String comment = "";
		ArrayList<Commentt> commentList = new ArrayList<Commentt>();
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((line = br.readLine()) != null) {
				comment += line;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			commentList = objectMapper.readValue(comment, new TypeReference<ArrayList<Commentt>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		for(Commentt c : commentList){
			comments.put(c.getId(), c);
		}
	}
	
	public void saveComments(){		
		ObjectMapper objectMapper = new ObjectMapper();
		
		File file = new File(this.contextPath + "/json/comment.json");
		
		try {
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, comments.values());
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Commentt findCommentById(Long commentId) {
		for(Commentt comment : comments.values()) {
			if(comment.getId().equals(commentId)){
				return comment;
			}
		}
		return null;
	}
	
}
