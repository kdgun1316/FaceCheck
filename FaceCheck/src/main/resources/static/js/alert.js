
		// 팝업 표시 함수
		function showPopup() {
			const popup = document.getElementById('popup');

			// localStorage에서 'hidePopupUntil' 값을 확인
			const hidePopupUntil = localStorage.getItem('hidePopupUntil');
			const now = new Date();

			// 팝업 숨김 기한이 지났거나 설정되지 않았으면 표시
			if (!hidePopupUntil || now > new Date(hidePopupUntil)) {
				popup.style.display = 'flex';
			}
		}

		// 팝업 닫기 함수
		function closePopup() {
			const popup = document.getElementById('popup');
			const dontShowToday = document.getElementById('dontShowToday');


			// 팝업 숨기기
			popup.style.display = 'none';
		}
        // 페이지 로드 시 팝업 표시
		window.onload = showPopup;