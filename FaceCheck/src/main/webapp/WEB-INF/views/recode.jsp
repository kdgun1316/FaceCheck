<%@page import="com.facecheck.entity.recode"%>
<%@page import="java.util.List"%>
<%@page import="com.facecheck.entity.Employee"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>recode</title>
<link rel="stylesheet" href="css/user-management.css" />
<script defer src="js/user-management.js"></script>
<script defer src="/js/header.js"></script>
<link rel="stylesheet"
   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>
<body>
	<%@ include file="header.jsp"%>

	<main class="management">
		<section class="user-management">
			<h1 class="manage">출입 기록 관리</h1>
			<div class="button-container">
				<button id="customButton" class="cta-button"
					onclick="handleButtonClick()">CSV로 내보내기</button>
			</div>

			<table class="user-table">
				<tr>
					<th>index</th>
					<th>이름</th>
					<th>사번</th>
					<th>부서</th>
					<th>생년월일</th>
					<th>연락처</th>
					<th>출입기록</th>
				</tr>
				<%
				// List<Employee> empList = (List<Employee>) request.getAttribute("empselect");
				List<recode> recList = (List<recode>) request.getAttribute("recselect");

				//if (empList != null && recList != null) {
				if (recList != null) {
					//for (int i = 0; i < empList.size(); i++) {
					for (int i = 0; i < recList.size(); i++) {
						recode rec = recList.get(i);
				%>
				<tr>
					<td><%=rec.getLog_idx()%></td>
					<td><a href="entry_log?emp_num=<%=rec.getEmp_num()%>"><%=rec.getEmp_name()%></a></td>
					<td><%=rec.getEmp_num()%></td>
					<td><%=rec.getDept()%></td>
					<td><%=rec.getEmp_birthdate()%></td>
					<td><%=rec.getEmp_phone()%></td>
					<td><%=rec.getLog_time()%></td>
				</tr>
				<%
				}
				}
				%>
			</table>
		</section>
	</main>




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
                alert("🚨 경고 메시지 도착                                          ! \n" + event.data);
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