/* nil.postiusgroup.com — theme toggle.
   Default is the viewer's OS preference; an explicit choice is remembered.   */
(function () {
  'use strict';

  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) return;

  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    var set = root.getAttribute('data-theme');
    if (set === 'dark' || set === 'light') return set;
    return media.matches ? 'dark' : 'light';
  }

  function label(theme) {
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  label(current());

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    label(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Follow the OS while the viewer has not chosen for themselves.
  media.addEventListener('change', function () {
    var stored;
    try { stored = localStorage.getItem('theme'); } catch (e) {}
    if (stored !== 'dark' && stored !== 'light') label(current());
  });
}());
