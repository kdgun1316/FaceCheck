document.addEventListener("DOMContentLoaded", async function () {
    const video = document.getElementById("camera-feed");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.createElement("button"); // '다음' 버튼 생성
    const canvas = document.getElementById("canvas");

    // 📌 캡처된 이미지를 표시할 컨테이너 가져오기
    const imageContainer = document.createElement("div");
    imageContainer.id = "image-container";
    document.querySelector(".main-content").appendChild(imageContainer);

    let captureCount = 0;
    const maxCaptures = 3;
    let capturedImages = []; // 촬영된 이미지 저장 배열

    // '다음' 버튼 설정
    nextButton.textContent = "다음";
    nextButton.id = "next-button";
    document.querySelector(".main-content").appendChild(nextButton);

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
            }
        }
    });

    function captureImage() {
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        capturedImages.push(imageData); // 배열에 저장

        // 새로운 이미지 태그 생성
        const imgElement = document.createElement("img");
        imgElement.src = imageData;
        imageContainer.appendChild(imgElement);

        console.log("Captured Images:", capturedImages);
    }
});


 document.addEventListener("DOMContentLoaded", function () {
const menuItems = document.querySelectorAll(".sidebar ul li a");

menuItems.forEach((item) => {
item.addEventListener("click", function () {
    // 클릭한 메뉴 항목에 active-hover 클래스를 토글
    item.classList.toggle("active-hover");
});
});

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
const toggle = dropdown.querySelector(".toggle");
const arrow = toggle.querySelector(".arrow");

toggle.addEventListener("click", function (event) {
    event.preventDefault();
    
    dropdown.classList.toggle("active");

    // 화살표 보이기/숨기기
    if (dropdown.classList.contains("active")) {
        arrow.style.display = "inline";
    } else {
        arrow.style.display = "none";
    }
});
});
});
