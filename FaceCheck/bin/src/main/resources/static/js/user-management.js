function toggleDropdown(element) {
    let dropdownMenu = element.nextElementSibling;
    let allDropdowns = document.querySelectorAll(".dropdown-menu");

    // 다른 드롭다운 닫기
    allDropdowns.forEach(menu => {
        if (menu !== dropdownMenu) {
            menu.style.display = "none";
        }
    });

    // 현재 드롭다운 토글
    dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}

// 수정 기능 (예제)
function editUser() {
    alert("수정 페이지로 이동합니다.");
}

// 삭제 기능 (예제)
function deleteUser() {
    alert("삭제되었습니다.");
}

// 클릭하면 드롭다운 닫기
document.addEventListener("click", function(event) {
    if (!event.target.matches(".dots")) {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.style.display = "none";
        });
    }
});