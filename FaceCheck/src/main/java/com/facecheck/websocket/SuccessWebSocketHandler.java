package com.facecheck.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class SuccessWebSocketHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("✅ [WebSocket] 성공 메시지 연결됨! 현재 접속자 수: " + sessions.size());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("📩 [WebSocket] 받은 성공 메시지: " + message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("❌ [WebSocket] 성공 메시지 연결 해제됨! 현재 접속자 수: " + sessions.size());
    }

    // ✅ WebSocket을 통해 성공 메시지 전송
    public void sendSuccessMessage(String message) {
        synchronized (sessions) {
            if (sessions.isEmpty()) {
                System.out.println("⚠ WebSocket 세션 없음! 메시지를 보낼 수 없음.");
                return;
            }

            for (WebSocketSession session : sessions) {
                try {
                    System.out.println("📩 WebSocket으로 성공 메시지 전송: " + message);
                    session.sendMessage(new TextMessage(message));
                } catch (IOException e) {
                    System.err.println("❌ WebSocket 성공 메시지 전송 실패: " + e.getMessage());
                    e.printStackTrace();
                }
            }
        }
    }
}
