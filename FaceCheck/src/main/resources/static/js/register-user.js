


document.addEventListener("DOMContentLoaded", async function () {
    const video = document.getElementById("camera-feed");
    const captureButton = document.getElementById("capture-button");
    const nextButton = document.getElementById("next-button"); // 폼 제출 버튼
    const canvas = document.getElementById("canvas");
    const imageContainer = document.getElementById("image-container"); // HTML에서 가져옴
    const imageForm = document.getElementById("image-form"); // 폼 요소
    const capturedImagesInput = document.getElementById("capturedImageInput"); // 숨겨진 input
    const previewImage = document.getElementById('preview-image'); // 프로필 이미지 미리보기

    let captureCount = 0;
    const maxCaptures = 1;
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
          } else{
                captureButton.style.display = "none"; // 촬영 버튼 숨김
                nextButton.style.display = "block"; // '다음' 버튼 표시
                video.style.display = "none";
            }
        console.log("이미지 데이터:", capturedImages);
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

    }




    // 버튼 클릭 시 촬영한 이미지 데이터를 폼에 추가 후 제출
    nextButton.addEventListener("click", function() {
       // 동건씨가 작성해야할 코드
       // 1. capturedImages 배열 안에 들어있는 base64형태의 이미지파일을 images 폴더 안에 저장 (5개 데이터 들어가기) 
       
       // 2. 저장이 무사히 되었을 때, true 값을 capturedImageInput 태그에 value로 부여 
              
       // 3. (될 수도 있고 안될수도 있음) base64형태의 이미지파일 5장을 바로 flask send(fetch == ajax 사용해서)
       // --> flask에서 base64 형태의 이미지가 잘 들어오는 지 check 
       
       // 4. flask에서 true 값을 보내주면(동건씨가 check) vector값을 emp_face_img에 매칭시킨다 생각하고 데이터베이스에 저장하는 흐름 
       
       // capturedImagesInput.value = JSON.stringify(capturedImages);
       // imageForm.submit(); // 폼 제출 (POST 요청)
    });
});