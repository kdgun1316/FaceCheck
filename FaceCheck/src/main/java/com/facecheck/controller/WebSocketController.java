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
    private WebSocketHandler webSocketHandler;  // WebSocket 핸들러 주입

    // 🔥 Flask가 이 API를 호출하면 WebSocket을 통해 관리자에게 메시지 전송
    @PostMapping("/test-alert")
    public ResponseEntity<?> sendAlertToAdmins(@RequestBody Map<String, String> payload) { 
        String message = payload.get("message");  // Flask에서 보낸 데이터 받기

        if (message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ 오류: message 값이 비어있습니다.");
        }

        System.out.println("🚨 Flask에서 경고 요청 수신: " + message);
        
        // WebSocket 핸들러를 통해 관리자 페이지에 경고 전송
        webSocketHandler.sendAlertToAdmins(message);

        return ResponseEntity.ok("✅ WebSocket 알림 전송 완료!");
    }
}

