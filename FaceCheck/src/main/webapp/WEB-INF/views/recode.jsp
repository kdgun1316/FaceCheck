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
			<h1>출입 기록 관리</h1>

			<table class="user-table">
				<tr>
					<th>이름</th>
					<th>사번</th>
					<th>부서</th>
					<th>생년월일</th>
					<th>연락처</th>
					<th>출입기록</th>
				</tr>
				<%
				List<Employee> empList = (List<Employee>) request.getAttribute("empselect");
				if (empList != null) {
					for (Employee emp : empList) {
				%>
				<tr>
					
					<td><%=emp.getEmp_name()%></td>
					<td><%=emp.getEmp_num()%></td>
					<td><%=emp.getDept()%></td>
					<td><%=emp.getEmp_birthdate()%></td>
					<td><%=emp.getEmp_phone()%></td>
					<td></td>
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