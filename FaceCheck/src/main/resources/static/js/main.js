document.addEventListener('DOMContentLoaded', function() {
    // 현재 날짜 기준으로 5일 전까지의 날짜를 생성하는 함수
    function getPastDates(days) {
        const dates = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const pastDate = new Date();
            pastDate.setDate(today.getDate() - i);
            const formattedDate = pastDate.toISOString().split('T')[0].slice(5).replace('-', '/'); // MM/DD 형식
            dates.push(formattedDate);
        }
        return dates;
    }

// 차트 생성 함수
    function createChart(labels, datasets) {
        const ctx = document.getElementById('accessLogChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y;
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2
                        },
                        suggestedMax: 20
                    },
                    x: {
                        title: {
                            display: true
                            
                        }
                    }
                }
            }
        });
    }

// 서버에서 대시보드 데이터 가져오기
    fetch('/FaceCheck/api/dashboard-data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
            }
            return response.text(); // 먼저 텍스트로 받아서 확인
        })
        .then(text => {
            console.log("서버 응답:", text); // 응답을 콘솔에 출력
            const data = JSON.parse(text); // JSON 파싱 시도
            const labels = getPastDates(6); // 5일 전부터 오늘까지
            const datasets = data.datasets;
            createChart(labels, datasets);
        })
        .catch(error => {
            console.error("데이터를 불러오는 중 오류 발생:", error);
            // 기본 데이터 사용
            const defaultLabels = getPastDates(6);
            const defaultDatasets = [
                { label: '직원', data: [12, 19, 3, 5, 2, 3], backgroundColor: '#4CAF50', borderColor: '#4CAF50', borderWidth: 1 },
                { label: '게스트', data: [5, 10, 2, 3, 1, 4], backgroundColor: '#FF9800', borderColor: '#FF9800', borderWidth: 1 }
            ];
            createChart(defaultLabels, defaultDatasets);
        });
});


// 알림 닫기 버튼 이벤트
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.notice-close').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const item = this.closest('.notice-item');
            item.style.display = 'none';
        });
    });
});

// 시간대별 출입인원 그래프
document.addEventListener("DOMContentLoaded", function () {
    // MySQL 데이터 가져오기 (AJAX 요청)
    fetch("/getTimeLogData")
        .then(response => response.json())
        .then(data => {
            const labels = data.map(entry => entry.hour);
            const counts = data.map(entry => entry.count);

            const timeData = {
                labels: labels,
                datasets: [{
                    label: "출입 인원 수",
                    data: counts,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            };

            // 시간대별 출입 현황 차트 생성
            const ctx = document.getElementById("timeBarChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: timeData,
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(error => console.error("데이터 로딩 오류:", error));
        
});





document.addEventListener("DOMContentLoaded", function () {
    fetch("/FaceCheck/api/getTimeLogData")
        .then(response => response.json())
        .then(data => {
            console.log("📊 받은 데이터:", data);

            // X축: 0시 ~ 23시
            const labels = data.map(entry => entry.hour + ":00");
            const counts = data.map(entry => entry.count);

            const timeData = {
                labels: labels,
                datasets: [{
                    label: "출입 인원 수",
                    data: counts,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            };

            // 차트 생성
            const ctx = document.getElementById("timeBarChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: timeData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1, // Y축을 정수 단위로 설정
                                callback: function(value) { return Number.isInteger(value) ? value : null; }
                            },
                            title: { display: true, text: "출입 인원 수" }
                        },
                        x: {
                            title: { display: true, text: "시간대" }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("❌ 데이터 로딩 오류:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/FaceCheck/api/getDeptLogData")
        .then(response => response.json())
        .then(data => {
            console.log("📊 부서별 출입 데이터:", data);

            const labels = data.map(entry => entry.department); // 부서 이름
            const counts = data.map(entry => entry.count); // 출입 횟수

            const pieData = {
                labels: labels,
                datasets: [{
                    label: "부서별 출입 횟수",
                    data: counts,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"]
                }]
            };

            // 차트 생성
            const ctx = document.getElementById("deptPieChart").getContext("2d");
            new Chart(ctx, {
                type: "pie",
                data: pieData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: "bottom" }
                    }
                }
            });
        })
        .catch(error => console.error("❌ 부서별 데이터 로딩 오류:", error));
});