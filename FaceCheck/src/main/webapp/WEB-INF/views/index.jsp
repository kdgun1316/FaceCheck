<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" href="css/index.css" />
<script defer src="js/index.js"></script>
<script defer src="js/header.js"></script>
</head>
<body>
	<%@ include file="header.jsp" %>

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

</body>
</html>