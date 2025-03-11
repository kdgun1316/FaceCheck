const barctx = document.getElementById('barChart').getContext('2d');
console.log("JavaScript 파일이 로드되었습니다!");

        // 2. 차트 생성
        new Chart(barctx, {
            type: 'bar', // 그래프 타입 (bar, line, pie 등)
            data: {
                labels: ['A', 'B', 'C', 'D', 'E','F','G'], // X축 레이블
                datasets: [{
                    label: '점수',
                    data: [12, 19, 3, 5, 9, 3, 3], // Y축 데이터
                    backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 색상
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
          	  	  responsive: true,
    		 	  maintainAspectRatio: false,
    		 	  scales: {
      	  				y: {
            				ticks: {
                				stepSize: 3 // 숫자 간격을 5로 설정
           	 				}
        				}
   					 }
           		 }
        	});

        
        
const ctx = document.getElementById("doughnutChart").getContext("2d");

new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Red", "Blue"],
        datasets: [{
            data: [30, 50],
            backgroundColor: ["lightblue", "lightgray"],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "50%", // 도넛 가운데 구멍 크기 조절
        rotation: -90, // 시작 각도를 -90도(위쪽)로 설정
        circumference: 180 // 차트의 표시 범위를 180도(반쪽)로 설정
    }
});
