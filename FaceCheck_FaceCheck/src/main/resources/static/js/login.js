document.addEventListener('DOMContentLoaded', function () {
    const particlesContainer = document.querySelector('.particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2; // 2px ~ 7px 크기
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10s ~ 20s
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);

        particle.addEventListener('animationend', () => particle.remove());
    }

    setInterval(createParticle, 500);

    const loginButton = document.querySelector('button');
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.background = 'rgba(0, 0, 0, 0.7)';
        });
        input.addEventListener('blur', function () {
            this.style.background = 'rgba(0, 0, 0, 0.5)';
        });
    });

    loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        const id = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        if (id && password) {
            alert('로그인 시도: ' + id);
        } else {
            alert('아이디와 비밀번호를 입력해주세요!');
        }
    });
});