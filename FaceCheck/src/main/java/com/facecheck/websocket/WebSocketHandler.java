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

    // ✅ WebSocket을 통해 관리자에게 경고 메시지 전송
    public void sendAlertToAdmins(String message) {
        synchronized (sessions) {
            for (WebSocketSession session : sessions) {
                try {
                    session.sendMessage(new TextMessage(message));
                    System.out.println("🚀 WebSocket으로 관리자에게 메시지 전송됨: " + message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
