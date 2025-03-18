<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>출입 관리 대시보드</title>
<script defer src="/js/header.js"></script>
<link rel="stylesheet" href="css/main.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

		<!-- 메인 콘텐츠 영역 -->
		
		<div class="content-wrapper">
			<div class="section-box">
				<h3 class="chart-header">시간대별 출입 인원</h3>
				<canvas id="timeBarChart"></canvas>
			</div>
			<div class="section-box">
				<h3 class="chart-header">부서별 출입 비율</h3>
				<canvas id="deptPieChart"></canvas>
			</div>
		</div>

		<!-- 우측 영역: 차트와 실시간 알림을 나란히 배치 -->
		<div class="right-section">
			<!-- 출입 로그 수 차트 -->
			<div class="section-card chart-section">
				<div class="chart-container">
					<div class="chart-header">
						<span class="chart-title">출입 로그 수</span>
					</div>
					<canvas id="accessLogChart"></canvas>
					<div class="chart-legend"></div>
				</div>
			</div>

			<!-- 실시간 알림 -->
			<div class="section-card notice-section">
				<div class="notice-header">
					<span class="notice-title">실시간 알림</span>
				</div>
				<div class="notice-list">
					<%
					for (int i = 0; i < 8; i++) {
					%>
					<div class="notice-item">
						<div class="notice-profile">
							<img src="images/face_recognition.jpg" alt="얼굴인식">
						</div>
						<div class="notice-content">
							<div class="notice-text">얼굴 인증 성공</div>
							<div class="notice-date">2022-03-26 16:22:05</div>
						</div>
						<div class="notice-status">
							<button class="notice-close">닫기</button>
						</div>
					</div>
					<%
					}
					%>
				</div>
			</div>
		</div>
	</div>
	</div>

	<script src="js/main.js"></script>

</body>
</html>