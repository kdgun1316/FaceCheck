<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/register-user.css" />
<script defer src="${pageContext.request.contextPath}/js/register-user.js"></script>
<script defer src="/js/header.js"></script>


<link rel="stylesheet" href="css/index.css" />
<script defer src="js/index.js"></script>


</head>
<body>
	<%@ include file = "header.jsp" %>
	
	
	
	 <section class="main-content">
                <div class="camera-container">
                    <video id="camera-feed" autoplay playsinline></video>
                    <div class="face-guidance">
                        <div class="face-guidance-oval"></div>
                        <div class="face-guidance-text">얼굴을 타원 안에 맞춰주세요</div>
                    </div>
                </div>
                <button id="capture-button">촬영</button>
                <canvas id="canvas" style="display:none;"></canvas>
                <div id="image-container"></div> <!-- 캡처된 이미지를 표시할 영역 추가 -->
            
                <!-- 📌 촬영한 이미지를 전달할 폼 -->
                <form id="image-form" action="register-user" method="get">
                    <input type="hidden" name="capturedImages" id="capturedImagesInput">
                    <a href="register-user"><button type="submit" id="next-button" style="display:none;">다음</button></a> <!-- 폼 제출 버튼 -->
                </form>
            </section>
            
            
            
	
	
	
	
 <section class="register-section">
            <div class="register-container">
                <div class="profile-section">
                    <div class="profile-image">
                        <!-- 이미지 미리보기 영역 -->
                        <img id="preview-image" src="./images/crayon-shin.png" alt="프로필 이미지">
                        <!-- 파일 선택 입력 -->
                        <input type="file" id="image-upload" accept="image/*" style="display: none;">
                        <!-- 파일 선택 버튼 -->
                        <button type="button" onclick="document.getElementById('image-upload').click()">이미지 선택</button>
                    </div>
                </div>
                <div class="form-section">
                    <form class="register-form">
                        <div class="form-group">
                            <label for="name">이름</label>
                            <input type="text" id="name" name="name" placeholder="이름을 입력하세요" required>
                        </div>
                        <div class="form-group">
                            <label for="id">사번</label>
                            <input type="text" id="id" name="id" placeholder="사번을 입력하세요" required>
                        </div>
                        <div class="form-group">
                            <label for="birth">생년월일</label>
                            <select id="birth-year" name="birth-year" required>
                                <option value="">년도 선택</option>
                            </select>
                            <select id="birth-month" name="birth-month" required>
                                <option value="">월 선택</option>
                            </select>
                            <select id="birth-day" name="birth-day" required>
                                <option value="">일 선택</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="gender">성별</label>
                            <select id="gender" name="gender" required>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="phone">연락처</label>
                            <input type="tel" id="phone" name="phone" placeholder="연락처를 입력하세요" required>
                        </div>
                        <a href="user-management"><button type="submit" class="register-btn">등록</button></a>
                    </form>
                </div>
            </div>
        </section>

</body>
</html>