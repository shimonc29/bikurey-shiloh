/* ביכורי שילה — אינטראקציות עמוד */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '972525666687'; // אורית — 052-5666687

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
})();
