       document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".sidebar ul li a");

    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            // 클릭한 메뉴 항목에 active-hover 클래스를 토글
            item.classList.toggle("active-hover");
        });
    });

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(".toggle");
        const arrow = toggle.querySelector(".arrow");

        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            
            dropdown.classList.toggle("active");

            // 화살표 보이기/숨기기
            if (dropdown.classList.contains("active")) {
                arrow.style.display = "inline";
            } else {
                arrow.style.display = "none";
            }
        });
    });
});


console.log("Header.js 로딩됨");
try {
  // header.js 코드
  console.log("Header.js 실행 완료");
} catch (e) {
  console.error("Header.js 오류:", e);
}