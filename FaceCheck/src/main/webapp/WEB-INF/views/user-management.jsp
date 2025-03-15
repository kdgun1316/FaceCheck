<%@page import="com.facecheck.entity.Employee"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/user-management.css" />
<script defer src="js/user-management.js"></script>
<script defer src="/js/header.js"></script>
</head>
<body>
	<%@ include file="header.jsp"%>
	<main class="management">
		<section class="user-management">
			<h1 class="manage">사용자 관리</h1>

			<table class="user-table">
				<tr>
					<th>이름</th>
					<th>사번</th>
					<th>부서</th>
					<th>생년월일</th>
					<th>연락처</th>
					<th>이미지</th>
					<th>이미지벡터</th>
					<th></th>
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
					<td><%=emp.getEmp_face_img()%></td>
					<td><%=emp.getEmp_face_vector()%></td>
					<td>
						<div class="dropdown-">
							<span class="dots" onclick="toggleDropdown(this)">⋮</span>
							<div class="dropdown-menu">
								<a href="revise"><button onclick="editUser()">수정</button></a> <a
									href="deleteUser?emp_num=<%=emp.getEmp_num()%>" id="deleteLink"><button>삭제</button></a>
							</div>
						</div>
					</td>
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