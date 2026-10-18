AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function toggleNavPage() {
    const links = document.querySelector('.nav-links');
    const pager = document.getElementById('navPager');
    if (!links) return;
    const showPg2 = links.classList.toggle('show-pg2');
    if (pager) {
        pager.title = showPg2 ? 'Menu sebelumnya' : 'Menu berikutnya';
    }
}

function toggleTimeline(id, btn) {
    const timeline = document.getElementById(id);
    if (!timeline || !btn) return;
    const collapsed = timeline.classList.toggle('collapsed');
    btn.innerHTML = collapsed
        ? 'Lihat Semua <i class="fas fa-chevron-right"></i>'
        : 'Lebih Sedikit <i class="fas fa-chevron-up"></i>';
}

function jumpToSection(hash) {
    if (!hash || hash === '#') return;
    const el = document.querySelector(hash);
    if (!el) return;
    const top = hash === '#beranda' ? 0 : el.offsetTop - 80;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(top, 0));
    html.style.scrollBehavior = prev;
    try {
        history.replaceState(null, '', hash);
    } catch (err) {}
}

// Handle nav link clicks (desktop/mobile)
document.querySelectorAll('.nav-links > li > a').forEach(link => {
    link.addEventListener('click', (e) => {
        const parent = link.parentElement;
        const href = link.getAttribute('href');

        // Mobile dropdown toggle
        if (parent && parent.classList.contains('nav-dropdown') && window.innerWidth <= 768) {
            e.preventDefault();
            parent.classList.toggle('open');
            return;
        }

        // Smooth scroll for same-page anchors
        if (href && href.startsWith('#') && document.querySelector(href)) {
            e.preventDefault();
            jumpToSection(href);
        }

        // Close mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Handle submenu & brand/card links
document.querySelectorAll('.nav-submenu a, .nav-brand, .nav-card').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && document.querySelector(href)) {
            e.preventDefault();
            jumpToSection(href);
        }
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    });
});

// Active link based on current section (same-page)
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links > li > a');

function setActiveNav() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(a => {
        a.classList.remove('active');
        const href = a.getAttribute('href');
        if (href === '#' + current || (current === 'beranda' && href === '#beranda')) {
            a.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Set active link based on current page filename
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'beranda.html';

    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;

        // Normalize
        let targetPage = href;
        if (href.includes('#')) {
            targetPage = href.split('#')[0];
        }

        if (targetPage === '' || targetPage === '.' || targetPage === './') {
            targetPage = 'beranda.html';
        }

        if (targetPage === page) {
            a.classList.add('active');
        } else {
            // keep section-based active if same page with hash, else remove
            if (!href.startsWith('#')) {
                a.classList.remove('active');
            }
        }
    });

    setActiveNav();
});
