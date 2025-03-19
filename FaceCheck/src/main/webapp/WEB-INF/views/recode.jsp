<%@page import="com.facecheck.entity.recode"%>
<%@page import="java.util.List"%>
<%@page import="com.facecheck.entity.Employee"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>recode</title>
<link rel="stylesheet" href="css/user-management.css" />
<script defer src="js/user-management.js"></script>
<script defer src="/js/header.js"></script>
</head>
<body>
	<%@ include file="header.jsp"%>

	<main class="management">
		<section class="user-management">
			<h1 class="manage">출입 기록 관리</h1>
			<div class="button-container">
				<button id="customButton" class="cta-button"
					onclick="handleButtonClick()">CSV로 내보내기</button>
			</div>

			<table class="user-table">
				<tr>
					<th>index</th>
					<th>이름</th>
					<th>사번</th>
					<th>부서</th>
					<th>생년월일</th>
					<th>연락처</th>
					<th>출입기록</th>
				</tr>
				<%
				// List<Employee> empList = (List<Employee>) request.getAttribute("empselect");
				List<recode> recList = (List<recode>) request.getAttribute("recselect");

				//if (empList != null && recList != null) {
				if (recList != null) {
					//for (int i = 0; i < empList.size(); i++) {
					for (int i = 0; i < recList.size(); i++) {
						recode rec = recList.get(i);
				%>
				<tr>
					<td><%=rec.getLog_idx()%></td>
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
	</main>

</body>
</html>