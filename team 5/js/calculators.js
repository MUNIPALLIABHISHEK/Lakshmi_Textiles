/* =====================================================
   LAKSHMI TEXTILE — CALCULATORS MODULE
   4 Interactive textile business calculators
   ===================================================== */

function initCalculators() {
  initKamaaiCalc();
  initGSMCalc();
  initSeasonCalc();
  initWastageCalc();
}

/* ─── 1. KAMAAI (PROFIT MARGIN) CALCULATOR ─── */
function initKamaaiCalc() {
  const fields = ['km-buy', 'km-overhead', 'km-margin'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcKamaai);
  });
  const slider = document.getElementById('km-margin-slider');
  const input  = document.getElementById('km-margin');
  if (slider && input) {
    slider.addEventListener('input', () => { input.value = slider.value; calcKamaai(); });
    input.addEventListener('input',  () => { slider.value = input.value; calcKamaai(); });
  }
  calcKamaai();
}

function calcKamaai() {
  const buy      = parseFloat(document.getElementById('km-buy')?.value) || 0;
  const overhead = parseFloat(document.getElementById('km-overhead')?.value) || 0;
  const margin   = parseFloat(document.getElementById('km-margin')?.value) || 30;
  const settings = SettingsDB.get();
  const gstRate  = (settings.gstRate || 5) / 100;

  const totalCost   = buy + overhead;
  const sellPrice   = totalCost / (1 - margin / 100);
  const profit      = sellPrice - totalCost;
  const markup      = totalCost > 0 ? ((sellPrice - totalCost) / totalCost) * 100 : 0;
  const withGST     = sellPrice * (1 + gstRate);

  setVal('km-res-sell',   fmtRupee(sellPrice));
  setVal('km-res-profit', fmtRupee(profit));
  setVal('km-res-markup', fmtNum(markup, 1) + '%');
  setVal('km-res-gst',    fmtRupee(withGST));

  // Color coding
  const profitEl = document.getElementById('km-res-profit');
  if (profitEl) {
    profitEl.className = 'calc-result-value big ' + (profit > 0 ? 'text-green' : 'text-red');
  }

  // Update slider label
  const labelEl = document.getElementById('km-margin-label');
  if (labelEl) labelEl.textContent = margin + '%';
}

/* ─── 2. THAN GSM CALCULATOR ─── */
function initGSMCalc() {
  ['gsm-weight', 'gsm-width', 'gsm-gsm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcGSM);
  });
  calcGSM();
}

function calcGSM() {
  const weight = parseFloat(document.getElementById('gsm-weight')?.value) || 0;
  const width  = parseFloat(document.getElementById('gsm-width')?.value)  || 0;
  const gsm    = parseFloat(document.getElementById('gsm-gsm')?.value)    || 0;

  let meters = 0;
  if (width > 0 && gsm > 0) {
    // Formula: Length (m) = Weight(g) / (GSM × Width(m))
    meters = (weight * 1000) / (gsm * (width / 100));
  }

  setVal('gsm-res-meters', fmtNum(meters, 2) + ' m');

  // Show a comparison to expected
  const hint = document.getElementById('gsm-res-hint');
  if (hint) {
    if (meters > 0) {
      hint.textContent = `Approx ${Math.round(meters / 0.9144)} yards | ${fmtNum(weight * 1000 / meters, 1)} g/m`;
    } else {
      hint.textContent = 'Enter all values to calculate';
    }
  }
}

/* ─── 3. MAUSAM (SEASONAL) PREDICTOR ─── */
const SEASON_MULTIPLIERS = {
  'wedding':    { label: '💒 Wedding/Shaadi Season',    mult: 1.6  },
  'diwali':     { label: '🪔 Diwali / Deepavali',        mult: 1.8  },
  'pongal':     { label: '🌾 Pongal / Sankranti',        mult: 1.4  },
  'eid':        { label: '🌙 Eid',                       mult: 1.5  },
  'navratri':   { label: '💃 Navratri / Durga Puja',     mult: 1.7  },
  'school':     { label: '🏫 School Reopening',          mult: 1.25 },
  'summer':     { label: '☀️ Summer Season',             mult: 0.85 },
  'monsoon':    { label: '🌧️ Monsoon Off-Season',        mult: 0.75 },
  'normal':     { label: '📅 Normal Month',              mult: 1.0  },
};

function initSeasonCalc() {
  const sel = document.getElementById('season-select');
  if (sel) {
    // Populate options
    sel.innerHTML = Object.entries(SEASON_MULTIPLIERS).map(([k, v]) =>
      `<option value="${k}">${v.label} (${v.mult >= 1 ? '+' : ''}${Math.round((v.mult - 1) * 100)}%)</option>`
    ).join('');
  }
  ['season-sales', 'season-select', 'season-safety'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcSeason);
    if (el) el.addEventListener('change', calcSeason);
  });
  calcSeason();
}

function calcSeason() {
  const lastSales  = parseFloat(document.getElementById('season-sales')?.value) || 0;
  const seasonKey  = document.getElementById('season-select')?.value || 'normal';
  const safetyPct  = parseFloat(document.getElementById('season-safety')?.value) || 10;
  const { mult }   = SEASON_MULTIPLIERS[seasonKey] || { mult: 1 };

  const predicted  = lastSales * mult;
  const withSafety = predicted * (1 + safetyPct / 100);
  const change     = (mult - 1) * 100;

  setVal('season-res-predicted', fmtNum(predicted, 0) + ' units/meters');
  setVal('season-res-order',     fmtNum(withSafety, 0) + ' units/meters');
  setVal('season-res-change',    (change >= 0 ? '+' : '') + fmtNum(change, 0) + '%');

  const changeEl = document.getElementById('season-res-change');
  if (changeEl) {
    changeEl.className = 'calc-result-value ' + (change >= 0 ? 'text-green' : 'text-red');
  }
}

/* ─── 4. KHARAAB MAAL (WASTAGE) CALCULATOR ─── */
function initWastageCalc() {
  ['waste-meters', 'waste-cost', 'waste-sales'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcWastage);
  });
  calcWastage();
}

function calcWastage() {
  const meters  = parseFloat(document.getElementById('waste-meters')?.value) || 0;
  const cost    = parseFloat(document.getElementById('waste-cost')?.value)   || 0;
  const sales   = parseFloat(document.getElementById('waste-sales')?.value)  || 0;

  const totalLoss = meters * cost;
  const lossPct   = sales > 0 ? (totalLoss / sales) * 100 : 0;

  setVal('waste-res-loss', fmtRupee(totalLoss));
  setVal('waste-res-pct',  fmtNum(lossPct, 2) + '%');

  // Severity
  const sev = document.getElementById('waste-res-sev');
  if (sev) {
    if (lossPct === 0)      sev.textContent = '-';
    else if (lossPct < 3)   sev.textContent = '🟢 Low — Good wastage control';
    else if (lossPct < 8)   sev.textContent = '🟡 Medium — Improve handling';
    else                    sev.textContent = '🔴 High — Immediate action needed!';
  }

  // Gauge
  renderWastageGauge('waste-gauge', lossPct);
}

/* ─── HELPER ─── */
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
