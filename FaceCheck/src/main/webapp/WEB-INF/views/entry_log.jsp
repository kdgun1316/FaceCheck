<%@page import="com.facecheck.entity.recode"%>
<%@page import="java.util.List"%>
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
                    <th>이미지</th>
                    <th>이름</th>
                    <th>사번</th>
                    <th>부서</th>
                    <th>생년월일</th>
                    <th>연락처</th>
                    <th>출입기록</th>               
               </tr>

      

<%
				// List<Employee> empList = (List<Employee>) request.getAttribute("empselect");
				List<recode> recList = (List<recode>) request.getAttribute("logList");

			
					
					for (int i = 0; i < recList.size(); i++) {
						recode rec = recList.get(i);
				%>
				<tr>
					<td><%=rec.getEmp_image()%></td>
					<td><%=rec.getEmp_name()%></td>
					<td><%=rec.getEmp_num()%></td>
					<td><%=rec.getDept()%></td>
					<td><%=rec.getEmp_birthdate()%></td>
					<td><%=rec.getEmp_phone()%></td>
					<td><%=rec.getLog_time()%></td>
					
				</tr>
				<%
				
				}
				%>
			</table>    
                          
        </section>
    </main>
</body>
</html>