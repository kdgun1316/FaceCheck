package com.facecheck.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("✅ WebSocket 연결됨! 현재 접속자 수: " + sessions.size());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("📩 받은 메시지: " + message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("❌ WebSocket 연결 해제됨! 현재 접속자 수: " + sessions.size());
    }
    
    // 웹소켓 확인 정상작동 확인코드
    
    

    // ✅ WebSocket을 통해 관리자에게 메시지 전송 (오류 발생 가능성 확인)
    public void sendAlertToAdmins(String message) {
        synchronized (sessions) {
            if (sessions.isEmpty()) {
                System.out.println("⚠ WebSocket 세션이 없습니다! 메시지를 보낼 수 없습니다.");
                return;
            }
            
            for (WebSocketSession session : sessions) {
                try {
                    System.out.println("📩 WebSocket으로 메시지 전송: " + message);
                    session.sendMessage(new TextMessage(message));
                } catch (IOException e) {
                    System.err.println("❌ WebSocket 메시지 전송 실패: " + e.getMessage());
                    e.printStackTrace();
                }
            }
        }
    }
    public static boolean isServerRunning() {
        return !sessions.isEmpty();
    }
    
}
