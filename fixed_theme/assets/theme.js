/* ==========================================================
   MEDVi Bloom Theme — interactive behavior
   Drawer nav, cart drawer, FAQ, scroll reveal, product gallery,
   quantity steppers, sticky header, count-up stats.
   ========================================================== */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ------------- Sticky header shadow on scroll ------------- */
  const header = $('[data-site-header]');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------- Slide-out menu ----------------------- */
  const menu = $('[data-slideout]');
  const backdrop = $('[data-slideout-backdrop]');
  const menuToggles = $$('[data-menu-toggle]');
  const menuClose = $$('[data-menu-close]');

  function openMenu() {
    if (!menu) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    backdrop?.classList.add('is-open');
    document.body.classList.add('no-scroll');
    menuToggles.forEach((el) => el.setAttribute('aria-expanded', 'true'));
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    backdrop?.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    menuToggles.forEach((el) => el.setAttribute('aria-expanded', 'false'));
  }

  menuToggles.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    menu?.classList.contains('is-open') ? closeMenu() : openMenu();
  }));
  menuClose.forEach((btn) => btn.addEventListener('click', closeMenu));
  backdrop?.addEventListener('click', () => { closeMenu(); closeCart(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMenu(); closeCart(); }
  });

  /* ----------------------- Cart drawer ---------------------- */
  const cartDrawer = $('[data-cart-drawer]');
  const cartToggles = $$('[data-cart-toggle]');
  const cartCloseBtns = $$('[data-cart-close]');

  function openCart(e) {
    if (!cartDrawer) return;
    if (e) e.preventDefault();
    refreshCart().finally(() => {
      cartDrawer.classList.add('is-open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      backdrop?.classList.add('is-open');
      document.body.classList.add('no-scroll');
    });
  }
  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    if (!menu?.classList.contains('is-open')) {
      backdrop?.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  }

  cartToggles.forEach((el) => el.addEventListener('click', openCart));
  cartCloseBtns.forEach((el) => el.addEventListener('click', closeCart));

  async function refreshCart() {
    try {
      const res = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
      if (!res.ok) return;
      const cart = await res.json();
      updateCartCount(cart.item_count);
    } catch (_) { /* ignore */ }
  }
  function updateCartCount(count) {
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = count;
      el.toggleAttribute('hidden', count === 0);
    });
  }
  refreshCart();

  /* ------------------------- FAQ ---------------------------- */
  $$('[data-faq-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!expanded));
      if (!panel) return;
      if (expanded) {
        panel.style.maxHeight = '0px';
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* --------------------- Scroll reveal ---------------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* ------------- Count-up animation (stats) ----------------- */
  const counters = $$('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const parse = (raw) => {
      const n = parseFloat(String(raw).replace(/[^0-9.\-]/g, ''));
      return isNaN(n) ? null : n;
    };
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io2.unobserve(el);
        const target = parse(el.dataset.target);
        if (target === null) return;
        const prefix = (el.textContent.match(/^[^0-9\-]*/) || [''])[0];
        const suffix = (el.textContent.match(/[^0-9.\-]*$/) || [''])[0];
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = target * eased;
          el.textContent = prefix + (Number.isInteger(target) ? Math.round(v).toLocaleString() : v.toFixed(1)) + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });
    counters.forEach((el) => io2.observe(el));
  }

  /* ---------------- Product gallery thumbs ------------------ */
  $$('[data-gallery-thumb]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const main = $('[data-gallery-image]');
      const src = btn.dataset.src;
      if (main && src) {
        main.setAttribute('src', src);
      }
      $$('[data-gallery-thumb]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  /* -------------------- Quantity steppers ------------------- */
  $$('[data-qty]').forEach((wrap) => {
    const input = $('input', wrap);
    const up = $('[data-qty-up]', wrap);
    const down = $('[data-qty-down]', wrap);
    up?.addEventListener('click', () => { input.value = Math.max(1, (parseInt(input.value, 10) || 1) + 1); });
    down?.addEventListener('click', () => { input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1); });
  });

  /* ---- Variant picker: highlight selection visually --------- */
  $$('.variant-picker').forEach((form) => {
    form.addEventListener('change', (e) => {
      const input = e.target.closest('input[type="radio"]');
      if (!input) return;
      const fieldset = input.closest('fieldset');
      fieldset?.querySelectorAll('.variant-picker__option').forEach((opt) => {
        opt.classList.toggle('is-selected', opt.contains(input));
      });
    });
  });

  /* ---- Product form: AJAX add-to-cart with drawer open ----- */
  $$('form[action^="/cart/add"]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      if (form.dataset.noAjax === 'true') return;
      e.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      submit?.setAttribute('disabled', 'disabled');
      try {
        const body = new FormData(form);
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body,
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error('Add to cart failed');
        await refreshCart();
        openCart();
      } catch (err) {
        form.submit();
      } finally {
        submit?.removeAttribute('disabled');
      }
    });
  });
})();
