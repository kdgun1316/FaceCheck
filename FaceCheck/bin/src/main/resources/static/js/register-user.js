// 년도 옵션 자동 생성
const birthYearSelect = document.getElementById('birth-year');
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 1950; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    birthYearSelect.appendChild(option);
}

// 월 옵션 자동 생성
const birthMonthSelect = document.getElementById('birth-month');
for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    birthMonthSelect.appendChild(option);
}

// 일 옵션 자동 생성 (기본적으로 31일까지 설정)
const birthDaySelect = document.getElementById('birth-day');
for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    birthDaySelect.appendChild(option);
}

// 월 선택에 따라 일 수 조정 (예: 2월은 28일 또는 29일)
birthMonthSelect.addEventListener('change', function() {
    const selectedYear = birthYearSelect.value;
    const selectedMonth = birthMonthSelect.value;
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    // 기존 일 옵션 제거
    birthDaySelect.innerHTML = '<option value="">일 선택</option>';

    // 새로운 일 옵션 추가
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        birthDaySelect.appendChild(option);
    }
});

// 년도 선택 시 월 선택에 따라 일 수 조정
birthYearSelect.addEventListener('change', function() {
    const selectedYear = birthYearSelect.value;
    const selectedMonth = birthMonthSelect.value;
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    // 기존 일 옵션 제거
    birthDaySelect.innerHTML = '<option value="">일 선택</option>';

    // 새로운 일 옵션 추가
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        birthDaySelect.appendChild(option);
    }
});

// 파일 선택 시 이미지 미리보기
document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0]; // 선택된 파일
    const reader = new FileReader(); // 파일 리더 객체 생성

    // 파일 읽기 완료 시 실행
    reader.onload = function(e) {
        const previewImage = document.getElementById('preview-image');
        previewImage.src = e.target.result; // 이미지 소스 업데이트
    };

    // 파일 읽기
    if (file) {
        reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
});