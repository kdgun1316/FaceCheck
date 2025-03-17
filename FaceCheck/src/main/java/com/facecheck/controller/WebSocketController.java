package com.facecheck.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.facecheck.websocket.WebSocketHandler;

@RestController
@RequestMapping("/api")
public class WebSocketController {

    @Autowired
    private WebSocketHandler webSocketHandler;

    public WebSocketController() {
        System.out.println("🚀 WebSocketController 생성자 실행됨! ✅ API 로드 확인 필요");
    }

    // ✅ 테스트 API: WebSocket으로 관리자에게 메시지 전송
    @PostMapping("/test-alert")
    public void testWebSocketAlert(@RequestParam String message) {
        System.out.println("🚨 WebSocket 테스트 메시지 전송: " + message);
        webSocketHandler.sendAlertToAdmins(message);
    }
}
