<%@page import="com.facecheck.entity.Employee"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>사용자 관리</title>
<link rel="stylesheet" href="css/user-management.css" />
<script defer src="js/user-management.js"></script>
<script defer src="/js/header.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
	<%@ include file="header.jsp"%>
	<main class="management">
		<section class="user-management">
			<h1 class="manage">사용자 관리</h1>

			<!-- 검색 필드와 버튼 -->
			<div class="search-container">
				<div class="search-icon"> 🔎 </div>
				<input type="text" id="searchInput" placeholder="이름 또는 사번 입력" />

			</div>

			<table class="user-table">
				<thead>
					<tr>
						<th>이름</th>
						<th>사번</th>
						<th>부서</th>
						<th>생년월일</th>
						<th>연락처</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
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
						<td>
<<<<<<< HEAD
							<div class="dropdown-">
								<span class="dots" onclick="toggleDropdown(this)">⋮</span>
								<div class="dropdown-menu">
									<a href="revise?emp_num=<%=emp.getEmp_num()%>""><button>수정</button></a>
=======
							<div class="user-action-dropdown">
								<span class="user-action-dots"
									onclick="toggleUserActionDropdown(this)">⋮</span>
								<div class="user-action-dropdown-menu">
									<a href="revise?emp_num=<%=emp.getEmp_num()%>"><button>수정</button></a>
>>>>>>> branch 'master' of https://github.com/kdgun1316/FaceCheck.git
									<a href="deleteUser?emp_num=<%=emp.getEmp_num()%>"
										id="deleteLink"><button>삭제</button></a>
								</div>
							</div>
						</td>
					</tr>
					<%
					}
					}
					%>
				</tbody>
			</table>
		</section>
	</main>
</body>
</html>
