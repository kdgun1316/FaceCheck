<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/revise.css" />
<script defer src="/js/header.js"></script>
<link rel="stylesheet"
   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>
<body>

   <%@ include file="header.jsp"%>
   
   <%
    // GET 또는 POST 요청에서 emp_num 값 가져오기
    String empNum = request.getParameter("emp_num");
    if (empNum == null) {
        empNum = ""; // 값이 없을 경우 빈 문자열 처리
    }
%>
   <section class="register-section">
      <div class="register-container">

         <div class="form-section">
            <form id="user-form" class="register-form" action="user_update" method="post">
                <div class="form-group">
                    <label for="name">이름</label>
                    <input class="form-control" type="text" id="name" name="emp_name" placeholder="이름을 입력하세요" required>
                </div>
                <div class="form-group">
                    <label for="id">사번</label>
                    <input class="form-control" type="text" id="id" name="emp_num" value="<%= empNum %>" readonly>

                </div>
                <div class="form-group">
                    <label for="dept">부서</label>
                    <select class="form-control" id="gender" name="dept" required>
                        <option value="회계">회계</option>
                        <option value="인사">인사</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="birth">생년월일</label>
                    <input class="form-control" type="date" name="emp_birthdate" required>
                </div>
                <div class="form-group">
                    <label for="phone">연락처</label>
                    <input class="form-control" type="tel" id="phone" name="emp_phone" required>
                </div>
            
<!--                 <button type="submit" class="register-btn">등록</button>
 -->                <button class="register-btn">
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