package com.facecheck.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;
import com.facecheck.service.AdminService;

import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {
	@Autowired
	private AdminService adminservice;
	@PostMapping("/register-user")
	public String emp_insert(Employee emp, @RequestParam("emp_face_img") String base64Image) {
		System.out.println(emp.toString());
		if (base64Image == null || base64Image.isEmpty()) {
		    System.out.println("데이터가 없습니다!");
		} else {
		    System.out.println(base64Image.substring(0,50));
		}

		return "";
	}
	 
	
	

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

	@GetMapping("/user-management")
	public String select(Model model) {
		List<Employee> emp = adminservice.empselect();

		System.out.println(emp.toString());
		model.addAttribute("empselect", emp);
		return "user-management";
	}

	@GetMapping("/recode")
	public String select2(Model model) {
		List<recode> rec = adminservice.recselect();
		List<Employee> emp = adminservice.empselect();

		System.out.println(rec.toString());
		model.addAttribute("recselect", rec);
		model.addAttribute("empselect", emp);
		return "recode";
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

//	@GetMapping("/user-management")
//	public String user() {
//		
//		return "user-management";
//
//	}

	@GetMapping("revise")
	public String revise() {

		return "revise";
	}

	@GetMapping("main")
	public String main() {

		return "main";
	}

}