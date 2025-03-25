package com.facecheck.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.Log;
import com.facecheck.entity.recode;
import com.facecheck.service.AdminService;
import com.facecheck.service.LogInfoService;

import jakarta.servlet.http.HttpSession;

@Controller

public class HomeController {
	@Autowired
	private AdminService adminservice;

	private final WebClient webClient = WebClient.builder().baseUrl("http://127.0.0.1:5000").build();

	@PostMapping("/register-user")
	@ResponseBody
	public Map<String, Object> emp_insert(@ModelAttribute Employee emp,
			@RequestParam(value = "emp_face_imgs", required = false) List<MultipartFile> images) {

		System.out.println(emp.toString());

		Map<String, Object> result = new HashMap<>();

		try {
			MultipartBodyBuilder builder = new MultipartBodyBuilder();

			builder.part("name", emp.getEmp_name());
			// 여러 이미지를 Flask로 추가
			for (MultipartFile img : images) {
				builder.part("images", new ByteArrayResource(img.getBytes())).filename(img.getOriginalFilename())
						.contentType(MediaType.IMAGE_JPEG);
			}

			// Flask로 요청 전송
			ResponseEntity<String> response = webClient.post().uri("/upload-image")
					.contentType(MediaType.MULTIPART_FORM_DATA).bodyValue(builder.build()) // Multipart 데이터 전송
					.retrieve().toEntity(String.class).block(); // 동기 처리

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

	// 실시간 사용자 얼굴인식!!!
	@GetMapping("/user")
	public String user() {

		return "user";
	}

	/*
	 * @PostMapping("/user")
	 * 
	 * @ResponseBody public Map<String, Object> recognizeUser(@RequestParam(value =
	 * "face_imgs", required = false) List<MultipartFile> images) { Map<String,
	 * Object> result = new HashMap<>();
	 * 
	 * try { MultipartBodyBuilder builder = new MultipartBodyBuilder();
	 * 
	 * if (images == null || images.isEmpty()) { result.put("success", false);
	 * result.put("message", "이미지 파일이 없습니다."); return result; }
	 * 
	 * for (MultipartFile img : images) { builder.part("image", new
	 * ByteArrayResource(img.getBytes())) .filename(img.getOriginalFilename())
	 * .contentType(MediaType.IMAGE_JPEG); }
	 * 
	 * // Flask 호출 및 응답처리 (여기서 수정!) ResponseEntity<String> response =
	 * webClient.post() .uri("/userFace")
	 * .contentType(MediaType.MULTIPART_FORM_DATA) .bodyValue(builder.build())
	 * .retrieve() .toEntity(String.class) .block();
	 * 
	 * JSONObject flaskResult = new JSONObject(response.getBody()); boolean success
	 * = flaskResult.getBoolean("success"); String message =
	 * flaskResult.getString("message"); String user = flaskResult.optString("user",
	 * "알수없음");
	 * 
	 * // 성공 or 실패 DB 저장 (여기가 중요!) adminservice.insertLog(user, success ? "성공" :
	 * "실패");
	 * 
	 * result.put("success", success); result.put("message", message);
	 * 
	 * 
	 * } catch (Exception e) { e.printStackTrace();
	 * 
	 * 
	 * // 실패했을 때 DB 저장 로직 추가 (실패로 강제 저장) adminservice.insertLog("알수없음", "실패"); // 중요
	 * 수정사항!
	 * 
	 * result.put("success", false); result.put("message", "얼굴 인식 실패");
	 * 
	 * }
	 * 
	 * return result; }
	 */
	
	
	@PostMapping("/user")
	@ResponseBody
	public Map<String, Object> recognizeUser(@RequestParam(value = "face_imgs", required = false) List<MultipartFile> images) {
	    Map<String, Object> result = new HashMap<>();

	    try {
	        MultipartBodyBuilder builder = new MultipartBodyBuilder();

	        if (images == null || images.isEmpty()) {
	            result.put("success", false);
	            result.put("message", "이미지 파일이 없습니다.");
	            return result;
	        }

	        for (MultipartFile img : images) {
	            builder.part("image", new ByteArrayResource(img.getBytes()))
	                   .filename(img.getOriginalFilename())
	                   .contentType(MediaType.IMAGE_JPEG);
	        }

	        // Flask 호출 및 응답처리
	        ResponseEntity<String> response = webClient.post()
	                .uri("/userFace")
	                .contentType(MediaType.MULTIPART_FORM_DATA)
	                .bodyValue(builder.build())
	                .retrieve()
	                .toEntity(String.class)
	                .block();

	        JSONObject flaskResult = new JSONObject(response.getBody());
	        boolean success = flaskResult.getBoolean("success");
	        String message = flaskResult.getString("message");
	        String user = flaskResult.optString("user", "알수없음");

	        // 🔥 여기 추가!
	        result.put("success", success);
	        result.put("message", message);
	        result.put("user", user);

	        // ✨ 선택: 로그도 남기고 싶다면 아래 주석 해제
	        // adminservice.insertLog(user, success ? "성공" : "실패");

	    } catch (Exception e) {
	        e.printStackTrace();
	        result.put("success", false);
	        result.put("message", "얼굴 인식 중 오류 발생");

	        // adminservice.insertLog("알수없음", "실패");
	    }

	    return result;
	}


	@PostMapping("/deleteLog")
	@ResponseBody
	public Map<String, Object> deleteLog(@RequestParam("log_idx") Long log_idx) {
		Map<String, Object> result = new HashMap<>();
		try {
			adminservice.deleteLog(log_idx);
			result.put("success", true);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
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

		List<Log> logList = adminservice.getRecentLogs();
		model.addAttribute("logList", logList);
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

	/*
	 * @Autowired private LogInfoService logInfoService; // @Autowired로 의존성 주입
	 * 
	 * @GetMapping("/entry_log") public String log(@RequestParam(value = "empNum",
	 * required = false) Integer empNum, Model model) { // List<recode> rec; // //
	 * if (empNum != null) { // rec = logInfoService.getLogsByEmpNum(empNum); // }
	 * else { // rec = logInfoService.getAllLogs(); // } //
	 * model.addAttribute("logList", rec); // logList를 모델에 추가 return "entry_log"; //
	 * entry_log.jsp로 데이터 전달
	 * 
	 * }
	 */

	@Autowired
	private LogInfoService logInfoService;

	@GetMapping("/entry_log")
	public String log(@RequestParam(value = "emp_num", required = false) Integer empNum, Model model) {
		System.out.println(empNum);

		List<recode> logList = adminservice.logSelect(empNum);

		System.out.println(logList.toString());
		model.addAttribute("logList", logList);

		return "entry_log";
	}

	@GetMapping("/deleteUser")
	public String deleteEmployee(@RequestParam String emp_num) {
		System.out.println("🛠 삭제 요청 도착! empNum: " + emp_num);

		// 인스턴스를 통해 delete 메소드 호출
		adminservice.delete(emp_num); // static 방식이 아닌 인스턴스 방식으로 호출

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