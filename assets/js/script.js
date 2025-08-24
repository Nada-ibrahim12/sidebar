const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const backdrop = document.getElementById('backdrop');
const mqDesktop = window.matchMedia('(min-width: 768px)');

function isDesktop() { return mqDesktop.matches; }

function openMobile() {
    sidebar.setAttribute('data-state', 'open');
    sidebar.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    backdrop.dataset.show = 'true';
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
}
function closeMobile() {
    sidebar.setAttribute('data-state', 'closed');
    sidebar.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    delete backdrop.dataset.show;
    backdrop.hidden = true;
    document.body.style.overflow = '';
}

function toggleDesktopCollapse() {
    const collapsed = sidebar.getAttribute('data-collapsed') === 'true';
    sidebar.setAttribute('data-collapsed', collapsed ? 'false' : 'true');
}

function handleToggle() {
    if (isDesktop()) {
        toggleDesktopCollapse();
    } else {
        const open = sidebar.getAttribute('data-state') === 'open';
        open ? closeMobile() : openMobile();
    }
}

function syncOnResize() {
    if (isDesktop()) {
        closeMobile();
        sidebar.setAttribute('aria-hidden', 'false');
    } else {
        sidebar.removeAttribute('data-collapsed');
    }
}

toggleBtn.addEventListener('click', handleToggle);
backdrop.addEventListener('click', closeMobile);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.getAttribute('data-state') === 'open' && !isDesktop()) {
        closeMobile();
    }
});

mqDesktop.addEventListener('change', syncOnResize);
syncOnResize();
