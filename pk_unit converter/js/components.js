/* ============================================
   PK Unit Converter - components.js
   Shared header & footer injection
   ============================================ */

(function () {

  function getHeader(activePage) {
    return `<header class="header" role="banner">
  <div class="container">
    <div class="header-inner">
      <a href="index.html" class="logo" aria-label="PK Unit Converter Home">
        <div class="logo-icon" aria-hidden="true">PK</div>
        <span class="logo-text">PK <span>Converter</span></span>
      </a>
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <div class="nav-dropdown">
          <a href="categories.html" aria-haspopup="true">Converters</a>
          <div class="dropdown-menu" role="menu">
            <a href="length.html" role="menuitem">📏 Length</a>
            <a href="weight.html" role="menuitem">⚖️ Weight</a>
            <a href="temperature.html" role="menuitem">🌡️ Temperature</a>
            <a href="area.html" role="menuitem">📐 Area</a>
            <a href="volume.html" role="menuitem">🧪 Volume</a>
            <a href="speed.html" role="menuitem">🚀 Speed</a>
            <a href="time.html" role="menuitem">⏰ Time</a>
            <a href="data.html" role="menuitem">💾 Data Storage</a>
            <a href="height.html" role="menuitem">📊 Height</a>
          </div>
        </div>
        <a href="blog.html">Blog</a>
        <a href="faq.html">FAQ</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="search.html" class="header-cta">🔍 Search</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<nav class="mobile-nav" id="mobileNav" role="navigation" aria-label="Mobile navigation">
  <span class="mobile-section-title">Pages</span>
  <a href="index.html">🏠 Home</a>
  <a href="categories.html">📂 All Converters</a>
  <a href="blog.html">📝 Blog</a>
  <a href="faq.html">❓ FAQ</a>
  <a href="about.html">ℹ️ About</a>
  <a href="contact.html">📩 Contact</a>
  <a href="search.html">🔍 Search</a>
  <span class="mobile-section-title">Converters</span>
  <a href="length.html">📏 Length</a>
  <a href="weight.html">⚖️ Weight</a>
  <a href="temperature.html">🌡️ Temperature</a>
  <a href="area.html">📐 Area</a>
  <a href="volume.html">🧪 Volume</a>
  <a href="speed.html">🚀 Speed</a>
  <a href="time.html">⏰ Time</a>
  <a href="data.html">💾 Data Storage</a>
  <a href="height.html">📊 Height</a>
</nav>`;
  }

  function getFooter() {
    const year = new Date().getFullYear();
    return `<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo" aria-label="PK Unit Converter">
          <div class="logo-icon" aria-hidden="true">PK</div>
          <span class="logo-text">PK <span>Converter</span></span>
        </a>
        <p>Pakistan's trusted free online unit converter. Fast, accurate, and easy to use across all devices.</p>
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="Facebook">f</a>
          <a href="#" class="social-link" aria-label="Twitter">t</a>
          <a href="#" class="social-link" aria-label="LinkedIn">in</a>
          <a href="#" class="social-link" aria-label="YouTube">▶</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Converters</h4>
        <ul>
          <li><a href="length.html">Length</a></li>
          <li><a href="weight.html">Weight &amp; Mass</a></li>
          <li><a href="temperature.html">Temperature</a></li>
          <li><a href="area.html">Area</a></li>
          <li><a href="volume.html">Volume</a></li>
          <li><a href="speed.html">Speed</a></li>
          <li><a href="time.html">Time</a></li>
          <li><a href="data.html">Data Storage</a></li>
          <li><a href="height.html">Height</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Information</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="categories.html">All Categories</a></li>
          <li><a href="sitemap.html">Sitemap</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="search.html">Search</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms &amp; Conditions</a></li>
          <li><a href="cookie-policy.html">Cookie Policy</a></li>
          <li><a href="disclaimer.html">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${year} PK Unit Converter. All rights reserved.</p>
      <p>Made with ❤️ in Pakistan &nbsp;|&nbsp; <a href="privacy.html">Privacy</a> &nbsp;|&nbsp; <a href="terms.html">Terms</a></p>
    </div>
  </div>
</footer>`;
  }

  // Inject header and footer into placeholder elements
  document.addEventListener('DOMContentLoaded', function () {
    const headerEl = document.getElementById('site-header');
    if (headerEl) headerEl.outerHTML = getHeader();

    const footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.outerHTML = getFooter();
  });

})();
