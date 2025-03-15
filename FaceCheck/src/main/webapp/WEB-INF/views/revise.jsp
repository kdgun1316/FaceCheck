<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/revise.css" />
<script defer src="/js/header.js"></script>
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
                    <input type="text" id="name" name="emp_name" placeholder="이름을 입력하세요" required>
                </div>
                <div class="form-group">
                    <label for="id">사번</label>
                    <input type="text" id="id" name="emp_num" value="<%= empNum %>" readonly>

                </div>
                <div class="form-group">
                    <label for="dept">부서</label>
                    <select id="gender" name="dept" required>
                        <option value="accountion">회계</option>
                        <option value="personnel">인사</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="birth">생년월일</label>
                    <input type="date" name="emp_birthdate" required>
                </div>
                <div class="form-group">
                    <label for="phone">연락처</label>
                    <input type="tel" id="phone" name="emp_phone" required>
                </div>
            
                <button type="submit" class="register-btn">등록</button>
            </form>

         </div>
      </div>
   </section>

</body>
</html>