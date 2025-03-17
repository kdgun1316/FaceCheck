package com.facecheck.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facecheck.service.AdminService;

@RestController
@RequestMapping("/api")  // API 경로를 명확히 지정
public class ApiController {
    
    @Autowired
    private AdminService adminservice;

    @GetMapping("/dashboard-data") // 최종적으로 "/FaceCheck/api/dashboard-data"로 매핑됨
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        Map<String, Object> data = adminservice.getDashboardData();
        return ResponseEntity.ok(data);
    }
}
