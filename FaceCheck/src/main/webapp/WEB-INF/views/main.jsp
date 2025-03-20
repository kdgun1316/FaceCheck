<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>출입 관리 대시보드</title>
<link rel="stylesheet" href="css/main.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script defer src="/js/header.js"></script>
<link rel="stylesheet"
   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>
<body>
	<%@ include file="header.jsp"%>
	<div class="dashboard-container">
		<!-- 상단 통계 카드 -->
		<div class="stats-cards">
			<div class="stat-card">
				<h3>사용자 수</h3>
				<div class="stat-value">
					<c:out value="${empNumCount}" />
				</div>
			</div>
			<div class="stat-card">
				<h3>장치 관리</h3>
				<div class="stat-value">1</div>
			</div>
		</div>
		<!-- ✅ 수정된 메인 콘텐츠 영역 (한 줄에 4개 배치) -->
		<div class="content-wrapper">
			<!-- 시간대별 출입 인원 -->
			<div class="section-box">
				<h3 class="chart-header">시간대별 출입 인원</h3>
				<canvas id="timeBarChart"></canvas>
			</div>
			<!-- 부서별 출입 비율 -->
			<div class="section-box">
				<h3 class="chart-header">부서별 출입 비율</h3>
				<canvas id="deptPieChart"></canvas>
			</div>
			<!-- 출입 로그 수 -->
			<div class="section-box">
				<h3 class="chart-header">출입 로그 수</h3>
				<canvas id="accessLogChart"></canvas>
			</div>
			<!-- 실시간 알림 - section-box 클래스 제거 -->
			<div class="notice-list">
    <c:forEach var="log" items="${logList}">
        <div class="notice-item">
            <div class="notice-profile">
                <img src="images/face_recognition.jpg" alt="얼굴인식">
            </div>
            <div class="notice-content">
                <div class="notice-text" style="color: ${log.status eq '성공' ? 'blue' : 'red'}">얼굴 인증 ${log.status}<%-- : ${log.admin_id} --%></div>
                <div class="notice-date">${log.log_time}</div>
            </div>
				<div class="notice-status">
					<button class="notice-close" onclick="deleteLog(this, ${log.log_idx})">삭제</button>
				</div>
					</div>
    </c:forEach>
</div>

		</div>
	</div>
	<script src="js/main.js"></script>z
</body>
</html>