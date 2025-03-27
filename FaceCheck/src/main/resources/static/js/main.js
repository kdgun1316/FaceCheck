// 전역 변수로 차트 인스턴스 관리
let accessLogChart = null;
let timeBarChart = null;
let deptPieChart = null;

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
        
        // 기존 차트가 있으면 제거
        if (accessLogChart) {
            accessLogChart.destroy();
        }
        
        accessLogChart = new Chart(ctx, {
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

    // 알림 닫기 버튼 이벤트
    document.querySelectorAll('.notice-close').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const item = this.closest('.notice-item');
            item.style.display = 'none';
        });
    });

// 시간대별 출입 인원 그래프
fetch("/FaceCheck/api/getTimeLogData")
    .then(response => response.json())
    .then(data => {
        console.log("📊 받은 데이터:", data);

        // X축: 0시 ~ 23시
        const labels = data.map(entry => entry.hour + ":00");
        const counts = data.map(entry => entry.count);

        // 최대 출입 시간대 강조를 위한 데이터 분석
        const maxCount = Math.max(...counts);
        const maxIndex = counts.indexOf(maxCount);

        // 색상 그라데이션 생성
        const getBackgroundColor = (index) => {
            if (index === maxIndex) {
                return "rgba(255, 99, 132, 0.9)"; // 최대 출입 시간대(강조, 붉은색)
            }
            const base = 54 + (index / labels.length) * 200; // 색상 밝기 조절
            return `rgba(${base}, 162, 235, 0.6)`;
        };
        const backgroundColors = counts.map((_, index) => getBackgroundColor(index));

        const timeData = {
            labels: labels,
            datasets: [{
                label: "출입 인원 수",
                data: counts,
                backgroundColor: backgroundColors,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        };

        // 차트 생성
        const ctx = document.getElementById("timeBarChart").getContext("2d");

        // 기존 차트가 있으면 제거
        if (timeBarChart) {
            timeBarChart.destroy();
        }

        // 새 차트 생성
        timeBarChart = new Chart(ctx, {
            type: "bar",
            data: timeData,
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const total = counts.reduce((sum, val) => sum + val, 0); // 총 출입 인원
                                const percentage = ((counts[tooltipItem.dataIndex] / total) * 100).toFixed(1); // 비율 계산
                                return `출입 인원: ${tooltipItem.raw}명 (${percentage}%)`;
                            }
                        }
                    },
                    legend: {
                        display: false // 범례 제거 (필요시 true로 설정)
                    },
                    title: {
                        display: true,
                        
                    }
                },
                animation: {
                    duration: 1000, // 애니메이션 시간 (1초)
                    easing: "easeInOutQuart"
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) { return Number.isInteger(value) ? value : null; }
                        },
                        title: { display: true, text: "출입 인원 수" }
                    },
                    x: {
                        
                    }
                }
            }
        });
    })
    .catch(error => console.error("❌ 데이터 로딩 오류:", error));

    // 부서별 출입 데이터 차트
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
            
            // 기존 차트가 있으면 제거
            if (deptPieChart) {
                deptPieChart.destroy();
            }
            
            deptPieChart = new Chart(ctx, {
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





