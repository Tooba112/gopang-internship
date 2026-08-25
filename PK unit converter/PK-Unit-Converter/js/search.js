/* ============================================
   PK Unit Converter - search.js
   Client-side search functionality
   ============================================ */

const SITE_PAGES = [
  { title: 'Home - PK Unit Converter', url: 'index.html', desc: 'Free online unit converter for length, weight, temperature, area, volume, speed, time, data and height.', keywords: 'unit converter, online converter, measurement converter, free converter' },
  { title: 'Length Converter', url: 'length.html', desc: 'Convert between kilometers, meters, centimeters, millimeters, miles, yards, feet and inches.', keywords: 'length converter, meter to foot, km to miles, inches to centimeters' },
  { title: 'Weight & Mass Converter', url: 'weight.html', desc: 'Convert kilograms, grams, milligrams, pounds and ounces quickly and accurately.', keywords: 'weight converter, kg to pounds, grams to ounces, mass converter' },
  { title: 'Temperature Converter', url: 'temperature.html', desc: 'Convert Celsius, Fahrenheit and Kelvin temperatures with accurate formulas.', keywords: 'temperature converter, celsius to fahrenheit, kelvin converter' },
  { title: 'Area Converter', url: 'area.html', desc: 'Convert square meters, square feet, acres, hectares and more area units.', keywords: 'area converter, square meter to square foot, acre to hectare' },
  { title: 'Volume Converter', url: 'volume.html', desc: 'Convert liters, milliliters, gallons, cubic meters and cubic feet.', keywords: 'volume converter, liters to gallons, ml to liters' },
  { title: 'Speed Converter', url: 'speed.html', desc: 'Convert km/h, m/s, mph and knots between different speed units.', keywords: 'speed converter, kmh to mph, meters per second, knots' },
  { title: 'Time Converter', url: 'time.html', desc: 'Convert seconds, minutes, hours, days and weeks easily.', keywords: 'time converter, hours to minutes, seconds to hours, days to weeks' },
  { title: 'Data Storage Converter', url: 'data.html', desc: 'Convert bytes, kilobytes, megabytes, gigabytes and terabytes.', keywords: 'data converter, bytes to KB, MB to GB, terabytes converter' },
  { title: 'Height Converter', url: 'height.html', desc: 'Convert height between centimeters, meters, feet and inches.', keywords: 'height converter, cm to feet, inches to cm, height in feet' },
  { title: 'About PK Unit Converter', url: 'about.html', desc: 'Learn about PK Unit Converter, our mission, and our commitment to accurate measurement tools.', keywords: 'about, PK unit converter, mission, team' },
  { title: 'Contact Us', url: 'contact.html', desc: 'Get in touch with the PK Unit Converter team. We welcome feedback and questions.', keywords: 'contact, feedback, support, help' },
  { title: 'Frequently Asked Questions', url: 'faq.html', desc: 'Find answers to common questions about unit conversion and using PK Unit Converter.', keywords: 'faq, questions, help, how to convert' },
  { title: 'Blog - Unit Conversion Tips', url: 'blog.html', desc: 'Read our articles on measurement, unit conversion tips, and everyday measurement guides.', keywords: 'blog, articles, measurement tips, conversion guides' },
  { title: 'Converter Categories', url: 'categories.html', desc: 'Browse all converter categories available on PK Unit Converter.', keywords: 'categories, all converters, browse' },
  { title: 'Privacy Policy', url: 'privacy.html', desc: 'Read our privacy policy to understand how we handle your data.', keywords: 'privacy policy, data, cookies' },
  { title: 'Terms & Conditions', url: 'terms.html', desc: 'Read the terms and conditions for using PK Unit Converter.', keywords: 'terms, conditions, legal' },
  { title: 'Cookie Policy', url: 'cookie-policy.html', desc: 'Learn about how PK Unit Converter uses cookies on the website.', keywords: 'cookie policy, cookies, tracking' },
  { title: 'Disclaimer', url: 'disclaimer.html', desc: 'Read our disclaimer for PK Unit Converter accuracy and liability information.', keywords: 'disclaimer, accuracy, liability' },
  { title: 'Sitemap', url: 'sitemap.html', desc: 'View all pages available on PK Unit Converter website.', keywords: 'sitemap, all pages, navigation' },
];

document.addEventListener('DOMContentLoaded', function () {
  const searchInput  = document.getElementById('searchInput');
  const searchBtn    = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('searchResults');
  const resultsCount = document.getElementById('resultsCount');

  if (!searchInput || !resultsContainer) return;

  // Pre-fill from URL query param
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    searchInput.value = q;
    performSearch(q);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      performSearch(searchInput.value.trim());
    });
  }

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') performSearch(this.value.trim());
  });

  // Live search
  searchInput.addEventListener('input', function () {
    const val = this.value.trim();
    if (val.length >= 2) performSearch(val);
    else {
      resultsContainer.innerHTML = '';
      if (resultsCount) resultsCount.textContent = '';
    }
  });

  function performSearch(query) {
    if (!query) {
      resultsContainer.innerHTML = '<p class="no-results">Please enter a search term.</p>';
      if (resultsCount) resultsCount.textContent = '';
      return;
    }

    const terms = query.toLowerCase().split(/\s+/);
    const results = SITE_PAGES.filter(function (page) {
      const searchable = (page.title + ' ' + page.desc + ' ' + page.keywords).toLowerCase();
      return terms.every(function (term) { return searchable.includes(term); });
    });

    // Update URL without reload
    const newUrl = window.location.pathname + '?q=' + encodeURIComponent(query);
    window.history.replaceState(null, '', newUrl);

    if (resultsCount) {
      resultsCount.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for "' + query + '"';
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="no-results"><p>No results found for <strong>"' + escHtml(query) + '"</strong>.</p><p style="margin-top:8px;font-size:0.95rem;">Try different keywords, or <a href="categories.html">browse all converters</a>.</p></div>';
      return;
    }

    resultsContainer.innerHTML = results.map(function (page) {
      return '<div class="search-result-item">' +
        '<h3><a href="' + page.url + '">' + highlight(page.title, terms) + '</a></h3>' +
        '<p>' + highlight(page.desc, terms) + '</p>' +
        '<div class="search-url">' + window.location.origin + '/' + page.url + '</div>' +
        '</div>';
    }).join('');
  }

  function highlight(text, terms) {
    let result = escHtml(text);
    terms.forEach(function (term) {
      if (!term) return;
      const regex = new RegExp('(' + escRegex(term) + ')', 'gi');
      result = result.replace(regex, '<mark style="background:#fff3cd;padding:0 2px;border-radius:2px;">$1</mark>');
    });
    return result;
  }

  function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function escRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
});
