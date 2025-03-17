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

        function sendImagesToServer() {
            const formData = new FormData();

            // ✅ Base64 → Blob 변환 후 `FormData`에 추가
            capturedImages.forEach((base64, index) => {
                const byteString = atob(base64.split(",")[1]);
                const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
                const arrayBuffer = new Uint8Array(byteString.length);

                for (let i = 0; i < byteString.length; i++) {
                    arrayBuffer[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([arrayBuffer], { type: mimeString });
                formData.append("face_imgs", new File([blob], `face_${index + 1}.png`));  // ✅ `face_imgs`로 설정
            });

            console.log("✅ 서버로 전송할 데이터:", formData);  // 콘솔에서 데이터 확인

            fetch("user", {  // ✅ 사용자 전용 URL로 요청 보내기
                method: "POST",
                body: formData,
            })
            .then((res) => {
                if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`);
                return res.json();
            })
            .then((result) => {
                if (result.success) {
                    alert("인식 성공!");
                    console.log("✅ 서버 응답:", result);
                } else {
                    alert("인식 실패!");
                }
            })
            .catch((err) => {
                console.error("❌ 서버 전송 오류:", err);
                alert("서버 오류 발생");
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
