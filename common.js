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
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    const currentTheme = html.getAttribute('data-theme') || 
                        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    sunIcons.forEach(icon => {
        icon.style.display = newTheme === 'light' ? 'block' : 'none';
    });
    moonIcons.forEach(icon => {
        icon.style.display = newTheme === 'light' ? 'none' : 'block';
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
        const sunIcons = document.querySelectorAll('.theme-icon-sun');
        const moonIcons = document.querySelectorAll('.theme-icon-moon');
        sunIcons.forEach(icon => {
            icon.style.display = theme === 'light' ? 'block' : 'none';
        });
        moonIcons.forEach(icon => {
            icon.style.display = theme === 'light' ? 'none' : 'block';
        });
    }, 100);
})();

// 3回タップ検出 - タイトルをクリック
(function() {
    let tapCount = 0;
    let tapTimeout;
    const NOTION_URL = 'https://www.notion.so/This-is-Secret-Page-3094a217523980e1b828cd820f6ba15a?source=copy_link';
    
    document.addEventListener('DOMContentLoaded', () => {
        const siteTitle = document.querySelector('.site-title');
        if (siteTitle) {
            siteTitle.addEventListener('click', () => {
                tapCount++;
                
                // タイムアウトをリセット
                clearTimeout(tapTimeout);
                
                if (tapCount === 3) {
                    // 3回タップ成功
                    window.open(NOTION_URL, '_blank');
                    tapCount = 0;
                } else {
                    // 500ms以内に次のクリックがなければリセット
                    tapTimeout = setTimeout(() => {
                        tapCount = 0;
                    }, 500);
                }
            });
        }
    });
})();