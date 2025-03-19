package com.facecheck.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

import com.facecheck.websocket.WebSocketHandler;
import com.facecheck.websocket.SuccessWebSocketHandler;  // ✅ 성공 WebSocket 추가

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/ws/alert")
                .setAllowedOrigins("*"); // ✅ 실패(경고) WebSocket

        registry.addHandler(successWebSocketHandler(), "/ws/success")
                .setAllowedOrigins("*"); // ✅ 성공 메시지 WebSocket 추가

        System.out.println("✅ WebSocketConfig 실행됨!");  
        System.out.println("✅ WebSocket 서버 실행됨: ws://localhost:8083/ws/alert");
        System.out.println("✅ WebSocket 서버 실행됨: ws://localhost:8083/ws/success");  // ✅ 성공 WebSocket 추가됨
    }

    // ✅ WebSocketHandler를 Bean으로 등록 (경고 메시지용)
    @Bean
    public WebSocketHandler webSocketHandler() {
        return new WebSocketHandler();
    }

    // ✅ SuccessWebSocketHandler를 Bean으로 등록 (성공 메시지용)
    @Bean
    public SuccessWebSocketHandler successWebSocketHandler() {
        return new SuccessWebSocketHandler();
    }
}
