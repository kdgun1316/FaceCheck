<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>출입 기록 상세</title>
<link rel="stylesheet" href="css/user-management.css" />
</head>
<body>
	<%@ include file="header.jsp"%>

	<main class="management">
		<section class="user-management">
			<h1 class="manage">출입 기록 조회</h1>

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

				<!-- Spring EL을 사용하여 logList 출력 -->
				<c:forEach var="rec" items="${logList}">
					<tr>
					
						<td>${rec.log_idx}</td>
						
						<td>${rec.emp_num}</td>
						<td>${rec.dept}</td>
						<td>${rec.emp_birthdate}</td>
						<td>${rec.emp_phone}</td>
						<td>${rec.log_time}</td>
					</tr>
				</c:forEach>

			</table>
		</section>
	</main>
</body>
</html>