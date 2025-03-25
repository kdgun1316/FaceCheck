<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FaceCheck Admin Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="background-effect"></div>
    <div class="particles"></div>
    <div class="login-container">
    	<div class="particles-border">
        
        
        <h2>ADMIN LOGIN</h2>
        <form action="login" method="post">  
	        <input type="text" name="admin_id" placeholder="아이디를 입력하세요.">
	        <input type="password" name="admin_pw" placeholder="비밀번호를 입력하세요.">
	        <button type="submit">관리자 로그인</button>
        </form>
        
    </div>
<!--     <script defer src="js/login.js"></script> -->
</body>
</html>