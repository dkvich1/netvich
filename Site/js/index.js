/**
 * Sistema de alternância de tema (Dark Mode / Light Mode)
 * Salva a preferência do usuário no localStorage
 */

// Elementos do DOM
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

// Inicializa o tema ao carregar a página
document.addEventListener('DOMContentLoaded', initializeTheme);

// Event listener do botão
themeToggle.addEventListener('click', toggleTheme);

/**
 * Inicializa o tema baseado na preferência salva ou no sistema
 */
function initializeTheme() {
    // Verifica se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Usa o tema salvo
        applyTheme(savedTheme);
    } else {
        // Verifica a preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }
}

/**
 * Alterna entre dark mode e light mode
 */
function toggleTheme() {
    // Obtém o tema atual
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    
    // Determina o novo tema
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplica o novo tema
    applyTheme(newTheme);
    
    // Salva a preferência
    localStorage.setItem('theme', newTheme);
}

/**
 * Aplica o tema ao documento
 * @param {string} theme - 'dark' ou 'light'
 */
function applyTheme(theme) {
    if (theme === 'light') {
        // Ativa light mode
        body.classList.add('light-mode');
        themeIcon.textContent = '';
        themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
    } else {
        // Ativa dark mode
        body.classList.remove('light-mode');
        themeIcon.textContent = '';
        themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
    }
}

/**
 * Monitora mudanças de preferência do sistema
 * Se o usuário mudar a preferência do SO, atualiza o tema
 */
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        // Só atualiza se o usuário não tiver definido uma preferência
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}
