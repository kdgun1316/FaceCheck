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
	<%@ include file="header.jsp" %>
 <main class="management">
                <section class="user-management">
                    <h1>사용자 관리</h1>

                    <table class="user-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>이름</th>
                                <th>사번</th>
                                <th>부서</th>
                                <th>생년월일</th>
                                <th>성별</th>
                                <th>연락처</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" name=""></td>
                                <td>홍길동</td>
                                <td>1234</td>
                                <td>경영관리부</td>
                                <td>1999.06.07</td>
                                <td>남성</td>
                                <td>010-1234-5678</td>
                                <td>
                                    <div class="dropdown-">
                                        <span class="dots" onclick="toggleDropdown(this)">⋮</span>
                                        <div class="dropdown-menu">
                                            <a href="revise"><button onclick="editUser()">수정</button></a>
                                            <button onclick="deleteUser()">삭제</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name=""></td>
                                <td>홍길동</td>
                                <td>1234</td>
                                <td>경영관리부</td>
                                <td>1999.06.07</td>
                                <td>남성</td>
                                <td>010-1234-5678</td>
                                <td>
                                    <div class="dropdown-">
                                        <span class="dots" onclick="toggleDropdown(this)">⋮</span>
                                        <div class="dropdown-menu">
                                            <button onclick="editUser()">수정</button>
                                            <button onclick="deleteUser()">삭제</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name=""></td>
                                <td>홍길동</td>
                                <td>1234</td>
                                <td>경영관리부</td>
                                <td>1999.06.07</td>
                                <td>남성</td>
                                <td>010-1234-5678</td>
                                <td>
                                    <div class="dropdown-">
                                        <span class="dots" onclick="toggleDropdown(this)">⋮</span>
                                        <div class="dropdown-menu">
                                            <button onclick="editUser()">수정</button>
                                            <button onclick="deleteUser()">삭제</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name=""></td>
                                <td>홍길동</td>
                                <td>1234</td>
                                <td>경영관리부</td>
                                <td>1999.06.07</td>
                                <td>남성</td>
                                <td>010-1234-5678</td>
                                <td>
                                    <div class="dropdown-">
                                        <span class="dots" onclick="toggleDropdown(this)">⋮</span>
                                        <div class="dropdown-menu">
                                            <a href="#"><button onclick="editUser()">수정</button></a>
                                            <button onclick="deleteUser()">삭제</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>



</body>
</html>