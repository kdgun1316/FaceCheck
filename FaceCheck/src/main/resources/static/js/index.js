document.addEventListener("DOMContentLoaded", async function () {
    const video = document.getElementById("camera-feed");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.getElementById("next-button"); // 폼 제출 버튼
    const canvas = document.getElementById("canvas");
    const imageContainer = document.getElementById("image-container"); // HTML에서 가져옴
    const imageForm = document.getElementById("image-form"); // 폼 요소
    const capturedImagesInput = document.getElementById("capturedImagesInput"); // 숨겨진 input

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

        // 새로운 이미지 태그 생성 (미리보기 용)
        const imgElement = document.createElement("img");
        imgElement.src = imageData;

        // 📌 이미지가 카메라 위에 표시되도록 prepend 사용
        imageContainer.prepend(imgElement);

        console.log("Captured Images:", capturedImages);
    }

    // 📌 '다음' 버튼 클릭 시 촬영한 이미지 데이터를 폼에 추가 후 제출
    nextButton.addEventListener("click", function() {
        capturedImagesInput.value = JSON.stringify(capturedImages); // JSON 형태로 변환하여 hidden input에 저장
        imageForm.submit(); // 폼 제출 (POST 요청)
    });
});

