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
        <h2>ADMIN LOGIN</h2>
        <form action="login" method="post">
        
        <input type="text" name="id" placeholder="아이디를 입력하세요.">
        <input type="password" name="pw" placeholder="비밀번호를 입력하세요.">
        <input type="submit" value="관리자 로그인">
        
        
        
        
        </form>
        
    </div>
    <script src="js/login.js"></script>
</body>
</html>