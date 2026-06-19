/* =====================================================
   LAKSHMI TEXTILE — CHARTS MODULE
   Chart.js visualizations with glassmorphic styling
   ===================================================== */

/* ─── SHARED CHART DEFAULTS ─── */
const CHART_COLORS = {
  violet:  'rgba(124, 58, 237, 0.85)',
  cyan:    'rgba(6, 182, 212, 0.85)',
  gold:    'rgba(245, 158, 11, 0.85)',
  emerald: 'rgba(16, 185, 129, 0.85)',
  red:     'rgba(239, 68, 68, 0.85)',
  blue:    'rgba(59, 130, 246, 0.85)',
  pink:    'rgba(236, 72, 153, 0.85)',
  orange:  'rgba(249, 115, 22, 0.85)',
};

const PALETTE = Object.values(CHART_COLORS);

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { family: "'Inter', sans-serif", size: 11 },
        usePointStyle: true,
        pointStyleWidth: 8,
      }
    },
    tooltip: {
      backgroundColor: 'rgba(10, 15, 35, 0.95)',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      padding: 12,
      cornerRadius: 10,
      titleFont: { family: "'Inter', sans-serif", size: 12, weight: '600' },
      bodyFont:  { family: "'Inter', sans-serif", size: 11 },
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: '#475569', font: { family: "'Inter', sans-serif", size: 10 } },
      border: { color: 'rgba(255,255,255,0.06)' }
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: '#475569', font: { family: "'Inter', sans-serif", size: 10 } },
      border: { color: 'rgba(255,255,255,0.06)' }
    }
  }
};

/* Active chart instances (for cleanup) */
const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

/* ─── 1. SALES VS EXPENSE AREA CHART ─── */
function renderSalesExpenseChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const monthlySales   = SalesDB.getMonthlySummary();
  const monthlyOrders  = {};
  OrderDB.getAll().forEach(o => {
    const key = o.orderDate ? o.orderDate.slice(0, 7) : '';
    if (!key) return;
    if (!monthlyOrders[key]) monthlyOrders[key] = 0;
    monthlyOrders[key] += o.totalCost;
  });

  // Build last 6 months labels
  const labels = [];
  const salesData = [];
  const expenseData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = d.toISOString().slice(0, 7);
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    labels.push(label);
    salesData.push(monthlySales[key] || 0);
    expenseData.push(monthlyOrders[key] || 0);
  }

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Sales Revenue (₹)',
          data: salesData,
          borderColor: CHART_COLORS.cyan,
          backgroundColor: 'rgba(6,182,212,0.12)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: CHART_COLORS.cyan,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2.5,
        },
        {
          label: 'Purchase Expense (₹)',
          data: expenseData,
          borderColor: CHART_COLORS.orange,
          backgroundColor: 'rgba(249,115,22,0.08)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: CHART_COLORS.orange,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2.5,
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ₹${Number(ctx.raw).toLocaleString('en-IN')}`
          }
        }
      }
    }
  });
}

/* ─── 2. STOCK VALUE DONUT CHART ─── */
function renderStockDonutChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const breakdown = getCategoryBreakdown();
  const labels = Object.keys(breakdown);
  const data   = Object.values(breakdown);

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: PALETTE,
        borderColor: 'rgba(10,15,35,0.8)',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: CHART_DEFAULTS.plugins.legend,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ₹${Number(ctx.raw).toLocaleString('en-IN')}`
          }
        }
      }
    }
  });
}

/* ─── 3. PROFIT MARGIN BAR CHART ─── */
function renderProfitBarChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const catProfit = {};
  StockDB.getAll().forEach(item => {
    const margin = ((item.sellPrice - item.buyPrice) / item.sellPrice) * 100;
    if (!catProfit[item.category]) catProfit[item.category] = [];
    catProfit[item.category].push(margin);
  });

  const labels = Object.keys(catProfit);
  const data   = labels.map(cat => {
    const arr = catProfit[cat];
    return arr.reduce((s, v) => s + v, 0) / arr.length;
  });

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Avg Profit Margin (%)',
        data,
        backgroundColor: labels.map((_, i) => PALETTE[i % PALETTE.length]),
        borderColor: 'transparent',
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` Margin: ${Number(ctx.raw).toFixed(1)}%`
          }
        }
      }
    }
  });
}

/* ─── 4. SUPPLIER SPEND PIE CHART ─── */
function renderSupplierSpendChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const spend = getSupplierSpend();
  const labels = Object.keys(spend);
  const data   = Object.values(spend);

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: PALETTE,
        borderColor: 'rgba(10,15,35,0.8)',
        borderWidth: 3,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: CHART_DEFAULTS.plugins.legend,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ₹${Number(ctx.raw).toLocaleString('en-IN')}`
          }
        }
      }
    }
  });
}

/* ─── 5. ORDER HISTORY BAR CHART ─── */
function renderOrderHistoryChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const orders = OrderDB.getAll().slice(0, 10).reverse();
  const labels  = orders.map(o => `${o.item.substring(0,12)}...`);
  const data    = orders.map(o => o.totalCost);
  const colors  = orders.map(o => {
    if (o.status === 'delivered') return CHART_COLORS.emerald;
    if (o.status === 'transit')   return CHART_COLORS.cyan;
    return CHART_COLORS.gold;
  });

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Order Value (₹)',
        data,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      indexAxis: 'y',
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ₹${Number(ctx.raw).toLocaleString('en-IN')}`
          }
        }
      },
      scales: {
        x: CHART_DEFAULTS.scales.x,
        y: { ...CHART_DEFAULTS.scales.y, grid: { display: false } }
      }
    }
  });
}

/* ─── 6. SVG PROGRESS RING ─── */
function renderProgressRing(svgId, pct, color = '#7c3aed', label = '') {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const r = 42, cx = 52, cy = 52;
  const circ = 2 * Math.PI * r;
  const fill = circ * Math.min(pct / 100, 1);
  svg.innerHTML = `
    <svg width="104" height="104" viewBox="0 0 104 104">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="10"
        stroke-dasharray="${fill} ${circ}" stroke-dashoffset="${circ * 0.25}"
        stroke-linecap="round" style="transition: stroke-dasharray 1s ease"/>
      <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central"
        fill="#f1f5f9" font-size="15" font-weight="800" font-family="Inter,sans-serif">
        ${Math.round(pct)}%
      </text>
    </svg>
  `;
}

/* ─── 7. WASTAGE GAUGE ─── */
function renderWastageGauge(containerId, pct) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const angle = Math.min(pct, 100) * 1.8; // 0-180 degrees
  const color = pct < 5 ? '#22c55e' : pct < 15 ? '#f97316' : '#ef4444';
  el.innerHTML = `
    <div style="position:relative;width:180px;height:100px;margin:0 auto;">
      <svg width="180" height="100" viewBox="0 0 180 100">
        <path d="M 10 90 A 80 80 0 0 1 170 90" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="14" stroke-linecap="round"/>
        <path d="M 10 90 A 80 80 0 0 1 170 90" fill="none" stroke="${color}" stroke-width="14"
          stroke-linecap="round" stroke-dasharray="${angle * 2.51} 251" style="filter:drop-shadow(0 0 6px ${color})"/>
        <text x="90" y="80" text-anchor="middle" fill="#f1f5f9" font-size="18" font-weight="800" font-family="Inter,sans-serif">${pct.toFixed(1)}%</text>
        <text x="90" y="96" text-anchor="middle" fill="#475569" font-size="9" font-family="Inter,sans-serif">LOSS OF SALES</text>
      </svg>
    </div>
  `;
}
