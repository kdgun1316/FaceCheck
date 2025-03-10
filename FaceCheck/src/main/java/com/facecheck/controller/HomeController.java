package com.facecheck.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	
	@GetMapping("/index")
	public String main() {
		
		return "index";
	}

	
	@GetMapping("/next")
	public String next() {
		
		return "next";
	}
}
