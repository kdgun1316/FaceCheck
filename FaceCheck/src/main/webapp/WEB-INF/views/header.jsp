<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>header</title>
<link rel="stylesheet" href="css/header.css" />
<script defer src="js/header.js"></script>
</head>
<body>
	<div class="container">
    <aside class="sidebar">
<!--         <div class="avatar">
            <div class="avatar__img">
                <img src="https://picsum.photos/70" alt="avatar">
            </div>
            <div class="avatar__name">관리자</div>
        </div> -->
        <nav class="menu">
            <a class="menu__item" href="main">
                <i class="menu__icon fa fa-home"></i>
                <span class="menu__text">메인페이지</span>
            </a>
            
            <!-- 중요: 수정된 드롭다운 부분 -->
            <div class="dropdown-wrapper">
                <div class="menu__item dropdown-toggle">
                    <i class="menu__icon fa fa-users"></i>
                    <span class="menu__text">등록사용자 관리</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="dropdown-content">
                    <a href="register-user">사용자 등록</a>
                    <a href="user-management">사용자 관리</a>
                </div>
            </div>
            
            <a class="menu__item" href="recode">
                <i class="menu__icon fa fa-list"></i>
                <span class="menu__text">출입 기록 관리</span>
            </a>
        </nav>
        <div class="sidebar-logout">
            <a href="login">
                <i class="menu__icon fa fa-sign-out"></i>
                <span class="menu__text">로그아웃</span>
            </a>
        </div>
    </aside>
    <main class="content">
        <header class="topbar">
            <a href="main" class="logo"><img
                src="${pageContext.request.contextPath}/images/logo.jpg" alt="로고"></a>
            <div class="icons">
                <input type="text" placeholder="Search"> <span
                    class="notification-icon">🔔</span>
                <div class="user-icon-container">
                    <span class="user-icon">👤</span>
                    <div class="dropdown-menu1">
                        <a href="login"><span>🚪</span> 로그아웃</a>
                    </div>
                </div>
            </div>
        </header>
        <!-- Main content goes here -->
    </main>
</div>




<!-- ✅ WebSocket 메시지를 표시할 모달창 -->
<div id="alertModal" class="cont_principal">
    <div class="cont_bgc_modal"></div>
    <div class="cont_modal">
        <div class="cont_circulo_prohibido">
            <div class="cont_raya_divisor"></div>
            <div class="cont_form_modal">
                <div class="cont_logo_restrigido">
                    <div class="cont_circulo_logo">
                        <div class="con_raya_logo"></div>
                    </div>
                </div>
                <div class="danger">
                	<p>🚫</p>
                </div>
                <div class="po_relative">
                    <h1>ALERT MESSAGE</h1>
                    <p id="modalMessage">You have received a message.</p>
                </div>
                <div class="cont_btn">
                    <button class="btn_proceed" id="closeModal">CLOSE</button>
                </div>
            </div>
        </div>
    </div>
</div>
>>>>>>> branch 'master' of https://github.com/kdgun1316/FaceCheck.git


</body>
</html>