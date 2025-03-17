document.addEventListener("DOMContentLoaded", async function () {
    const video = document.getElementById("camera-feed");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-btn");
    const canvas = document.getElementById("canvas");
    const imageContainer = document.getElementById("image-container");
    const previewImage = document.getElementById("preview-image");

    const maxCaptures = 5;
    let capturedImages = [];

    // ✅ 카메라 활성화
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert("카메라를 활성화할 수 없습니다!");
        console.error("카메라 오류:", err);
    }

    // ✅ 촬영 버튼 클릭 시 최대 5장까지 저장
    captureButton.addEventListener("click", function () {
        if (capturedImages.length < maxCaptures) {
            captureImage();

            if (capturedImages.length === maxCaptures) {
                captureButton.style.display = "none";
                nextButton.style.display = "block";
                video.style.display = "none";
            }
        }
        console.log(`현재까지 촬영된 이미지 수: ${capturedImages.length}`);
    });

    // ✅ 이미지 캡처 및 저장
    function captureImage() {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png"); // 🔥 Base64 변환
        capturedImages.push(imageData);

        // 첫 번째 이미지를 미리보기로 설정
        if (capturedImages.length === 1) {
            previewImage.src = imageData;
        }

        // 이미지 미리보기 추가
        const imgElement = document.createElement("img");
        imgElement.src = imageData;
        imageContainer.appendChild(imgElement);
    }

// ✅ "다음" 버튼 클릭 시, 사용자 정보 입력 창 표시
nextButton.addEventListener("click", function () {
    const registerSection = document.querySelector(".register-section");
    registerSection.style.display = "flex"; // "block"이 아닌 "flex"로 변경
    nextButton.style.display = "none";
    
    // 카메라 섹션 숨기기 (선택적)
    document.querySelector(".main-content").style.display = "none";
});

    // ✅ "등록" 버튼 클릭 시, 데이터 서버 전송
    submitButton.addEventListener("click", function () {
        if (capturedImages.length !== maxCaptures) {
            alert("5장의 사진을 모두 촬영해야 합니다!");
            return;
        }

        const formData = new FormData();
        formData.append("emp_name", document.getElementById("name").value);
        formData.append("emp_num", document.getElementById("id").value);
        formData.append("dept", document.getElementById("gender").value); 
        formData.append("emp_birthdate", document.querySelector("[name='emp_birthdate']").value);
        formData.append("emp_phone", document.getElementById("phone").value);

        // ✅ Base64 → Blob 변환 후 `FormData`에 추가
        capturedImages.forEach((base64, index) => {
            const byteString = atob(base64.split(",")[1]);
            const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
            const arrayBuffer = new Uint8Array(byteString.length);

            for (let i = 0; i < byteString.length; i++) {
                arrayBuffer[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([arrayBuffer], { type: mimeString });
            formData.append("emp_face_imgs", new File([blob], `${document.getElementById("id").value}_${index + 1}.png`));
        });

        fetch("/FaceCheck/register-user", {
            method: "POST",
            body: formData,
        })
        .then((res) => {
            if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`);
            return res.json();
        })
        .then((result) => {
            if (result.success) {
                alert("등록 성공!");
                location.href = "/FaceCheck/user-management"; 
            } else {
                alert("등록 실패!");
            }
        })
        .catch((err) => {
            console.error("서버 전송 오류:", err);
            alert("서버 오류 발생");
        });
    });
});
