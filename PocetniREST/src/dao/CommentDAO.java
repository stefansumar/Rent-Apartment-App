package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;


public class CommentDAO {
	public HashMap<Long, Comment> comments;
	public String contextPath;
	
	public CommentDAO(String contextPath) {
		super();
		this.contextPath = contextPath;
		this.comments = new HashMap<Long, Comment>();
		loadComments();
	}

	public HashMap<Long, Comment> getComments() {
		return comments;
	}

	public void setComments(HashMap<Long, Comment> comments) {
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
		ArrayList<Comment> commentList = new ArrayList<Comment>();
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((line = br.readLine()) != null) {
				comment += line;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			commentList = objectMapper.readValue(comment, new TypeReference<ArrayList<Comment>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		for(Comment c : commentList){
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
	
}
