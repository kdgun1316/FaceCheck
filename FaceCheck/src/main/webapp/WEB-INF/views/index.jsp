<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" href="css/index.css" />
<script defer src="js/index.js"></script>
</head>
<body>

<body>
    <div class="container">
        <aside class="sidebar">
            <ul>
                <li><a href="#">메인페이지</a></li>
                <li class="dropdown">
                    <a href="#" class="toggle">등록사용자 관리 <span class="arrow">▼</span></a>
                    <ul class="submenu">
                        <li><a href="#">사용자 등록</a></li>
                        <li><a href="#">사용자 관리</a></li>
                    </ul>
                </li>
                <li><a href="#">출입 기록 관리</a></li>
            </ul>
        </aside>
        <main class="content">
            <header class="topbar">
                <h2>FACE CHECK</h2>
                <div class="icons">
                    <input type="text" placeholder="Search">
                    <span class="notification-icon">🔔</span>
                    <span class="user-icon">👤</span>
                </div>
            </header>
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
                <form id="image-form" action="next" method="get">
                    <input type="hidden" name="capturedImages" id="capturedImagesInput">
                    <button type="submit" id="next-button" style="display:none;">다음</button> <!-- 폼 제출 버튼 -->
                </form>
            </section>
            
            
        </main>
    </div>
    
    
</body>
</html>