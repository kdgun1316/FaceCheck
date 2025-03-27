<%@page import="com.facecheck.entity.recode"%>
<%@page import="java.util.List"%>
<%@page import="com.facecheck.entity.Employee"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>출입 기록 관리</title>
<link rel="stylesheet" href="css/user-management.css" />
<script defer src="js/user-management.js"></script>
<script defer src="/js/header.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<style>
.management {
  width: 80% !important;
  margin: 0 auto;
  padding-top: 60px;
}
.user-table {
  width: 80% !important;
  min-width: 1000px !important;
}
</style>
</head>
<body>
<%@ include file="header.jsp"%>
<main style="display:flex;">
<div style="width:300px;"></div>
<div class="management" >
  <section class="user-management">
    <h1 class="manage">출입 기록 관리</h1>
    <div class="button-container">
      <button id="customButton" class="cta-button" onclick="handleButtonClick()">CSV로 내보내기</button>
    </div>
    <table class="user-table" style="margin: 0 auto;">
      <tr class="tr">

        <th>이미지</th>
        <th>이름</th>
        <th>사번</th>
        <th>부서</th>
        <th>생년월일</th>
        <th>연락처</th>
        <th>출입기록</th>
      </tr>
      <% 
      List<recode> recList = (List<recode>) request.getAttribute("recselect");
      if (recList != null) {
        for (int i = 0; i < recList.size(); i++) {
          recode rec = recList.get(i);
      %>
      <tr>
  
        <td>
          <%
            String base64Image = rec.getBase64Image();
            if (base64Image != null) {
          %>
            <img src="data:image/jpeg;base64,<%= base64Image %>" width="60" height="60" />
          <%
            } else {
          %>
            <img src="images/face_recognition.jpg" width="60" height="60" />
          <%
            }
          %>
        </td>
        <td><a href="entry_log?emp_num=<%=rec.getEmp_num()%>"><%=rec.getEmp_name()%></a></td>
        <td><%=rec.getEmp_num()%></td>
        <td><%=rec.getDept()%></td>
        <td><%=rec.getEmp_birthdate()%></td>
        <td><%=rec.getEmp_phone()%></td>
        <td><%=rec.getLog_time()%></td>
      </tr>
      <% 
        }
      }
      %>
    </table>
  </section>
  </div>
</main>
</body>
</html>
