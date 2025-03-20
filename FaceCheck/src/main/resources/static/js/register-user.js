document.addEventListener("DOMContentLoaded", function() {
    // Camera elements
    const video = document.getElementById("camera-feed");
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.getElementById("next-button");
    const imageContainer = document.getElementById("image-container");
    const submitButton = document.getElementById("submit-btn");
    
    // Variables for capturing
    const maxCaptures = 5;
    let capturedImages = [];
    let stream = null;

    // Initialize camera
    async function initCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "user" }
            });
            video.srcObject = stream;
        } catch (err) {
            console.error("카메라 접근 오류:", err);
            alert("카메라 접근에 실패했습니다. 권한을 확인해주세요.");
        }
    }

    // Initialize camera on page load
    initCamera();

    // Capture button event
    captureButton.addEventListener("click", function() {
        if (capturedImages.length >= maxCaptures) {
            alert("이미 5장의 사진을 촬영했습니다!");
            return;
        }

        // Draw video to canvas and get image data
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/png");
        capturedImages.push(imageData);

        // Create and display the captured image
        const imgElement = document.createElement("img");
        imgElement.src = imageData;
        imgElement.className = "captured-image";
        imageContainer.appendChild(imgElement);

        // Show next button after capturing all images
        if (capturedImages.length === maxCaptures) {
            nextButton.style.display = "block";
        }
    });

    // ✅ "다음" 버튼 클릭 시, 사용자 정보 입력 창 표시
    nextButton.addEventListener("click", function() {
        const registerSection = document.querySelector(".register-section");
        registerSection.style.display = "flex"; // "block"이 아닌 "flex"로 변경
        nextButton.style.display = "none";
        
        // 카메라 섹션 숨기기 (선택적)
        document.querySelector(".main-content").style.display = "none";
        
        // Important: Stop the camera stream to free resources
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Re-initialize header styling if needed
        if (typeof initHeader === 'function') {
            initHeader(); // Call header initialization function if it exists
        }
        
        // Update the preview image with the first captured photo
        if (capturedImages.length > 0) {
            document.getElementById("preview-image").src = capturedImages[0];
        }
    });

    // File upload handling
    const imageUpload = document.getElementById("image-upload");
    imageUpload.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("preview-image").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // ✅ "등록" 버튼 클릭 시, 데이터 서버 전송
    submitButton.addEventListener("click", function() {
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

        // ✅ Base64 → Blob 변환 후 FormData에 추가
        capturedImages.forEach((base64, index) => {
            const byteString = atob(base64.split(",")[1]);
            const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
            const arrayBuffer = new Uint8Array(byteString.length);

            for (let i = 0; i < byteString.length; i++) {
                arrayBuffer[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([arrayBuffer], { type: mimeString });
            const empId = document.getElementById("id").value;
            formData.append("emp_face_imgs", new File([blob], `${empId}_${index + 1}.png`));
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


// In header.js
function initHeader() {
  // Your header initialization code here
  // This should include any sidebar initialization
}

// Call on page load
document.addEventListener("DOMContentLoaded", initHeader);

// Make the function available globally
window.initHeader = initHeader;