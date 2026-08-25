/* ============================================
   PK Unit Converter - converter.js
   All conversion logic, validation, results
   ============================================ */

/* ── Conversion Data ─────────────────────────── */

const CONVERSIONS = {

  length: {
    units: ['Kilometer','Meter','Centimeter','Millimeter','Mile','Yard','Foot','Inch'],
    toBase: { // base = meter
      'Kilometer': 1000,
      'Meter': 1,
      'Centimeter': 0.01,
      'Millimeter': 0.001,
      'Mile': 1609.344,
      'Yard': 0.9144,
      'Foot': 0.3048,
      'Inch': 0.0254
    }
  },

  weight: {
    units: ['Kilogram','Gram','Milligram','Pound','Ounce'],
    toBase: { // base = kilogram
      'Kilogram': 1,
      'Gram': 0.001,
      'Milligram': 0.000001,
      'Pound': 0.45359237,
      'Ounce': 0.02834952
    }
  },

  area: {
    units: ['Square Meter','Square Kilometer','Square Foot','Square Yard','Acre','Hectare'],
    toBase: { // base = sq meter
      'Square Meter': 1,
      'Square Kilometer': 1e6,
      'Square Foot': 0.09290304,
      'Square Yard': 0.83612736,
      'Acre': 4046.8564,
      'Hectare': 10000
    }
  },

  volume: {
    units: ['Liter','Milliliter','Gallon','Cubic Meter','Cubic Foot'],
    toBase: { // base = liter
      'Liter': 1,
      'Milliliter': 0.001,
      'Gallon': 3.785411784,
      'Cubic Meter': 1000,
      'Cubic Foot': 28.316846592
    }
  },

  speed: {
    units: ['km/h','m/s','mph','knot'],
    toBase: { // base = m/s
      'km/h': 0.27778,
      'm/s': 1,
      'mph': 0.44704,
      'knot': 0.51444
    }
  },

  time: {
    units: ['Second','Minute','Hour','Day','Week'],
    toBase: { // base = second
      'Second': 1,
      'Minute': 60,
      'Hour': 3600,
      'Day': 86400,
      'Week': 604800
    }
  },

  data: {
    units: ['Byte','KB','MB','GB','TB'],
    toBase: { // base = byte
      'Byte': 1,
      'KB': 1024,
      'MB': 1048576,
      'GB': 1073741824,
      'TB': 1099511627776
    }
  },

  height: {
    units: ['Centimeter','Meter','Foot','Inch'],
    toBase: { // base = cm
      'Centimeter': 1,
      'Meter': 100,
      'Foot': 30.48,
      'Inch': 2.54
    }
  }
};

/* ── Generic Conversion Function ─────────────── */

function convertGeneric(value, fromUnit, toUnit, category) {
  const cat = CONVERSIONS[category];
  if (!cat) return null;
  const baseValue = value * cat.toBase[fromUnit];
  return baseValue / cat.toBase[toUnit];
}

/* ── Temperature (special case) ──────────────── */

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let celsius;
  switch (from) {
    case 'Celsius':    celsius = value; break;
    case 'Fahrenheit': celsius = (value - 32) * 5 / 9; break;
    case 'Kelvin':     celsius = value - 273.15; break;
    default: return null;
  }
  switch (to) {
    case 'Celsius':    return celsius;
    case 'Fahrenheit': return celsius * 9 / 5 + 32;
    case 'Kelvin':     return celsius + 273.15;
    default: return null;
  }
}

/* ── Formatting ──────────────────────────────── */

function formatResult(num) {
  if (num === null || isNaN(num)) return 'Error';
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 0.000001 && num !== 0)) {
    return num.toExponential(6);
  }
  // Up to 8 significant figures, trim trailing zeros
  let str = parseFloat(num.toPrecision(8)).toString();
  return str;
}

/* ── Build Select Options ─────────────────────── */

