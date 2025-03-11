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

document.addEventListener("DOMContentLoaded", async function () {
    const video = document.getElementById("camera-feed");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.getElementById("next-button"); // 폼 제출 버튼
    const canvas = document.getElementById("canvas");
    const imageContainer = document.getElementById("image-container"); // HTML에서 가져옴
    const imageForm = document.getElementById("image-form"); // 폼 요소
    const capturedImagesInput = document.getElementById("capturedImagesInput"); // 숨겨진 input
    const previewImage = document.getElementById('preview-image'); // 프로필 이미지 미리보기

    let captureCount = 0;
    const maxCaptures = 3;
    let capturedImages = []; // 촬영된 이미지 저장 배열

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("카메라를 활성화할 수 없습니다:", err);
    }

    captureButton.addEventListener("click", function() {
        if (captureCount < maxCaptures) {
            captureImage();
            captureCount++;

            if (captureCount >= maxCaptures) {
                captureButton.style.display = "none"; // 촬영 버튼 숨김
                nextButton.style.display = "block"; // '다음' 버튼 표시
                video.style.display = "none";
            }
        }
    });

    function captureImage() {
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png"); // Base64 이미지 데이터
        capturedImages.push(imageData); // 배열에 저장

        // 첫 번째 촬영된 이미지를 미리보기 이미지로 설정
        if (capturedImages.length === 1) {
            previewImage.src = imageData; // 첫 번째 이미지를 미리보기 영역에 설정
        }

        // 새로운 이미지 태그 생성 (미리보기 용)
        const imgElement = document.createElement("img");
        imgElement.src = imageData;
        imageContainer.appendChild(imgElement);

        console.log("Captured Images:", capturedImages);
    }

    // 📌 '다음' 버튼 클릭 시 촬영한 이미지 데이터를 폼에 추가 후 제출
    nextButton.addEventListener("click", function() {
        capturedImagesInput.value = JSON.stringify(capturedImages); // JSON 형태로 변환하여 hidden input에 저장
        imageForm.submit(); // 폼 제출 (POST 요청)
    });
});
