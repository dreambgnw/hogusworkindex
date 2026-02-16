/**
 * QUICK INSTANT - Common JavaScript
 * Handles theme switching, header/footer loading
 */

// ヘッダー読み込み
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        
        // index.htmlだけ矢印を非表示
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const backArrow = document.querySelector('.back-arrow');
            if (backArrow) {
                backArrow.style.display = 'none';
            }
        }
    });

// フッター読み込み
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

// テーマ切り替え
function toggleTheme() {
    const html = document.documentElement;
    const icons = document.querySelectorAll('.theme-icon');
    
    const currentTheme = html.getAttribute('data-theme') || 
                        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    icons.forEach(icon => {
        icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });
}

// モバイルメニュー開閉
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// 初期テーマ読み込み
(function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    
    // テーマアイコンの更新はヘッダー読み込み後に行う
    setTimeout(() => {
        const icons = document.querySelectorAll('.theme-icon');
        icons.forEach(icon => {
            icon.textContent = theme === 'light' ? '☀️' : '🌙';
        });
    }, 100);
})();