// Retired. The sticky steps logic now lives in the Webflow embed
// "CSS + JS – Steps scroll & click" inside the "Start therapy in simple steps" section.

(function () {
    var THRESHOLD = 80;
    function init() {
      var header = document.querySelector('.section.for-header');
      if (!header) return;
      var lightHero = header.getAttribute('light-hero') === 'true';
      var burger = header.querySelector('.burger-checkbox');
      var buttons = [].slice.call(header.querySelectorAll('.btn'));
      var mobile = window.matchMedia('(max-width: 990px)');
  
      function update() {
        var menuOpen = !!(burger && burger.checked && mobile.matches);
        var atTop = lightHero && window.scrollY < THRESHOLD && !menuOpen;
        header.classList.toggle('is-top', atTop);
        /* light button only on desktop while transparent; mobile always keeps the default button */
        buttons.forEach(function (btn) { btn.classList.toggle('cc-light', atTop && !mobile.matches); });
      }
  
      /* Mobile menu: any link inside the menu (or anything marked burger-close-trigger) closes it,
         so anchor links collapse the menu while the page scrolls to the section. */
      function closeMenu() {
        if (!burger || !burger.checked) return;
        burger.checked = false;
        update();
      }
      header.addEventListener('click', function (e) {
        if (e.target.closest('.header-links_wrap a, [burger-close-trigger]')) closeMenu();
      });
  
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      if (burger) burger.addEventListener('change', update);
      update();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();