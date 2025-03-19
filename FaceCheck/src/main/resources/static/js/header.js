document.addEventListener('DOMContentLoaded', function() {
  // 드롭다운 토글 기능
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.dropdown-wrapper');
      parent.classList.toggle('active');
    });
  }
  
  // 현재 페이지 메뉴 아이템 활성화
  const currentPath = window.location.pathname;
  const menuItems = document.querySelectorAll('.menu__item');
  
  menuItems.forEach(item => {
    if (item.getAttribute('href') && currentPath.includes(item.getAttribute('href'))) {
      item.classList.add('menu__item--active');
    }
  });
  
  // 하위 메뉴 항목이 현재 경로와 일치하면 드롭다운을 열어둠
  const submenuLinks = document.querySelectorAll('.dropdown-content a');
  
  submenuLinks.forEach(link => {
    if (currentPath.includes(link.getAttribute('href'))) {
      link.closest('.dropdown-wrapper').classList.add('active');
    }
  });
});


console.log("Header.js 로딩됨");
try {
  // header.js 코드
  console.log("Header.js 실행 완료");
} catch (e) {
  console.error("Header.js 오류:", e);
}

let successSocket;
function connectSuccessWebSocket() {
    successSocket = new WebSocket("ws://localhost:8083/FaceCheck/ws/success");

    successSocket.onopen = function() {
        console.log("✅ WebSocket(성공 메시지) 연결 성공!");
    };

    successSocket.onmessage = function(event) {
        console.log("📩 [성공 메시지 수신] 서버로부터 메시지:", event.data);
        
        // ✅ 성공 메시지를 화면 구석에 표시하는 함수 호출
        showSuccessMessage(event.data);
    };

    successSocket.onerror = function(error) {
        console.error("❌ WebSocket(성공 메시지) 오류 발생:", error);
    };

    successSocket.onclose = function() {
        console.log("❌ WebSocket(성공 메시지) 연결 종료. 3초 후 재연결 시도...");
        setTimeout(connectSuccessWebSocket, 3000);
    };
}

// ✅ 실패 WebSocket 실행
let alertSocket;
function connectAlertWebSocket() {
    alertSocket = new WebSocket("ws://localhost:8083/FaceCheck/ws/alert");

    alertSocket.onopen = function() {
        console.log("✅ WebSocket(실패 메시지) 연결 성공!");
    };

    alertSocket.onmessage = function(event) {
        console.log("📩 [실패 메시지 수신] 서버로부터 메시지:", event.data);

        // ✅ 실패 메시지를 모달창으로 표시
        document.getElementById("modalMessage").innerText = event.data;
        document.querySelector(".cont_principal").style.display = "block";
        document.querySelector(".cont_modal").style.display = "block";

        // ✅ 추가 (실패한 경우에도 실시간 알림창에 추가)
        addNewNotice("실패 🚨: " + event.data);
    };

    alertSocket.onerror = function(error) {
        console.error("❌ WebSocket(실패 메시지) 오류 발생:", error);
    };

    alertSocket.onclose = function() {
        console.log("❌ WebSocket(실패 메시지) 연결 종료. 3초 후 재연결 시도...");
        setTimeout(connectAlertWebSocket, 3000);
    };
}
// 실패 WebSocket
let socket;
function connectAlertWebSocket() {
    alertSocket = new WebSocket("ws://localhost:8083/FaceCheck/ws/alert");

    alertSocket.onopen = function() {
        console.log("✅ WebSocket(실패 메시지) 연결 성공!");
    };

    alertSocket.onmessage = function(event) {
        console.log("📩 [실패 메시지 수신]:", event.data);

        // 실패 메시지 모달창에 표시
        document.getElementById("modalMessage").innerText = event.data;
        document.querySelector(".cont_principal").style.display = "block";
        document.querySelector(".cont_modal").style.display = "block";

        // 실시간 알림창에도 추가
        addNewNotice("실패 🚨: " + event.data);
    };

    alertSocket.onerror = function(error) {
        console.error("❌ WebSocket(실패 메시지) 오류:", error);
    };

    alertSocket.onclose = function() {
        console.log("❌ WebSocket(실패 메시지) 연결 종료. 재연결 시도...");
        setTimeout(connectAlertWebSocket, 3000);
    };
}

// 성공 WebSocket
let Socket;
function connectSuccessWebSocket() {
    successSocket = new WebSocket("ws://localhost:8083/FaceCheck/ws/success");

    successSocket.onopen = function() {
        console.log("✅ WebSocket(성공 메시지) 연결 성공!");
    };

    successSocket.onmessage = function(event) {
        console.log("📩 [성공 메시지 수신]:", event.data);

        // 성공 메시지를 화면 구석에 표시하는 함수 호출
        showSuccessMessage(event.data);

        // 실시간 알림창에도 추가
        addNewNotice("성공 ✅: " + event.data);
    };

    successSocket.onerror = function(error) {
        console.error("❌ WebSocket(성공 메시지) 오류:", error);
    };

    successSocket.onclose = function() {
        console.log("❌ WebSocket(성공 메시지) 연결 종료. 재연결 시도...");
        setTimeout(connectSuccessWebSocket, 3000);
    };
}

// 성공 메시지를 화면 구석에 표시하는 함수
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

// 실시간 알림 추가 함수
function addNewNotice(message) {
    const noticeList = document.querySelector(".notice-list");
    if (!noticeList) {
        console.error("❌ notice-list 클래스를 가진 요소가 없습니다!");
        return;
    }

    const noticeItem = document.createElement("div");
    noticeItem.className = "notice-item";

    const now = new Date();
    const formattedDate = now.getFullYear() + "-" + 
                          String(now.getMonth()+1).padStart(2,'0') + "-" + 
                          String(now.getDate()).padStart(2,'0') + " " + 
                          String(now.getHours()).padStart(2,'0') + ":" + 
                          String(now.getMinutes()).padStart(2,'0') + ":" + 
                          String(now.getSeconds()).padStart(2,'0');

    noticeItem.innerHTML = `
        <div class="notice-profile">
            <img src="images/face_recognition.jpg" alt="얼굴인식">
        </div>
        <div class="notice-content">
            <div class="notice-text">${message}</div>
            <div class="notice-date">${formattedDate}</div>
        </div>
        <div class="notice-status">
            <button class="notice-close" onclick="this.parentElement.parentElement.remove();">닫기</button>
        </div>
    `;

    noticeList.prepend(noticeItem);
}

// 웹소켓 및 이벤트 등록
document.addEventListener("DOMContentLoaded", function() {
    connectAlertWebSocket();   // 실패 WebSocket 실행
    connectSuccessWebSocket(); // 성공 WebSocket 실행

    // 모달 닫기 버튼
    const closeModalBtn = document.getElementById("closeModal");
    if(closeModalBtn) {
        closeModalBtn.addEventListener("click", function() {
            document.querySelector(".cont_principal").style.display = "none";
            document.querySelector(".cont_modal").style.display = "none";
        });
    } else {
        console.error("❌ closeModal 버튼이 존재하지 않습니다!");
    }
});
