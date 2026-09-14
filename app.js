/* nil.postiusgroup.com

   Each language is now its own static document (index.html / es.html /
   ja.html, published as /, /es and /ja), so no translation data ships here.
   What is left: the theme toggle, remembering which language the reader
   chose, and fetching the Japanese webfonts only on the Japanese page.     */
(function () {
  'use strict';

  var root = document.documentElement;
  var lang = root.getAttribute('lang') || 'en';

  /* --------------------------------------------------------- language */
  // Record the language of the page actually being read, so a later visit to
  // the root redirects to it. The switcher writes this before navigating —
  // without that, choosing EN from /es would be bounced straight back by the
  // pre-paint redirect in the <head>.
  function remember(l) {
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  remember(lang);

  Array.prototype.forEach.call(document.querySelectorAll('.lang-switch a'), function (a) {
    a.addEventListener('click', function () {
      remember(a.getAttribute('data-lang'));
    });
  });

  /* ------------------------------------------------------------ fonts */
  // Noto Sans/Serif JP carry ~120 unicode subsets each. Requested here rather
  // than from a <link> so Cloudflare Fonts cannot inline the whole stylesheet
  // into the HTML, and so only Japanese readers pay for them.
  if (lang === 'ja') {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700' +
             '&family=Noto+Serif+JP:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }

  /* ------------------------------------------------------------ theme */
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var LABEL = {
    en: 'Switch colour theme',
    es: 'Cambiar tema de color',
    ja: 'カラーテーマを切り替える'
  };

  function theme() {
    var set = root.getAttribute('data-theme');
    return set === 'dark' || set === 'light' ? set : (media.matches ? 'dark' : 'light');
  }

  toggle.setAttribute('aria-label', LABEL[lang] || LABEL.en);

  toggle.addEventListener('click', function () {
    var next = theme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}());
