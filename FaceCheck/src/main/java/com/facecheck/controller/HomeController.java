package com.facecheck.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;
import com.facecheck.service.AdminService;

import jakarta.servlet.http.HttpSession;
import reactor.core.publisher.Mono;

@Controller
public class HomeController {
	@Autowired
	private AdminService adminservice;

	
	private final WebClient webClient = WebClient.builder().baseUrl("http://127.0.0.1:5000").build();

    @PostMapping("/register-user")
    @ResponseBody
    public Map<String, Object> emp_insert(Employee emp, @RequestParam("emp_face_imgs") List<MultipartFile> images) {

        Map<String, Object> result = new HashMap<>();

        try {
            MultipartBodyBuilder builder = new MultipartBodyBuilder();

            // 여러 이미지를 Flask로 추가
            for (MultipartFile img : images) {
                builder.part("images", new ByteArrayResource(img.getBytes()))
                        .filename(img.getOriginalFilename())
                        .contentType(MediaType.IMAGE_JPEG);
            }

            // Flask로 요청 전송
            ResponseEntity<String> response = webClient.post()
                    .uri("/upload-image")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .bodyValue(builder.build()) // Multipart 데이터 전송
                    .retrieve()
                    .toEntity(String.class)
                    .block();  // 동기 처리

            System.out.println("Flask 응답: " + response.getBody());

            // 응답 확인
            result.put("success", true);
            result.put("flask_response", response.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
            result.put("message", "Flask 서버로 요청 중 오류 발생");
        }

        return result;
    }

	
	@PostMapping("/login")
	public String login(Admin admin, HttpSession session) {
		
		
		
		Admin result = adminservice.login(admin);
		if (result != null) {
			session.setAttribute("admin", result);
			return "redirect:/main";
		} else {
			return "redirect:/login?error=true";
		}

	}
	
	@GetMapping("/main")
	public String main(Model model) {
		int empNumCount = adminservice.getEmpNumCount();
        model.addAttribute("empNumCount", empNumCount); // JSP로 데이터 전달
        return "main"; // main.jsp로 매핑
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
		// List<Employee> emp = adminservice.empselect();
		
		// 1. SQL구문으로 join해서 불러오는 방법 1개 (java 로직으로 해결하는 것도 방법)
		
		System.out.println(rec.toString());
		model.addAttribute("recselect", rec);
		// model.addAttribute("empselect", emp);
		return "recode";
	}
	
	@GetMapping("/deleteUser")
	public String deleteEmployee(@RequestParam String emp_num) {
	    System.out.println("🛠 삭제 요청 도착! empNum: " + emp_num);

	    // 인스턴스를 통해 delete 메소드 호출
	    adminservice.delete(emp_num);  // static 방식이 아닌 인스턴스 방식으로 호출

	    System.out.println("✅ 삭제 완료!");
	    return "redirect:/user-management";
	}
	
	@PostMapping("/user_update")
	public String update(Employee emp) {
		adminservice.update(emp);
		
		return "redirect:/user-management";
	}
	
	
	
	@GetMapping("/login")
	public String loginpage() {

		return "login";
	}


	@GetMapping("/register-user")
	public String next() {

		return "register-user";
	}

	@GetMapping("/header")
	public String header() {

		return "header";
	}

	@GetMapping("revise")
	public String revise() {

		return "revise";
	}
	
	@GetMapping("/api/dashboard-data")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> getDashboardData() {
	    Map<String, Object> data = adminservice.getDashboardData();
	    return ResponseEntity.ok(data);
	}

}