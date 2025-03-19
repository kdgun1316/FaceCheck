<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/register-user.css" />
<script defer
	src="${pageContext.request.contextPath}/js/register-user.js"></script>
<script defer src="/js/header.js"></script>


<link rel="stylesheet" href="css/index.css" />

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


	<!-- 1. 이미지 캡처 섹션 -->
	<section class="main-content">
		<div class="camera-container">
			<video id="camera-feed" autoplay playsinline></video>
			<div class="face-guidance">
				<div class="face-guidance-oval"></div>
				<div class="face-guidance-text">얼굴을 타원 안에 맞춰주세요</div>
			</div>
		</div>
		<!-- <button id="capture-button">촬영</button> -->
		<button id="capture-button" class="capture-button">
			<span class="btn-txt">촬영</span>
		</button>
		<canvas id="canvas" style="display: none;"></canvas>
		<div id="image-container"></div>
		<button id="next-button" class="next-button">
			<span class="btn-txt">다음</span>
		</button>
	</section>

	<!-- 2. 사용자 정보 입력 섹션 -->
	<section class="register-section">
		<div class="register-container">
			<div class="profile-section">
				<div class="profile-image">
					<!-- 이미지 미리보기 영역 -->
					<img id="preview-image" src="./images/crayon-shin.png"
						alt="프로필 이미지">
					<!-- 파일 선택 입력 -->
					<input type="file" id="image-upload" accept="image/*"
						style="display: none;">
					<!-- 파일 선택 버튼 -->
					<!--                     <button type="button" onclick="document.getElementById('image-upload').click()">이미지 선택</button>
 -->
				</div>
			</div>
			<div class="form-section">
				<form id="user-form" class="register-form" action="register-user"
					method="post" enctype="multipart/form-data">
					<div class="form-group">
						<label for="name">🧑 이름</label> <input class="form-control"
							type="text" id="name" name="emp_name" placeholder="이름을 입력하세요"
							required>
					</div>
					<div class="form-group">
						<label for="id">🔢 사원번호</label> <input class="form-control"
							type="text" id="id" name="emp_num" placeholder="사원번호을 입력하세요"
							required>
					</div>
					<div class="form-group">
						<label for="dept">🏢 부서</label> <select class="form-control"
							id="gender" name="dept" required>
							<option value="" selected disabled>부서를 선택하세요</option>
							<option value="회계">회계</option>
							<option value="인사">인사</option>
							<option value="영업">영업</option>
							<option value="마케팅">마케팅</option>
							<option value="생산">생산</option>
							<option value="연구개발">연구개발</option>
							<option value="고객지원">고객지원</option>
							<option value="IT">IT</option>
							<option value="법무">법무</option>
							<option value="구매">구매</option>
						</select>
					</div>
					<div class="form-group">
						<label for="birth">📅 생년월일</label> <input class="form-control"
							type="date" name="emp_birthdate" required>
					</div>
					<div class="form-group">
						<label for="phone">📞 연락처</label> <input class="form-control"
							type="tel" id="phone" name="emp_phone" required>
					</div>

					<button type="button" id="submit-btn" class="submit-btn">
						<svg viewBox="0 0 24 24" width="24" height="24"
							stroke="currentColor" stroke-width="2" fill="none"
							stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
						등록
					</button>
				</form>
			</div>
		</div>
	</section>


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

			socket.onopen = function() {
				console.log("✅ WebSocket 연결 성공!");
				document.getElementById("status").innerText = "✅ WebSocket 연결 성공!";
			};

			socket.onmessage = function(event) {
				console.log("📩 서버로부터 메시지:", event.data);

				// ✅ 모달창 메시지 업데이트
				document.getElementById("modalMessage").innerText = event.data;

				// ✅ 모달창 표시
				document.getElementById("alertModal").style.display = "block";

				// ✅ 메시지 로그 업데이트
				document.getElementById("messages").innerHTML += "<br>"
						+ event.data;
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

		// ✅ 모달창 닫기 기능 추가
		document
				.addEventListener(
						"DOMContentLoaded",
						function() {
							document
									.querySelector(".close")
									.addEventListener(
											"click",
											function() {
												document
														.getElementById("alertModal").style.display = "none";
											});
						});

		connectWebSocket();
	</script>

</body>
</html>
