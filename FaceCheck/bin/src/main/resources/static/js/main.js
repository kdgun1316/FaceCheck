document.addEventListener('DOMContentLoaded', function() {
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
                            display: true,
                            text: '날짜'
                        }
                    }
                }
            }
        });
    }

    // 서버에서 대시보드 데이터 가져오기
    fetch('/api/dashboard-data')
        .then(response => response.json())
        .then(data => {
            const labels = data.labels;
            const datasets = data.datasets;
            createChart(labels, datasets);
        })
        .catch(error => {
            console.error("데이터를 불러오는 중 오류 발생:", error);
            // 기본 데이터 사용
            const defaultLabels = ['03-09', '03-10', '03-11', '03-12', '03-13', '03-14'];
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