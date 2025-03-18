package com.facecheck.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.facecheck.websocket.WebSocketHandler;

@RestController
@RequestMapping("/api")
public class WebSocketController {

    @Autowired
    private WebSocketHandler webSocketHandler;

    @PostMapping("/test-alert")
    public ResponseEntity<?> sendAlertToAdmins(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");  // Flask에서 보낸 데이터 받기

        if (message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ 오류: message 값이 비어있습니다.");
        }

        System.out.println("🚨 Flask에서 경고 요청 수신: " + message);
        
        try {
            // ✅ WebSocket을 통해 관리자 페이지에 경고 메시지 전송
            webSocketHandler.sendAlertToAdmins(message);
            System.out.println("✅ WebSocket 메시지 전송 성공!");
        } catch (Exception e) {
            System.err.println("❌ WebSocket 메시지 전송 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }

        return ResponseEntity.ok("✅ WebSocket 알림 전송 완료!");
    }

}


