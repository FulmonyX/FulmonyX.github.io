
(function () {
    console.log('%c你少看我日志！', 'font-size: 28px; font-weight: bold; color: #6ea8ff; text-shadow: 0 0 20px #3f7bff; background: #0b1424; padding: 12px 24px; border-radius: 40px; border: 1px solid #4a7fd4;');

    let secretTimer = null;
    let inputBuffer = '';
    const SECRET_PAGE = 'FulmonyX-Space.html';

    function resetSecretTimer() {
        if (secretTimer) clearTimeout(secretTimer);
        secretTimer = setTimeout(() => {
            inputBuffer = '';
            secretTimer = null;
        }, 5000);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9]/)) {
            inputBuffer += e.key;
            resetSecretTimer();
            if (inputBuffer.toLowerCase() === 'fulmonyx') {
                if (secretTimer) clearTimeout(secretTimer);
                inputBuffer = '';
                window.location.href = SECRET_PAGE;
            }
            if (inputBuffer.length > 20) inputBuffer = inputBuffer.slice(-10);
        }
    });

    const sidebar = document.getElementById('sidebar');
    const sidebarNav = document.getElementById('sidebarNav');
    const navLinks = sidebarNav.querySelectorAll('a');
    if (navLinks.length <= 1) {
        sidebar.classList.add('hidden');
    }

    const starfield = document.getElementById('starfield');
    const STAR_COUNT = 180;
    const stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3.2 + 1.2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--dur', (Math.random() * 4 + 2) + 's');
        star.style.animationDelay = (Math.random() * 5) + 's';
        starfield.appendChild(star);
        stars.push(star);
    }

    function updateSky() {
        const now = new Date();
        const totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const cycleMinutes = (totalSeconds / 60) % 24;  // 每12分钟循环一次，范围 0 ~ 23.99
        const minutes = cycleMinutes * 60;  // 映射回 0 ~ 1439 的范围，复用原有的分段逻辑
        let bgGradient = '';
        let starOpacity = 1;

        if (minutes < 60) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #0a0f1e, #010308)'; starOpacity = 1; } else if (minutes < 120) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #121b2b, #030712)'; starOpacity = 0.95; } else if (minutes < 180) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #1a263b, #0a0f1e)'; starOpacity = 0.85; } else if (minutes < 240) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #22334a, #101a2a)'; starOpacity = 0.7; } else if (minutes < 300) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #2f405a, #182236)'; starOpacity = 0.5; } else if (minutes < 360) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #4d5f7a, #1f2d47)'; starOpacity = 0.3; } else if (minutes < 420) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #b58b6b, #3d4d66)'; starOpacity = 0.1; } else if (minutes < 480) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #d4b89b, #5e6f8a)'; starOpacity = 0.05; } else if (minutes < 540) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #cdd9e8, #7b8ca8)'; starOpacity = 0.02; } else if (minutes < 660) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #d6e4f5, #8ba0c0)'; starOpacity = 0.0; } else if (minutes < 780) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #e5efff, #9eb4d4)'; starOpacity = 0.0; } else if (minutes < 900) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #d3def0, #88a0c4)'; starOpacity = 0.02; } else if (minutes < 1020) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #c4cfe0, #6f87ac)'; starOpacity = 0.05; } else if (minutes < 1080) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #c29a7a, #4d6180)'; starOpacity = 0.3; } else if (minutes < 1140) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #a8765a, #334462)'; starOpacity = 0.5; } else if (minutes < 1200) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #5d4d5a, #1f2a3f)'; starOpacity = 0.8; } else if (minutes < 1320) { bgGradient = 'radial-gradient(ellipse at 50% 80%, #29384f, #0b1322)'; starOpacity = 0.95; } else { bgGradient = 'radial-gradient(ellipse at 50% 80%, #0e1428, #03060d)'; starOpacity = 1; }

        starfield.style.background = bgGradient;
        stars.forEach(s => { s.style.opacity = starOpacity; });
    }

    updateSky();
    setInterval(updateSky, 30000);

    function refreshSidebar() {
        const links = sidebarNav.querySelectorAll('a');
        if (links.length <= 1) {
            sidebar.classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
        }
    }
    refreshSidebar();
     const menuToggle = document.getElementById('menuToggle');
    const overlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // 点击侧边栏内部链接后自动收起
    sidebarNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // 窗口变宽时自动收起
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

    // ===== 侧边栏智能隐藏逻辑（保留，但移动端不生效） =====
    function refreshSidebar() {
        const links = sidebarNav.querySelectorAll('a');
        if (window.innerWidth > 768 && links.length <= 1) {
            sidebar.classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
        }
    }
    refreshSidebar();

    // 窗口变化时重新判断
    window.addEventListener('resize', refreshSidebar);
})();
