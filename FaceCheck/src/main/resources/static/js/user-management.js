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

function handleButtonClick() {
    // 테이블 선택
    const table = document.querySelector('table');
    if (!table) {
        console.error('테이블이 존재하지 않습니다.');
        return;
    }
    
    // CSV 데이터 초기화
    let csvData = [];

    // 테이블 헤더 추출 (한 번만 추가)
    const headers = [];
    const thead = table.querySelector('thead');

    if (thead) {
        // thead가 있는 경우, 헤더 추출
        const headerCells = thead.querySelectorAll('th');
        headerCells.forEach(cell => headers.push(cell.textContent.trim()));
    } else {
        // thead가 없는 경우, 첫 번째 tbody 행에서 헤더 추출
        const firstRow = table.querySelector('tbody tr:first-child');
        if (firstRow) {
            const firstRowCells = firstRow.querySelectorAll('th, td');
            firstRowCells.forEach(cell => headers.push(cell.textContent.trim()));
        }
    }

    // 헤더가 존재할 때만 추가
    if (headers.length > 0) {
        csvData.push(headers);
    }

    // 테이블 데이터 추출 (tbody에서만 가져오기)
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td'); // 데이터는 td만 포함
        cells.forEach(cell => rowData.push(cell.textContent.trim()));
        csvData.push(rowData);
    });

    // CSV 문자열로 변환
    const csvString = csvData.map(row => row.join(',')).join('\n');

    // CSV 파일 다운로드
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', '출입기록_' + new Date().toISOString().slice(0,10) + '.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();

    // 정리 작업
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const tableRows = document.querySelectorAll(".user-table tbody tr");



    // 실시간 입력 필터링
    searchInput.addEventListener("input", () => {
        filterTable();
    });

    function filterTable() {
        const query = searchInput.value.toLowerCase();
        tableRows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase(); // 이름
            const empNum = row.children[1].textContent.toLowerCase(); // 사번

            // 이름 또는 사번이 검색어와 일치하면 표시, 그렇지 않으면 숨김
            if (name.includes(query) || empNum.includes(query)) {
                row.style.display = ""; // 행 표시
            } else {
                row.style.display = "none"; // 행 숨김
            }
        });
    }
});

