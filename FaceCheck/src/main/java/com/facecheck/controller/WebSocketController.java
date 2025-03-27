package com.facecheck.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facecheck.entity.Log;
import com.facecheck.service.AdminService;
import com.facecheck.websocket.SuccessWebSocketHandler;
import com.facecheck.websocket.WebSocketHandler;
import java.util.Base64;



@RestController
@RequestMapping("/api")
public class WebSocketController {
	
	@Autowired
	private AdminService adminservice;

    @Autowired
    private WebSocketHandler alertWebSocketHandler; // 🚨 경고 메시지 WebSocket 핸들러

    @Autowired
    private SuccessWebSocketHandler successWebSocketHandler; // ✅ 성공 메시지 WebSocket 핸들러

    // 🚨 경고 메시지 처리 (미등록 사용자)
    @PostMapping("/test-alert")
    public ResponseEntity<?> sendAlertToAdmins(@RequestBody Map<String, String> payload) {
        String empNum = payload.get("emp_num");
        String message = payload.get("message");
        String imageUrl = payload.get("image_url");

        if (message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ 오류: message 값이 비어있습니다.");
        }

        // DB 저장하고 log_idx 받기
        Long logIdx = adminservice.insertLogWithImage(empNum, message, imageUrl);
        Log log = adminservice.selectLogByIdx(logIdx);

        String base64Image = null;

if (log != null && log.getEmp_image() != null) {
    base64Image = Base64.getEncoder().encodeToString(log.getEmp_image());
} else {
    System.out.println("⚠️ emp_image가 null입니다. base64 변환 생략.");
}

        JSONObject json = new JSONObject();
        json.put("message", message);
        json.put("log_idx", logIdx);
        json.put("emp_num", empNum);
        json.put("image_url", imageUrl);
        json.put("base64Image", base64Image != null ? base64Image : "");
  // ✅ 드디어 완성
        alertWebSocketHandler.sendAlertToAdmins(json.toString());


        return ResponseEntity.ok("✅ WebSocket 경고 메시지 전송 완료!");
    }

    // ✅ 성공 메시지 처리 (등록된 사용자)
    @PostMapping("/success-alert")
    public ResponseEntity<?> sendSuccessToAdmins(@RequestBody Map<String, String> payload) {
        String empNum = payload.get("emp_num");
        String message = payload.get("message");
        String imageUrl = payload.get("image_url");

        if (message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ 오류: message 값이 비어있습니다.");
        }

        // DB 저장하고 log_idx 받기
        Long logIdx = adminservice.insertLogWithImage(empNum, message, imageUrl);
        Log log = adminservice.selectLogByIdx(logIdx);

        String base64Image = null;
        if (log != null && log.getEmp_image() != null) {
            base64Image = Base64.getEncoder().encodeToString(log.getEmp_image());
        } else {
            System.out.println("⚠️ emp_image가 null입니다. base64 변환 생략.");
        }

        JSONObject json = new JSONObject();
        json.put("message", message);
        json.put("log_idx", logIdx);
        json.put("emp_num", empNum);
        json.put("image_url", imageUrl);
        json.put("base64Image", base64Image != null ? base64Image : "");

        System.out.println("✅ Flask에서 성공 요청 수신 → 성공 WebSocket으로 전송");
        // ✅ 여기! 성공 핸들러로 보내야 함
        successWebSocketHandler.sendSuccessMessage(json.toString());

        return ResponseEntity.ok("✅ WebSocket 성공 메시지 전송 완료!");
    }

}