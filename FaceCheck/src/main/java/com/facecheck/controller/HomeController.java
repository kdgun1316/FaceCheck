package com.facecheck.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.facecheck.entity.Admin;
import com.facecheck.service.AdminService;

import jakarta.servlet.http.HttpSession;


@Controller
public class HomeController {
	@Autowired
	private AdminService adminservice;
	
	
	@PostMapping("/login")
	public String login(Admin admin, HttpSession session) {
		Admin result = adminservice.login(admin);
		if (result != null) {
	        session.setAttribute("admin", result);  
	        return "redirect:/index";
	    } else {
	        return "redirect:/login?error=true";
	    }

	}
	
	
	@GetMapping("/login")
	public String loginpage() {
		
		return "login";
	}
	
	
	
	
	@GetMapping("/index")
	public String index() {
		
		return "index";
	}

	
	@GetMapping("/register-user")
	public String next() {
		
		return "register-user";
	}


	@GetMapping("/header")
	public String header() {
		
		return "header";
	}


	@GetMapping("/user-management")
	public String user() {
		
		return "user-management";

	}
	
	@GetMapping("revise")
	public String revise() {
		
		return "revise";
	}
	
	@GetMapping("main")
	public String main() {
		
		return "main";
	}
	
	@GetMapping("recode")
	public String recode() {
		
		return "recode";
	}
	
	
}