function buildOptions(selectEl, units, selectedUnit) {
  selectEl.innerHTML = '';
  units.forEach(function (unit) {
    const opt = document.createElement('option');
    opt.value = unit;
    opt.textContent = unit;
    if (unit === selectedUnit) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

/* ── Setup a Converter Panel ─────────────────── */

function setupConverter(opts) {
  /*
    opts = {
      panelId: string,            // id of the .conv-panel div
      category: string,           // key in CONVERSIONS or 'temperature'
      defaultFrom: string,
      defaultTo: string,
    }
  */
  const panel = document.getElementById(opts.panelId);
  if (!panel) return;

  const inputEl    = panel.querySelector('.conv-input');
  const fromEl     = panel.querySelector('.conv-from');
  const toEl       = panel.querySelector('.conv-to');
  const convertBtn = panel.querySelector('.conv-btn');
  const resetBtn   = panel.querySelector('.conv-reset');
  const resultBox  = panel.querySelector('.result-box');
  const resultVal  = panel.querySelector('.result-value');
  const resultLbl  = panel.querySelector('.result-label');
  const resultFrm  = panel.querySelector('.result-formula');
  const errorBox   = panel.querySelector('.error-box');

  // Populate units
  const units = opts.category === 'temperature'
    ? ['Celsius','Fahrenheit','Kelvin']
    : CONVERSIONS[opts.category].units;

  buildOptions(fromEl, units, opts.defaultFrom || units[0]);
  buildOptions(toEl,   units, opts.defaultTo   || units[1]);

  function doConvert() {
    const raw = inputEl.value.trim();
    if (errorBox) { errorBox.classList.remove('show'); errorBox.textContent = ''; }
    if (resultBox) resultBox.classList.remove('show');

    if (raw === '') {
      if (errorBox) { errorBox.textContent = 'Please enter a value to convert.'; errorBox.classList.add('show'); }
      return;
    }
    const num = parseFloat(raw);
    if (isNaN(num)) {
      if (errorBox) { errorBox.textContent = 'Please enter a valid number.'; errorBox.classList.add('show'); }
      return;
    }

    const from = fromEl.value;
    const to   = toEl.value;
    let result;

    if (opts.category === 'temperature') {
      result = convertTemperature(num, from, to);
    } else {
      result = convertGeneric(num, from, to, opts.category);
    }

    if (result === null || isNaN(result)) {
      if (errorBox) { errorBox.textContent = 'Conversion error. Please try again.'; errorBox.classList.add('show'); }
      return;
    }

    if (resultVal) resultVal.textContent = formatResult(result) + ' ' + to;
    if (resultLbl) resultLbl.textContent = num + ' ' + from + ' equals:';
    if (resultFrm) resultFrm.textContent = getFormula(num, from, to, opts.category, result);
    if (resultBox) resultBox.classList.add('show');
  }

  function doReset() {
    inputEl.value = '';
    fromEl.value = opts.defaultFrom || units[0];
    toEl.value   = opts.defaultTo   || units[1];
    if (resultBox) resultBox.classList.remove('show');
    if (errorBox)  { errorBox.classList.remove('show'); errorBox.textContent = ''; }
    inputEl.focus();
  }

  if (convertBtn) convertBtn.addEventListener('click', doConvert);
  if (resetBtn)   resetBtn.addEventListener('click', doReset);
  inputEl.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') doConvert();
  });
}

function getFormula(val, from, to, category, result) {
  if (category === 'temperature') {
    if (from === 'Celsius' && to === 'Fahrenheit') return '(' + val + ' × 9/5) + 32 = ' + formatResult(result) + ' °F';
    if (from === 'Fahrenheit' && to === 'Celsius') return '(' + val + ' − 32) × 5/9 = ' + formatResult(result) + ' °C';
    if (from === 'Celsius' && to === 'Kelvin') return val + ' + 273.15 = ' + formatResult(result) + ' K';
    if (from === 'Kelvin' && to === 'Celsius') return val + ' − 273.15 = ' + formatResult(result) + ' °C';
    return val + ' ' + from + ' = ' + formatResult(result) + ' ' + to;
  }
  const cat = CONVERSIONS[category];
  if (!cat) return '';
  return val + ' ' + from + ' × ' + cat.toBase[from] + ' ÷ ' + cat.toBase[to] + ' = ' + formatResult(result) + ' ' + to;
}

/* ── Converter Tabs (homepage) ───────────────── */

function setupConverterTabs() {
  const tabs = document.querySelectorAll('.conv-tab');
  const panels = document.querySelectorAll('.conv-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = this.dataset.target;
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ── Initialize all converters on page ───────── */

document.addEventListener('DOMContentLoaded', function () {

  setupConverterTabs();

  // Homepage multi-tab converter
  var converterConfigs = [
    { panelId: 'panel-length',      category: 'length',      defaultFrom: 'Meter',        defaultTo: 'Foot' },
    { panelId: 'panel-weight',      category: 'weight',      defaultFrom: 'Kilogram',     defaultTo: 'Pound' },
    { panelId: 'panel-temperature', category: 'temperature', defaultFrom: 'Celsius',      defaultTo: 'Fahrenheit' },
    { panelId: 'panel-area',        category: 'area',        defaultFrom: 'Square Meter', defaultTo: 'Square Foot' },
    { panelId: 'panel-volume',      category: 'volume',      defaultFrom: 'Liter',        defaultTo: 'Gallon' },
    { panelId: 'panel-speed',       category: 'speed',       defaultFrom: 'km/h',         defaultTo: 'mph' },
    { panelId: 'panel-time',        category: 'time',        defaultFrom: 'Hour',         defaultTo: 'Minute' },
    { panelId: 'panel-data',        category: 'data',        defaultFrom: 'GB',           defaultTo: 'MB' },
    { panelId: 'panel-height',      category: 'height',      defaultFrom: 'Centimeter',   defaultTo: 'Foot' },
  ];

  converterConfigs.forEach(function (cfg) { setupConverter(cfg); });

  // Standalone single-page converters
  var standaloneConfigs = [
    { panelId: 'standalone-length',      category: 'length',      defaultFrom: 'Meter',        defaultTo: 'Foot' },
    { panelId: 'standalone-weight',      category: 'weight',      defaultFrom: 'Kilogram',     defaultTo: 'Pound' },
    { panelId: 'standalone-temperature', category: 'temperature', defaultFrom: 'Celsius',      defaultTo: 'Fahrenheit' },
    { panelId: 'standalone-area',        category: 'area',        defaultFrom: 'Square Meter', defaultTo: 'Square Foot' },
    { panelId: 'standalone-volume',      category: 'volume',      defaultFrom: 'Liter',        defaultTo: 'Gallon' },
    { panelId: 'standalone-speed',       category: 'speed',       defaultFrom: 'km/h',         defaultTo: 'mph' },
    { panelId: 'standalone-time',        category: 'time',        defaultFrom: 'Hour',         defaultTo: 'Minute' },
    { panelId: 'standalone-data',        category: 'data',        defaultFrom: 'GB',           defaultTo: 'MB' },
    { panelId: 'standalone-height',      category: 'height',      defaultFrom: 'Centimeter',   defaultTo: 'Foot' },
  ];

  standaloneConfigs.forEach(function (cfg) { setupConverter(cfg); });

});
