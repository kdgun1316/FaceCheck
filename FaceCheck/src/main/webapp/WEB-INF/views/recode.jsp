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

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.modal-content {
  padding: 10px;
}
.close {
  float: right;
  font-size: 20px;
  cursor: pointer;
}
</style>
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


<!-- ✅ WebSocket 메시지를 표시할 모달창 -->
<div id="alertModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p id="modalMessage">🚨 여기에 메시지가 들어갑니다!</p>
  </div>
</div>


<script>
    let socket;

    function connectWebSocket() {
        socket = new WebSocket("ws://localhost:8083/FaceCheck/ws/alert");

        socket.onopen = function () {
            console.log("✅ WebSocket 연결 성공!");
            document.getElementById("status").innerText = "✅ WebSocket 연결 성공!";
        };

        socket.onmessage = function (event) {
            console.log("📩 서버로부터 메시지:", event.data);


            // ✅ 모달창 메시지 업데이트
            document.getElementById("modalMessage").innerText = event.data;

            // ✅ 모달창 표시
            document.getElementById("alertModal").style.display = "block";

            // ✅ 메시지 로그 업데이트
            document.getElementById("messages").innerHTML += "<br>" + event.data;
        };

        socket.onerror = function (error) {
            console.error("❌ WebSocket 오류 발생:", error);
            document.getElementById("status").innerText = "❌ WebSocket 오류 발생";
        };

        socket.onclose = function () {
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

    // ✅ 모달창 닫기 기능 추가
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector(".close").addEventListener("click", function () {
            document.getElementById("alertModal").style.display = "none";
        });
    });

    connectWebSocket();
</script>


</body>
</html>