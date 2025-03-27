document.addEventListener("DOMContentLoaded", function () {
    connectAlertWebSocket();   // 실패 WebSocket 실행
    connectSuccessWebSocket(); // 성공 WebSocket 실행

    const dropdownToggle = document.querySelector(".dropdown-toggle");

    if (dropdownToggle) {
        dropdownToggle.addEventListener("click", function (e) {
            e.preventDefault();
            const parent = this.closest(".dropdown-wrapper");
            parent.classList.toggle("active");
        });
    }

    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll(".menu__item");

    menuItems.forEach((item) => {
        if (item.getAttribute("href") && currentPath.includes(item.getAttribute("href"))) {
            item.classList.add("menu__item--active");
        }
    });

    const submenuLinks = document.querySelectorAll(".dropdown-content a");
    submenuLinks.forEach((link) => {
        if (currentPath.includes(link.getAttribute("href"))) {
            link.closest(".dropdown-wrapper").classList.add("active");
        }
    });

    const closeModalBtn = document.getElementById("closeModal");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function () {
            document.querySelector(".cont_principal").style.display = "none";
            document.querySelector(".cont_modal").style.display = "none";
        });
    } else {
        console.error("❌ closeModal 버튼이 존재하지 않습니다!");
    }
});

let successSocket;
let alertSocket;

function connectSuccessWebSocket() {
    successSocket = new WebSocket("ws://localhost:8083/FaceCheck/ws/success");

    successSocket.onopen = function () {
        console.log("✅ WebSocket(성공 메시지) 연결 성공!");
    };

    successSocket.onmessage = function (event) {
        console.log("📩 [성공 메시지 수신] 서버로부터 메시지:", event.data);
        const data = JSON.parse(event.data);

        // ✅ 화면 우측 하단 초록 메시지
        showSuccessMessage(data.message);

        // ✅ 실시간 알림창에 추가
        addNewNotice(
            `<span style="color:blue">${data.message}</span>`,
            data.log_idx,
            data.image_url,
            data.base64Image
        );
    };

    successSocket.onerror = function (error) {
        console.error("❌ WebSocket(성공 메시지) 오류 발생:", error);
    };

    successSocket.onclose = function () {
        console.log("❌ WebSocket(성공 메시지) 종료됨. 재연결 시도 중...");
        setTimeout(connectSuccessWebSocket, 3000);
    };
}

function connectAlertWebSocket() {
    alertSocket = new WebSocket("ws://localhost:8083/FaceCheck/ws/alert");

    alertSocket.onopen = function () {
        console.log("✅ WebSocket(실패 메시지) 연결 성공!");
    };

    alertSocket.onmessage = function (event) {
        console.log("📩 [실패 메시지 수신] 서버로부터 메시지:", event.data);
        const data = JSON.parse(event.data);

        // ❗️모달에 실패 메시지 표시
        document.getElementById("modalMessage").innerText = data.message;
        document.querySelector(".cont_principal").style.display = "block";
        document.querySelector(".cont_modal").style.display = "block";

        // ❗️실시간 알림창에 추가
        addNewNotice(
            `<span style="color:red">${data.message}</span>`,
            data.log_idx,
            data.image_url,
            data.base64Image
        );
    };

    alertSocket.onerror = function (error) {
        console.error("❌ WebSocket(실패 메시지) 오류 발생:", error);
    };

    alertSocket.onclose = function () {
        console.log("❌ WebSocket(실패 메시지) 종료됨. 재연결 시도 중...");
        setTimeout(connectAlertWebSocket, 3000);
    };
}

function showSuccessMessage(message) {
    let successDiv = document.getElementById("successMessage");

    if (!successDiv) {
        successDiv = document.createElement("div");
        successDiv.id = "successMessage";
        successDiv.style.position = "fixed";
        successDiv.style.bottom = "20px";
        successDiv.style.right = "20px";
        successDiv.style.background = "rgba(0, 255, 0, 0.8)";
        successDiv.style.color = "white";
        successDiv.style.padding = "10px 20px";
        successDiv.style.borderRadius = "5px";
        successDiv.style.fontSize = "16px";
        successDiv.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        document.body.appendChild(successDiv);
    }

    successDiv.innerText = message;
    successDiv.style.display = "block";

    setTimeout(() => {
        successDiv.style.display = "none";
    }, 3000);
}

function addNewNotice(message, logIdx, imageUrl, base64Image) {
    const noticeList = document.querySelector(".notice-list");
    if (!noticeList) return;

    const noticeItem = document.createElement("div");
    noticeItem.className = "notice-item";

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const imageSrc = base64Image
        ? `data:image/jpeg;base64,${base64Image}`
        : (imageUrl || 'images/face_recognition.jpg');

    // ✅ 성공/실패 구분해서 색상 적용
    const color = message.includes("성공") ? "blue" : "red";

    noticeItem.innerHTML = `
        <div class="notice-profile">
            <img src="${imageSrc}" alt="얼굴인식" width="80" height="80">
        </div>
        <div class="notice-content">
            <div class="notice-text" style="color:${color}">${message}</div>
            <div class="notice-date">${formattedDate}</div>
        </div>
        <div class="notice-status">
            <button class="notice-close">삭제</button>
        </div>
    `;

    noticeItem.querySelector('.notice-close').addEventListener('click', function () {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        fetch('/FaceCheck/deleteLog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'log_idx=' + logIdx
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                alert('삭제되었습니다.');
                noticeItem.remove();
            } else {
                alert('삭제 실패.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('에러가 발생했습니다.');
        });
    });

    noticeList.prepend(noticeItem);
}


// 🔥 함수 바깥에 선언해줘야 함
function deleteLog(btn, log_idx) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    fetch('/FaceCheck/deleteLog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'log_idx=' + log_idx
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            alert('삭제되었습니다.');
            btn.closest('.notice-item').remove();
        } else {
            alert('삭제 실패.');
        }
    })
    .catch(err => {
        console.error(err);
        alert('에러가 발생했습니다.');
    });
}


console.log("✅ Header.js 전체 로딩 완료");
