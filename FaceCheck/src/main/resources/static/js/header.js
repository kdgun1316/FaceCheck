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


