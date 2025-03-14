document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('accessLogChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // 막대 그래프로 유지
        data: {
            labels: ['03-21', '03-22', '03-23', '03-24', '03-25', '03-26'], // 날짜 레이블 유지
            datasets: [{
                label: '일별 출입자 수', // 성공한 출입자 수로 레이블 변경
                data: [12, 19, 3, 5, 2, 3], // 성공 데이터만 사용
                backgroundColor: '#4CAF50', // 막대 색상 (초록색)
                borderColor: '#4CAF50', // 막대 테두리 색상
                borderWidth: 1, // 테두리 두께
                barPercentage: 0.8, // 막대 너비 조정
                categoryPercentage: 0.8 // 카테고리 간 간격 조정
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true, // 범례 표시
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
                        stepSize: 2 // Y축 간격
                    },
                    suggestedMax: 20 // Y축 최대값 제안
                },
                x: {
                    title: {
                        display: true,
                        text: '날짜' // X축 제목 유지
                    }
                }
            }
        }
    });


    // 알림 닫기 버튼 이벤트
    document.querySelectorAll('.notice-close').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const item = this.closest('.notice-item');
            item.style.display = 'none';
        });
    });
});