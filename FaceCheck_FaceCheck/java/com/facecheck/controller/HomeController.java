package com.facecheck.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	
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