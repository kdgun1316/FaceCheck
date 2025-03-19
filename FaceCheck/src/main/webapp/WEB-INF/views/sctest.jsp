<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h2>WebSocket 연결 테스트</h2>
    <button onclick="sendMessage()">메시지 보내기</button>
    <p id="status">🔄 WebSocket 연결 상태: 대기 중...</p>
    <p id="messages">📩 수신 메시지:</p>

    <script>
        let socket;

        function connectWebSocket() {
            socket = new WebSocket("ws://localhost:8083/FaceCheck/ws/alert");

            socket.onopen = function() {
                console.log("✅ WebSocket 연결 성공!");
                document.getElementById("status").innerText = "✅ WebSocket 연결 성공!";
            };

            socket.onmessage = function(event) {
                console.log("📩 서버로부터 메시지:", event.data);
                document.getElementById("messages").innerHTML += "<br>" + event.data;
            };

            socket.onerror = function(error) {
                console.error("❌ WebSocket 오류 발생:", error);
                document.getElementById("status").innerText = "❌ WebSocket 오류 발생";
            };

            socket.onclose = function() {
                console.log("❌ WebSocket 연결 종료. 3초 후 재연결 시도...");
                document.getElementById("status").innerText = "❌ WebSocket 연결 종료, 재연결 중...";
                setTimeout(connectWebSocket, 3000); // 3초 후 재연결 시도
            };
        }

        function sendMessage() {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send("테스트 메시지 전송!");
                console.log("🚀 테스트 메시지 전송!");
            } else {
                console.log("⚠ WebSocket 연결 안 됨!");
            }
        }

        connectWebSocket();
    </script>
</body>
</html>