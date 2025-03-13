package com.facecheck.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
	@ResponseBody
	public Map<String, Object> emp_insert(Employee emp, @RequestParam("emp_face_imgs") List<MultipartFile> images) {

		System.out.println(emp.toString());

		String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/images/";

		for (MultipartFile img : images) {
			String filename = emp.getEmp_num() + "_" + img.getOriginalFilename(); // 사번 + 파일명 System.out.println("파일명: "
																					// + filename);

			try {
				File file = new File(uploadDir, filename);
				img.transferTo(file);
				System.out.println("경로: " + file.getAbsolutePath());
			} catch (IOException e) {
				System.out.println("저장 실패");
				e.printStackTrace();
			}
		}

		Map<String, Object> result = new HashMap<>();
		result.put("success", true);
		return result;
	}
	 
//	
//	@PostMapping("/register-user")
//	@ResponseBody
//	public Map<String, Object> emp_insert(Employee emp, @RequestParam("emp_face_imgs") List<MultipartFile> images){
//
//	    System.out.println("✅ 사용자 정보 확인 ✅");
//	    System.out.println(emp.toString());
//
//	    System.out.println(images.get(2).getOriginalFilename());
//	    System.out.println("✅ 촬영된 이미지 파일 개수: " + images.size());
//	    for(MultipartFile file : images){
//	        System.out.println("파일 이름: " + file.getOriginalFilename());
//	        System.out.println("파일 크기: " + file.getSize());
//	    }
//	    
//	    emmployee.insert(emp, images);
//	    
//
//	    Map<String, Object> response = new HashMap<>();
//	    response.put("success", true);
//	    return response;
//	}
//

	
	
	
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