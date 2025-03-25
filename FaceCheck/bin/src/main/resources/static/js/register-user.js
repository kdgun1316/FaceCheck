document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("camera-feed");
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-btn");
    const maxCaptures = 30;
    let capturedImages = [];
    let stream = null;

    // 카메라 초기화
    async function initCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }});
            video.srcObject = stream;
        } catch (err) {
            console.error("카메라 접근 오류:", err);
            alert("카메라 접근 실패! 권한을 확인해주세요.");
        }
    }
    initCamera();

    // 촬영 버튼 클릭 이벤트
    captureButton.addEventListener("click", function() {
        if (capturedImages.length >= maxCaptures) {
            alert("이미 30장 촬영 완료!");
            return;
        }

        let captureCount = 0;
        captureButton.disabled = true;

        // 촬영중 메시지 표시
        const capturingMessage = document.getElementById("capturing-message");
        capturingMessage.style.display = "block";

        const captureInterval = setInterval(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            const imageData = canvas.toDataURL("image/png");
            capturedImages.push(imageData);

            captureCount++;

            if (captureCount >= maxCaptures) {
                clearInterval(captureInterval);
                nextButton.style.display = "block";
                captureButton.disabled = false;

                // 촬영 완료 시 메시지 숨기기
                capturingMessage.style.display = "none";
                captureButton.style.display = "none";
            }
        }, 100); // 0.1초 간격으로 빠르게 촬영
    });

    // 다음 버튼 클릭 시 이벤트 처리
    nextButton.addEventListener("click", function() {
        document.querySelector(".register-section").style.display = "flex";
        nextButton.style.display = "none";
        document.querySelector(".main-content").style.display = "none";
        if (stream) stream.getTracks().forEach(track => track.stop());
        if (typeof initHeader === 'function') initHeader();
        if (capturedImages.length > 0) {
            document.getElementById("preview-image").src = capturedImages[0];
        }
    });

    // 이미지 업로드 처리
    const imageUpload = document.getElementById("image-upload");
    imageUpload.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => document.getElementById("preview-image").src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    // 등록 버튼 클릭 이벤트 (서버로 데이터 전송)
    submitButton.addEventListener("click", function() {
        if (capturedImages.length !== maxCaptures) {
            alert("30장 촬영이 완료되지 않았습니다!");
            return;
        }

        const formData = new FormData();
        formData.append("emp_name", document.getElementById("name").value);
        formData.append("emp_num", document.getElementById("id").value);
        formData.append("dept", document.getElementById("gender").value); 
        formData.append("emp_birthdate", document.querySelector("[name='emp_birthdate']").value);
        formData.append("emp_phone", document.getElementById("phone").value);

        capturedImages.forEach((base64, index) => {
            const byteString = atob(base64.split(",")[1]);
            const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
            const arrayBuffer = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) arrayBuffer[i] = byteString.charCodeAt(i);
            const blob = new Blob([arrayBuffer], { type: mimeString });
            const empId = document.getElementById("id").value;
            formData.append("emp_face_imgs", new File([blob], `${empId}_${index + 1}.png`));
        });

        fetch("/FaceCheck/register-user", {
            method: "POST",
            body: formData,
        })
        .then(res => {
            if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`);
            return res.json();
        })
        .then(result => {
            if (result.success) {
                alert("등록 성공!");
                location.href = "/FaceCheck/user-management"; 
            } else alert("등록 실패!");
        })
        .catch(err => {
            console.error("서버 전송 오류:", err);
            alert("서버 오류 발생");
        });
    });
});

// 헤더 초기화
function initHeader() {
    // 헤더 초기화 코드
}
document.addEventListener("DOMContentLoaded", initHeader);
window.initHeader = initHeader;
