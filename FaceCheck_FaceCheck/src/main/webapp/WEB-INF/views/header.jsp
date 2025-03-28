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
            <ul>
                <li><a href="#">메인페이지</a></li>
                <li class="dropdown">
                    <a href="#" class="toggle">등록사용자 관리 <span class="arrow">▼</span></a>
                    <ul class="submenu">
                        <li><a href="index.jsp">사용자 등록</a></li>
                        <li><a href="user-management.jsp">사용자 관리</a></li>
                    </ul>
                </li>
                <li><a href="#">출입 기록 관리</a></li>
            </ul>
        </aside>
        <main class="content">
            <header class="topbar">
                <a href="main.jsp"><h1 class="logo"><img src="./images/logo.jpg" alt="로고"></h1></a>
                <div class="icons">
                    <input type="text" placeholder="Search">
                    <span class="notification-icon">🔔</span>
                    <span class="user-icon">👤</span>
                </div>
            </header>  
        </main>
    </div>

</body>
</html>