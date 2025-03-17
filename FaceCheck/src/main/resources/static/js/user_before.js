var polygonsLeft = document.querySelectorAll("#Face-Left path");
var polygonsRight = document.querySelectorAll("#Face-Right path");

// ✅ gsap.timeline() 생성 (repeat: -1 → 무한 반복, repeatDelay: 3초)
var tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

tl.add("faces"); // ✅ 타임라인 레이블 추가

// ✅ 왼쪽 얼굴 조각 애니메이션
tl.from(polygonsLeft, { 
    duration: 2, 
    x: -100, 
    y: 200, 
    scale: 0, 
    opacity: 0, 
    transformOrigin: "center" 
}, "faces");

// ✅ 오른쪽 얼굴 조각 애니메이션
tl.from(polygonsRight, { 
    duration: 2, 
    x: 100, 
    y: -200, 
    scale: 0, 
    opacity: 0, 
    transformOrigin: "center" 
}, "faces");
