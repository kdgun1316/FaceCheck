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