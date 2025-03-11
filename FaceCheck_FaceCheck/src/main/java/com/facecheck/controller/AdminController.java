/*
 * package com.facecheck.controller;
 * 
 * import javax.servlet.http.HttpSession;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.stereotype.Controller; import
 * org.springframework.web.bind.annotation.GetMapping; import
 * org.springframework.web.bind.annotation.PostMapping; import
 * org.springframework.web.bind.annotation.RequestMapping;
 * 
 * import com.facecheck.model.Admin; import com.facecheck.service.AdminService;
 * 
 * @Controller
 * 
 * @RequestMapping("/admin") public class AdminController {
 * 
 * @Autowired private AdminService adminService;
 * 
 * 
 * 
 * 
 * // 로그아웃 처리
 * 
 * @GetMapping("/logout") public String logout(HttpSession session) {
 * session.invalidate(); // 세션 무효화 return "redirect:/admin/login"; }
 * 
 * 
 * }
 */