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



let socket;
function connectWebSocket() {
    socket = new WebSocket("ws://localhost:8083/FaceCheck/ws/alert");

    socket.onopen = function() {
        console.log("✅ WebSocket 연결 성공!");
    };

    socket.onmessage = function(event) {
        console.log("📩 서버로부터 메시지:", event.data);
        document.getElementById("modalMessage").innerText = event.data;
        document.querySelector(".cont_principal").style.display = "block";
        document.querySelector(".cont_modal").style.display = "block";
    };

    socket.onerror = function(error) {
        console.error("❌ WebSocket 오류 발생:", error);
    };

    socket.onclose = function() {
        console.log("❌ WebSocket 연결 종료. 3초 후 재연결 시도...");
        setTimeout(connectWebSocket, 3000);
    };
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("closeModal").addEventListener("click", function() {
        document.querySelector(".cont_principal").style.display = "none";
        document.querySelector(".cont_modal").style.display = "none";
    });
});

connectWebSocket();