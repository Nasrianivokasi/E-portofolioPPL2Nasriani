(function () {
    var items = Array.prototype.slice.call(document.querySelectorAll('.galeri-masonry .galeri-item'));
    var box = document.getElementById('lightbox');
    if (!items.length || !box) return;
    var img = document.getElementById('lbImg');
    var cur = 0;

    function show(i) {
        cur = (i + items.length) % items.length;
        var it = items[cur];
        img.src = it.querySelector('img').src;
        img.alt = it.querySelector('img').alt;
        var c = document.getElementById('lbCount'); if (c) c.textContent = (cur + 1) + ' / ' + items.length;
    }
    function open(i) { show(i); box.classList.add('open'); box.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
    function close() { box.classList.remove('open'); box.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

    items.forEach(function (it, i) {
        it.addEventListener('click', function () { open(i); });
        it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { show(cur - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(cur + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
        if (!box.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(cur - 1);
        if (e.key === 'ArrowRight') show(cur + 1);
    });
})();
