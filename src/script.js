/* ביכורי שילה — אינטראקציות עמוד */
(function () {
  'use strict';

  // מספר הוואטסאפ נלקח מהאתר (data-wa על הטופס) כדי להישאר מסונכרן עם הניהול
  var formEl = document.getElementById('leadForm');
  var WHATSAPP_NUMBER =
    (formEl && formEl.getAttribute('data-wa')) || '972525666687';

  // שנה נוכחית בפוטר
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // צל לניווט בגלילה
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // תפריט מובייל
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // שליחת טופס -> וואטסאפ עם הודעה מוכנה
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : '';
      };

      var name = get('name');
      var phone = get('phone');
      var topic = get('topic');
      var adults = get('adults');
      var kids = get('kids');
      var date = get('date');
      var msg = get('msg');

      var lines = ['היי ביכורי שילה! 🍇', ''];
      if (name) lines.push('שם: ' + name);
      if (phone) lines.push('טלפון: ' + phone);
      if (topic) lines.push('מעוניין/ת ב: ' + topic);
      if (adults) lines.push('מבוגרים: ' + adults);
      if (kids) lines.push('ילדים: ' + kids);
      if (date) lines.push('תאריך מבוקש: ' + date);
      if (msg) lines.push('הערות: ' + msg);
      lines.push('', 'אשמח לפרטים 🙏');

      var text = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
      window.open(url, '_blank');
    });
  }

// פופאפ כניסה — מוצג עד 5 פעמים לכל מבקר, ואז נעצר
  var popup = document.getElementById('sitePopup');
  if (popup) {
    var COUNT_KEY = 'bs_popup_count';
    var MAX_SHOWS = 5;
    var shown = 0;
    try { shown = parseInt(localStorage.getItem(COUNT_KEY), 10) || 0; } catch (e) {}

    function closePopup() {
      popup.classList.remove('open');
      popup.setAttribute('hidden', '');
    }

    if (shown < MAX_SHOWS) {
      // מגדילים את המונה: הפופאפ מוצג עוד פעם אחת בכניסה הזו
      try { localStorage.setItem(COUNT_KEY, String(shown + 1)); } catch (e) {}

      // השהיה קטנה כדי שהעמוד ייטען לפני שהפופאפ קופץ
      setTimeout(function () {
        popup.removeAttribute('hidden');
        popup.classList.add('open');
      }, 700);

      var closeBtn = document.getElementById('popupClose');
      if (closeBtn) closeBtn.addEventListener('click', closePopup);
      // סגירה בלחיצה על הרקע (מחוץ לתמונה)
      popup.addEventListener('click', function (e) {
        if (e.target === popup) closePopup();
      });
      // סגירה עם Esc
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('open')) closePopup();
      });
    }
  }})();
