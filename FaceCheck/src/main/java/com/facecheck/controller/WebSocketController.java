package com.facecheck.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.facecheck.websocket.SuccessWebSocketHandler;
import com.facecheck.websocket.WebSocketHandler;

@RestController
@RequestMapping("/api")
public class WebSocketController {

    @Autowired
    private WebSocketHandler alertWebSocketHandler; // 🚨 경고 메시지 WebSocket 핸들러

    @Autowired
    private SuccessWebSocketHandler successWebSocketHandler; // ✅ 성공 메시지 WebSocket 핸들러
    
    @GetMapping("/status")
    public Map<String, Object> getWebSocketStatus() {
        boolean online = WebSocketHandler.isServerRunning();
        Map<String, Object> response = new HashMap<>();
        response.put("status", online ? "정상" : "연결 끊김");
        response.put("online", online);
        return response;
    }
    
    
    
    // 🚨 경고 메시지 처리 (미등록 사용자)
    @PostMapping("/test-alert")
    public ResponseEntity<?> sendAlertToAdmins(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");

        if (message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ 오류: message 값이 비어있습니다.");
        }

        System.out.println("🚨 Flask에서 경고 요청 수신: " + message);
        alertWebSocketHandler.sendAlertToAdmins(message);
        return ResponseEntity.ok("✅ WebSocket 경고 메시지 전송 완료!");
    }

    // ✅ 성공 메시지 처리 (등록된 사용자)
    @PostMapping("/success-alert")
    public ResponseEntity<?> sendSuccessToAdmins(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");

        if (message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ 오류: message 값이 비어있습니다.");
        }

        System.out.println("✅ Flask에서 성공 요청 수신: " + message);
        successWebSocketHandler.sendSuccessMessage(message);
        return ResponseEntity.ok("✅ WebSocket 성공 메시지 전송 완료!");
    }
}
