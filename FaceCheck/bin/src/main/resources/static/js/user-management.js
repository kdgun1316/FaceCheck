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











function deleteUser(emp_num) {
    fetch(`/deleteUser${emp_num}`, {   // Spring Controller의 URL 경로와 일치하는지 확인
        method: 'DELETE',  // HTTP DELETE 요청
    })
    .then(response => {
        if (response.ok) {
            alert("삭제되었습니다.");
            // 삭제 후 페이지 갱신 등 추가 작업
        } else {
            alert("삭제 실패");
        }
    })
    .catch(error => {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제 중 오류가 발생했습니다.");
    });
}











