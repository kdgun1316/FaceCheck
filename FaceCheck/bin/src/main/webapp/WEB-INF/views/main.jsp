<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<link rel="stylesheet" href="css/main.css" />
</head>
<body>
	<%@ include file="header.jsp"%>

	<div class="chart">
		<canvas id="barChart"></canvas>
	</div>

	<div class="chart1">
		<canvas id="doughnutChart"></canvas>
	</div>

<script defer src="js/main.js"></script>
<script defer src="js/header.js"></script>

</body>
</html>