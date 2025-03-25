package com.facecheck.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

import com.facecheck.websocket.WebSocketHandler;
import com.facecheck.websocket.SuccessWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler; // 🚨 경고 메시지 핸들러
    private final SuccessWebSocketHandler successWebSocketHandler; // ✅ 성공 메시지 핸들러

    public WebSocketConfig(WebSocketHandler webSocketHandler,
                           SuccessWebSocketHandler successWebSocketHandler) {
        this.webSocketHandler = webSocketHandler;
        this.successWebSocketHandler = successWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/alert")
                .setAllowedOrigins("*");

        registry.addHandler(successWebSocketHandler, "/ws/success")
                .setAllowedOrigins("*");

        System.out.println("✅ WebSocketConfig 실행됨!");
        System.out.println("✅ WebSocket 서버 실행됨: ws://localhost:8083/ws/alert");
        System.out.println("✅ WebSocket 서버 실행됨: ws://localhost:8083/ws/success");
    }
}
