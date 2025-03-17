package com.facecheck.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

import com.facecheck.websocket.WebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {



    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/ws/alert")
                .setAllowedOrigins("*"); // ✅ CORS 허용

        System.out.println("✅ WebSocketConfig 실행됨!");  // ✅ 실행 확인용 로그
        System.out.println("✅ WebSocket 서버 실행됨: ws://localhost:8083/ws/alert");
    }

    // ✅ WebSocketHandler를 Bean으로 등록
    @Bean
    public WebSocketHandler webSocketHandler() {
        return new WebSocketHandler();
    }
}
