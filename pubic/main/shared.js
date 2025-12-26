function applyTheme() {
    let mode = parseInt(localStorage.getItem('themeMode'));
    
    // Миграция только один раз: если был старый режим (0=auto, 1=light, 2=dark), конвертируем в новый (0=light, 1=dark)
    if (mode === 2) {
        mode = 1; // старый dark -> новый dark
        localStorage.setItem('themeMode', mode);
    } else if (mode === 1 && localStorage.getItem('themeModeMigrated') !== 'true') {
        // Если mode === 1 и это старый формат (light), конвертируем в новый (light = 0)
        mode = 0;
        localStorage.setItem('themeMode', mode);
        localStorage.setItem('themeModeMigrated', 'true');
    } else if (mode === 0 && localStorage.getItem('themeModeMigrated') !== 'true') {
        // Если mode === 0 и это старый формат (auto), устанавливаем dark
        mode = 1;
        localStorage.setItem('themeMode', mode);
        localStorage.setItem('themeModeMigrated', 'true');
    } else if (isNaN(mode)) {
        // Нет значения -> dark по умолчанию
        mode = 1;
        localStorage.setItem('themeMode', mode);
    }
    
    const modes = ["light", "dark"];
    const theme = modes[mode];
    
    // Устанавливаем data-theme на html элемент (для Pico CSS)
    document.documentElement.setAttribute('data-theme', theme);
    
    // Также устанавливаем класс на body для совместимости со style.css
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme + '-theme');
    
    const btn = document.getElementById('themeBtn');
    if (btn) btn.innerText = theme.toUpperCase();
}

window.toggleTheme = function() {
    let mode = parseInt(localStorage.getItem('themeMode'));
    if (isNaN(mode)) mode = 1; // по умолчанию dark
    mode = (mode + 1) % 2; // Переключаем между light (0) и dark (1)
    localStorage.setItem('themeMode', mode);
    applyTheme();
}

function initializeHeaderFooter() {
    // Инициализация темы после загрузки header
    applyTheme();

    // Устанавливаем корректную ссылку на Docs из любого раздела
    const docsLink = document.getElementById('docsLink');
    if (docsLink) {
        const path = window.location.pathname.replace(/\\/g, '/');
        const baseIndex = path.toLowerCase().lastIndexOf('/pubic/');
        let docsPath = 'docs/';
        if (baseIndex !== -1) {
            const base = path.substring(0, baseIndex + 7);
            docsPath = base + 'docs/';
        }
        docsLink.setAttribute('href', docsPath);
    }

    // Динамическая кнопка Назад по атрибуту страницы
    const backUrl = document.body?.dataset?.backUrl;
    const inner = document.getElementById('header-inner') || document.querySelector('header');
    if (inner) {
        const existing = document.getElementById('backLinkDynamic');
        if (existing) existing.remove();

        if (backUrl) {
            const backLink = document.createElement('a');
            backLink.id = 'backLinkDynamic';
            backLink.href = backUrl;
            backLink.setAttribute('role', 'button');
            backLink.className = 'outline secondary';
            backLink.style.marginRight = 'auto';
            backLink.style.padding = '0.45rem 0.9rem';
            backLink.style.fontSize = '0.95rem';
            backLink.innerText = '← Назад';
            inner.insertBefore(backLink, inner.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
});