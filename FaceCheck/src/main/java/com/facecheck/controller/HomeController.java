package com.facecheck.controller;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;
import com.facecheck.service.AdminService;

import jakarta.servlet.http.HttpSession;

@Controller

public class HomeController {
	@Autowired
	private AdminService adminservice;

	
	private final WebClient webClient = WebClient.builder().baseUrl("http://127.0.0.1:5000").build();

    @PostMapping("/register-user")
    @ResponseBody
    public Map<String, Object> emp_insert(@ModelAttribute Employee emp, @RequestParam(value = "emp_face_imgs", required=false) List<MultipartFile> images) {

    	System.out.println(emp.toString());
    	
        Map<String, Object> result = new HashMap<>();
        

        try {
            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            
            builder.part("name", emp.getEmp_name());
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
        
        adminservice.insert(emp);
        
        return result;
    }
    
    @GetMapping("/user_before")
    public String hi() {
    	return "user_before";
    }
    
    
    //실시간 사용자 얼굴인식!!!
    @GetMapping("/user")
    public String user() {
    	
    	return "user";
    }
    
    
    @PostMapping("/user") 
    @ResponseBody
    public Map<String, Object> recognizeUser(@RequestParam(value = "face_imgs", required = false) List<MultipartFile> images) {
        Map<String, Object> result = new HashMap<>();

        try {
            MultipartBodyBuilder builder = new MultipartBodyBuilder();

            // ✅ 받은 이미지 로그 출력 (디버깅)
            if (images == null || images.isEmpty()) {
                System.out.println("❌ 오류: 받은 이미지 없음!");
                result.put("success", false);
                result.put("message", "이미지 파일이 없습니다.");
                return result;
            }

            System.out.println("✅ 받은 이미지 개수: " + images.size());

            for (MultipartFile img : images) {
                System.out.println("✅ 받은 이미지 이름: " + img.getOriginalFilename());
                System.out.println("✅ 받은 이미지 크기: " + img.getSize() + " bytes");
                System.out.println("✅ 이미지 타입: " + img.getContentType());
                builder.part("images", new ByteArrayResource(img.getBytes()))
                       .filename(img.getOriginalFilename())
                       .contentType(MediaType.IMAGE_JPEG);
            }

            // ✅ Flask로 전송 및 응답 받기
            ResponseEntity<String> response = webClient.post()
                    .uri("/userFace")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .bodyValue(builder.build()) // Multipart 데이터 전송
                    .retrieve()
                    .toEntity(String.class)
                    .block();  // 동기 처리

            System.out.println("📡 Flask 응답: " + response.getBody());

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
	
	@GetMapping("/sctest")
	public String sctest() {

		return "sctest";
	}
	
	


}