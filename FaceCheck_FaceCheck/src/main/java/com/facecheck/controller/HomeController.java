package com.facecheck.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.facecheck.model.Admin;
import com.facecheck.service.AdminServiceImpl;

import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {
	  @Autowired
	    private AdminServiceImpl adminService;
	
	 // 로그인 처리
    @PostMapping("/login")
    public String login(Admin admin, HttpSession session) {
        Admin loginAdmin = adminService.login(admin);
        
        if (loginAdmin != null) {
            // 로그인 성공 시 세션에 관리자 정보 저장
            session.setAttribute("loginAdmin", loginAdmin);
            return "redirect:/index"; // 관리자 대시보드로 이동
        } else {
            // 로그인 실패
            return "redirect:/login";
        }
    }
	
	// 로그인 페이지로 이동
    @GetMapping("/login")
    public String login() {
        return "login"; // login.jsp 페이지로 이동
    }
	@GetMapping("/index")
	public String main() {
		
		return "index";
	}
	
	@GetMapping("/next")
	public String next() {
		
		return "next";
	}
}
