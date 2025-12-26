function applyTheme() {
    let mode = parseInt(localStorage.getItem('themeMode'));
    if (mode === 2) { mode = 1; localStorage.setItem('themeMode', mode); }
    else if (mode === 1 && localStorage.getItem('themeModeMigrated') !== 'true') { mode = 0; localStorage.setItem('themeMode', mode); localStorage.setItem('themeModeMigrated', 'true'); }
    else if (mode === 0 && localStorage.getItem('themeModeMigrated') !== 'true') { mode = 1; localStorage.setItem('themeMode', mode); localStorage.setItem('themeModeMigrated', 'true'); }
    else if (isNaN(mode)) { mode = 1; localStorage.setItem('themeMode', mode); }
    const modes = ["light", "dark"]; const theme = modes[mode];
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme + '-theme');
    const btn = document.getElementById('themeBtn'); if (btn) btn.innerText = theme.toUpperCase();
}

window.toggleTheme = function() { let mode = parseInt(localStorage.getItem('themeMode')); if (isNaN(mode)) mode = 1; mode = (mode + 1) % 2; localStorage.setItem('themeMode', mode); applyTheme(); }

function initializeHeaderFooter() {
    applyTheme();
    const docsLink = document.getElementById('docsLink');
    if (docsLink) { docsLink.setAttribute('href', 'docs/'); }
    const backUrl = document.body?.dataset?.backUrl; const inner = document.getElementById('header-inner') || document.querySelector('header');
    if (inner) {
        const existing = document.getElementById('backLinkDynamic'); if (existing) existing.remove();
        if (backUrl) { const backLink = document.createElement('a'); backLink.id = 'backLinkDynamic'; backLink.href = backUrl; backLink.setAttribute('role', 'button'); backLink.className = 'outline secondary'; backLink.style.marginRight = 'auto'; backLink.style.padding = '0.45rem 0.9rem'; backLink.style.fontSize = '0.95rem'; backLink.innerText = '← Назад'; inner.insertBefore(backLink, inner.firstChild); }
    }
}

document.addEventListener('DOMContentLoaded', () => { applyTheme(); });
