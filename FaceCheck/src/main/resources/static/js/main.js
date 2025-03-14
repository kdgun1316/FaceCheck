// 차트 관련 코드
document.addEventListener('DOMContentLoaded', function() {
    function getLastSixDays() {
        const labels = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            labels.push(`${month}-${day}`);
        }
        return labels;
    }

    const ctx = document.getElementById('accessLogChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: getLastSixDays(),
            datasets: [{
                label: '일별 출입자 수',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }]
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