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
		<button id="capture-button" class="button">
			<span>촬영</span>
			<svg width="15px" height="10px" viewBox="0 0 13 10">
    <path d="M1,5 L11,5"></path>
    <polyline points="8 1 12 5 8 9"></polyline>
  </svg>
		</button>
		<canvas id="canvas" style="display: none;"></canvas>
		<div id="image-container"></div>
		<!-- 캡처된 이미지를 표시할 영역 추가 -->
		<button id="next-button" class="button" style="display: none;">
			<span>다음</span>
			<svg width="15px" height="10px" viewBox="0 0 13 10">
    <path d="M1,5 L11,5"></path>
    <polyline points="8 1 12 5 8 9"></polyline>
  </svg>
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
						<label for="name">이름</label> <input class="form-control"
							type="text" id="name" name="emp_name" placeholder="이름을 입력하세요"
							required>
					</div>
					<div class="form-group">
						<label for="id">사번</label> <input class="form-control" type="text"
							id="id" name="emp_num" placeholder="사번을 입력하세요" required>
					</div>
					<div class="form-group">
						<label for="dept">부서</label> <select class="form-control"
							id="gender" name="dept" required>
							<option value="accountion">회계</option>
							<option value="personnel">인사</option>
						</select>
					</div>
					<div class="form-group">
						<label for="birth">생년월일</label> <input class="form-control"
							type="date" name="emp_birthdate" required>
					</div>
					<div class="form-group">
						<label for="phone">연락처</label> <input class="form-control"
							type="tel" id="phone" name="emp_phone" required>
					</div>

					<!-- <button type="button" id="submit-btn" class="submit-btn">등록</button> -->
					<button class="submit-btn">
					  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
					    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
					  </svg>
					  등록
					</button>
				</form>
			</div>
		</div>
	</section>

</body>
</html>
