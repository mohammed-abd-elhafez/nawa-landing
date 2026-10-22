// Runs before first paint so Arabic visitors never see an LTR flash.
// External file (not inline) so the production CSP can stay `script-src 'self'`.
;(function () {
  try {
    var lang = new URLSearchParams(location.search).get('lang')
    if (lang !== 'en' && lang !== 'ar') lang = localStorage.getItem('nawa-lang')
    if (lang === 'ar') {
      document.documentElement.lang = 'ar'
      document.documentElement.dir = 'rtl'
    }
  } catch (e) {
    /* storage blocked: React sets the defaults */
  }
})()
