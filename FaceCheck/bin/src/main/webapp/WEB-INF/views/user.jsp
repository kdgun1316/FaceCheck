<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>얼굴 인식</title>
<link rel="stylesheet" href="css/user.css" />
</head>
<body>
    <main class="content">
        <header class="topbar">
            <a href="main" class="logo"><img
                src="${pageContext.request.contextPath}/images/logo.jpg" alt="로고"></a>
            <div class="icons">
                <input type="text" placeholder="Search"> <span
                    class="notification-icon">🔔</span>
                <div class="user-icon-container">
                    <span class="user-icon">👤</span>
                    <div class="dropdown-menu1">
                        <a href="login"><span>🚪</span> 로그아웃</a>
                    </div>
                </div>
            </div>
        </header>
        <!-- Main content goes here -->
    </main>
    <section>
        <div class="circle1"></div>
        <video id="video" autoplay></video>
        <div class="circle2"></div>
        <h2>얼굴을 인식 중...</h2>
        <div class="recording">REC</div> <!-- ✅ "REC" 표시 -->
        <div class="countdown" id="countdown">5</div> <!-- ✅ 촬영 카운트다운 -->
    </section>


<!-- 이 HTML 부분은 body 제일 아래쪽에 추가해줘 -->
<div id="centerMessage" style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 18px;
    display: none;
    z-index: 2000;">
</div>



	<script>
    
        const video = document.getElementById("video");

        // ✅ 웹캠 실행
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { video.srcObject = stream; })
            .catch(err => { console.error("카메라 접근 실패:", err); });

        let capturedImages = []; // 5장의 이미지 저장
        let captureCount = 0; // 현재 촬영한 이미지 수

        function captureImage() {
            if (captureCount < 5) {  // 5장까지만 촬영
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/jpeg"); // 🔥 Base64로 변환
                capturedImages.push(imageData);
                captureCount++;

                console.log(`✅ ${captureCount}번째 이미지 촬영 완료`);

                if (captureCount === 5) {
                    sendImagesToServer(); // 5장 촬영 완료되면 서버로 전송
                }
            }
        }

        function showCenterMessage(message, success = true) {
            const msg = document.getElementById("centerMessage");
            msg.innerText = message;
            msg.style.background = success ? "rgba(76,175,80,0.9)" : "rgba(244,67,54,0.9)";
            msg.style.display = "block";
            msg.style.opacity = 1;

            setTimeout(() => {
                msg.style.transition = "opacity 0.5s ease";
                msg.style.opacity = 0;
            }, 2000);

            setTimeout(() => {
                msg.style.display = "none";
            }, 2500);
        }

        function sendImagesToServer() {
            const formData = new FormData();

            capturedImages.forEach((base64, index) => {
                const byteString = atob(base64.split(",")[1]);
                const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
                const arrayBuffer = new Uint8Array(byteString.length);

                for (let i = 0; i < byteString.length; i++) {
                    arrayBuffer[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([arrayBuffer], { type: mimeString });
                formData.append("face_imgs", new File([blob], `face_${index + 1}.png`));
            });

            fetch("user", {
                method: "POST",
                body: formData,
            })
            .then((res) => {
                if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`);
                return res.json();
            })
            .then((result) => {
                if (result.success) {
                    showCenterMessage("✅ 인증 성공!", true);
                    console.log("✅ 서버 응답:", result);
                } else {
                    showCenterMessage("❌ 인식 실패, 다시 시도해주세요.", false);
                }
            })
            .catch((err) => {
                console.error("❌ 서버 전송 오류:", err);
                showCenterMessage("⚠️ 서버 오류가 발생했습니다.", false);
            });
        }


        // ✅ 1초마다 한 장씩, 총 5장 촬영
        let interval = setInterval(() => {
            captureImage();
            if (captureCount >= 5) {
                clearInterval(interval); // 5장 촬영 후 중지
                console.log("✅ 5장 촬영 완료, 전송 준비...");
            }
        }, 1000); // 1초마다 촬영
    </script>
    
    
    
    
    
</body>
</html>
