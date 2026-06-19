/* =====================================================
   LAKSHMI TEXTILE — MAIN APP CONTROLLER
   Wires all modules together, renders all sections
   ===================================================== */

/* ─── APP INITIALIZATION ─── */
function initApp() {
  const role = getCurrentRole();
  if (!role) return;

  currentRole = role;

  // Update header
  const badge = document.getElementById('user-badge');
  if (badge) badge.innerHTML = `${role.icon} ${role.id.charAt(0).toUpperCase() + role.id.slice(1)}`;

  const dateEl = document.getElementById('header-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  }

  // Show/hide nav tabs based on role
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const tabId = tab.dataset.tab;
    if (role.tabs.includes(tabId)) {
      tab.style.display = '';
    } else {
      tab.style.display = 'none';
    }
  });

  // Switch to first allowed tab
  const firstTab = role.tabs[0];
  switchTab(firstTab);

  // Apply translations
  applyTranslations();
}

/* ─── TAB NAVIGATION ─── */
let activeTab = 'dashboard';

function switchTab(tabId) {
  if (!guardNav(tabId)) {
    showToast('Access denied for your role.', 'error');
    return;
  }

  activeTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Show/hide panels
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`section-${tabId}`);
  if (panel) panel.classList.add('active');

  // Load content for tab
  switch (tabId) {
    case 'dashboard':   loadDashboard();    break;
    case 'billing':     loadBilling();      break;
    case 'stock':       loadStock();        break;
    case 'supplier':    loadSupplier();     break;
    case 'calculators': initCalculators();  break;
    case 'reports':     loadReports();      break;
  }
}

/* ─── MODAL HELPERS ─── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

// Close on backdrop click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

/* ═══════════════════════════════════════════════════ */
/*  DASHBOARD                                          */
/* ═══════════════════════════════════════════════════ */
function loadDashboard() {
  renderMetricsGrid();
  renderLowStockAlerts();
  renderRecentSalesTable();
  renderTargetRings();

  setTimeout(() => {
    renderSalesExpenseChart('chart-sales-expense');
    renderStockDonutChart('chart-stock-donut');
  }, 100);
}

function renderMetricsGrid() {
  const totalRevenue  = SalesDB.getTotalRevenue();
  const monthRevenue  = SalesDB.getMonthRevenue();
  const netProfit     = SalesDB.getNetProfit();
  const stockVal      = getStockValue();
  const wasteLoss     = WastageDB.getTotalLoss();
  const activeOrders  = OrderDB.getActive().length;

  const grid = document.getElementById('metrics-grid');
  if (!grid) return;

  grid.innerHTML = `
    ${metricCard('mc-violet', '₹', fmtRupee(totalRevenue), t('dash.total.earn'), 'Lifetime')}
    ${metricCard('mc-cyan',   '📅', fmtRupee(monthRevenue), t('dash.month.earn'), 'This month')}
    ${metricCard('mc-green',  '📈', fmtRupee(netProfit),    t('dash.net.profit'), 'Estimated')}
    ${metricCard('mc-gold',   '📦', fmtRupee(stockVal),     t('dash.stock.val'), 'Current stock')}
    ${metricCard('mc-red',    '⚠️', fmtRupee(wasteLoss),   t('dash.wastage'), 'Total loss')}
    ${metricCard('mc-violet', '🚚', activeOrders,           t('dash.orders'), 'In progress')}
  `;

  // Animate numbers
  grid.querySelectorAll('.metric-value').forEach(el => {
    el.style.animation = 'countUp 0.6s ease both';
  });
}

function metricCard(colorClass, icon, value, label, sub) {
  return `
    <div class="glass-card metric-card ${colorClass}">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="metric-sub">${icon} ${sub}</div>
    </div>
  `;
}

function renderLowStockAlerts() {
  const container = document.getElementById('low-stock-alerts');
  if (!container) return;

  const lowItems = StockDB.getLowStock();
  if (lowItems.length === 0) {
    container.innerHTML = `<div class="empty-state" style="padding:30px;">
      <div class="empty-icon">✅</div>
      <div class="empty-text">All stock levels are healthy!</div>
    </div>`;
    return;
  }

  container.innerHTML = lowItems.map(item => {
    const status = StockDB.getStatus(item);
    const cls    = status === 'out' ? '' : 'warning';
    const icon   = status === 'out' ? '🔴' : '🟡';
    return `
      <div class="alert-card ${cls}">
        <span class="alert-icon">${icon}</span>
        <div class="alert-text">
          <strong>${item.name}</strong><br/>
          ${item.qty} ${item.unit} remaining (reorder at ${item.reorderAt})
        </div>
        <button class="btn btn-ghost" style="padding:5px 10px;font-size:11px;" onclick="openNewOrderModal()">Order</button>
      </div>
    `;
  }).join('');
}

function renderRecentSalesTable() {
  const tbody  = document.getElementById('recent-sales-body');
  const badge  = document.getElementById('sales-count-badge');
  const sales  = SalesDB.getAll().slice(0, 10);
  const today  = todayStr();
  const todayCt= sales.filter(s => s.date === today).length;

  if (badge) badge.textContent = `${todayCt} Sales Today`;

  if (!tbody) return;
  if (sales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:30px;">No sales recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = sales.map(s => `
    <tr>
      <td>${fmtDate(s.date)}</td>
      <td>${s.items.map(i => i.name).join(', ')}</td>
      <td>${s.items.map(i => `${i.qty} ${i.unit}`).join(', ')}</td>
      <td style="color:var(--accent-gold);font-weight:700;">${fmtRupee(s.total)}</td>
    </tr>
  `).join('');
}

function renderTargetRings() {
  const container = document.getElementById('target-rings');
  if (!container) return;

  const settings   = SettingsDB.get();
  const target     = settings.monthlyTarget || 200000;
  const monthRev   = SalesDB.getMonthRevenue();
  const pct        = (monthRev / target) * 100;

  const profit     = SalesDB.getNetProfit();
  const totalRev   = SalesDB.getTotalRevenue();
  const profitPct  = totalRev > 0 ? (profit / totalRev) * 100 : 0;

  const stockVal   = getStockValue();
  const maxStock   = 1000000; // 10 lakh ref
  const stockPct   = (stockVal / maxStock) * 100;

  container.innerHTML = `
    <div class="ring-container">
      <div id="ring-monthly"></div>
      <div class="ring-label">Monthly Sales<br/><strong style="color:#f1f5f9;">${Math.round(pct)}% of Target</strong></div>
    </div>
    <div class="ring-container">
      <div id="ring-profit"></div>
      <div class="ring-label">Profit Margin<br/><strong style="color:#f1f5f9;">${profitPct.toFixed(1)}% avg</strong></div>
    </div>
    <div class="ring-container">
      <div id="ring-stock"></div>
      <div class="ring-label">Stock Utilization<br/><strong style="color:#f1f5f9;">${Math.round(stockPct)}% capacity</strong></div>
    </div>
  `;

  setTimeout(() => {
    renderProgressRing('ring-monthly', pct,      '#7c3aed');
    renderProgressRing('ring-profit',  profitPct, '#06b6d4');
    renderProgressRing('ring-stock',   stockPct,  '#f59e0b');
  }, 50);
}

/* ═══════════════════════════════════════════════════ */
/*  BILLING (POS)                                      */
/* ═══════════════════════════════════════════════════ */
const CATEGORIES = [
  { id: 'Saree',         icon: '👘', label: 'Saree' },
  { id: 'Fabric Than',  icon: '🎀', label: 'Fabric Than' },
  { id: 'Kurta',        icon: '👕', label: 'Kurta' },
  { id: 'Kurti',        icon: '👗', label: 'Kurti' },
  { id: 'Dhoti/Lungi',  icon: '🩱', label: 'Dhoti/Lungi' },
  { id: 'Dupatta',      icon: '🧣', label: 'Dupatta' },
  { id: 'Dress Material', icon: '🪡', label: 'Dress Material' },
  { id: 'Accessories',  icon: '🔘', label: 'Accessories' },
];

let billItems         = [];
let selectedBillCat   = null;

function loadBilling() {
  renderCategoryGrid();
  renderBillItems();
}

function renderCategoryGrid() {
  const grid = document.getElementById('cat-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-card ${selectedBillCat === cat.id ? 'active' : ''}" onclick="selectBillingCat('${cat.id}')">
      <span class="cat-icon">${cat.icon}</span>
      <span>${cat.label}</span>
    </button>
  `).join('');
}

function selectBillingCat(catId) {
  selectedBillCat = catId;
  renderCategoryGrid();

  const items = StockDB.getAll().filter(i => i.category === catId && i.qty > 0);
  const sel   = document.getElementById('billing-item-select');
  if (!sel) return;

  sel.innerHTML = '<option value="">-- Select Item --</option>' +
    items.map(i => `<option value="${i.id}">${i.name} (${i.qty} ${i.unit} left) — ₹${i.sellPrice}</option>`).join('');

  sel.onchange = () => {
    const item = StockDB.getById(sel.value);
    const prev = document.getElementById('billing-item-preview');
    if (item && prev) {
      prev.style.display = '';
      document.getElementById('billing-preview-name').textContent  = item.name;
      document.getElementById('billing-preview-price').textContent = fmtRupee(item.sellPrice);
    } else if (prev) {
      prev.style.display = 'none';
    }
  };
}

function adjustBillingQty(delta) {
  const input = document.getElementById('billing-qty');
  if (!input) return;
  const cur = parseFloat(input.value) || 1;
  input.value = Math.max(0.5, cur + delta);
}

function addToBill() {
  const sel  = document.getElementById('billing-item-select');
  const qty  = parseFloat(document.getElementById('billing-qty')?.value) || 1;
  if (!sel || !sel.value) { showToast('Please select an item!', 'warning'); return; }

  const item = StockDB.getById(sel.value);
  if (!item) return;

  const existing = billItems.find(bi => bi.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    billItems.push({ id: item.id, name: item.name, unit: item.unit, qty, unitPrice: item.sellPrice, stockId: item.id });
  }

  renderBillItems();
  document.getElementById('billing-qty').value = 1;
}

function removeFromBill(itemId) {
  billItems = billItems.filter(i => i.id !== itemId);
  renderBillItems();
}

function renderBillItems() {
  const list     = document.getElementById('bill-items-list');
  const empty    = document.getElementById('bill-empty');
  const totalsEl = document.getElementById('bill-totals');
  const badge    = document.getElementById('bill-item-count');

  if (!list) return;

  if (billItems.length === 0) {
    if (empty)    empty.style.display    = '';
    if (totalsEl) totalsEl.style.display = 'none';
    if (badge)    badge.textContent      = '0 items';
    list.innerHTML = `<div class="empty-state" id="bill-empty"><div class="empty-icon">🧾</div><div class="empty-text" data-i18n="billing.empty">No items added yet</div></div>`;
    return;
  }

  if (empty)    empty.style.display    = 'none';
  if (totalsEl) totalsEl.style.display = '';
  if (badge)    badge.textContent      = `${billItems.length} item${billItems.length !== 1 ? 's' : ''}`;

  const subtotal = billItems.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const gst      = subtotal * 0.05;
  const total    = subtotal + gst;

  list.innerHTML = billItems.map(item => `
    <div class="bill-item-row">
      <div>
        <div class="fs-sm fw-600 text-primary">${item.name}</div>
        <div class="fs-xs text-muted">${item.qty} ${item.unit} × ${fmtRupee(item.unitPrice)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="fw-700 text-gold">${fmtRupee(item.qty * item.unitPrice)}</span>
        <button onclick="removeFromBill('${item.id}')" style="background:none;border:none;color:var(--status-red);cursor:pointer;font-size:16px;">✕</button>
      </div>
    </div>
  `).join('');

  document.getElementById('bill-subtotal').textContent = fmtRupee(subtotal);
  document.getElementById('bill-gst').textContent      = fmtRupee(gst);
  document.getElementById('bill-total').textContent    = fmtRupee(total);
}

function completeSale() {
  if (billItems.length === 0) { showToast('Bill is empty!', 'warning'); return; }

  const subtotal = billItems.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const gst      = subtotal * 0.05;
  const total    = subtotal + gst;

  // Record sale
  const sale = { items: billItems.map(i => ({ name: i.name, qty: i.qty, unit: i.unit, unitPrice: i.unitPrice })), subtotal, gst, total, stockItemId: billItems[0]?.stockId };
  SalesDB.add(sale);

  // Deduct stock
  billItems.forEach(item => {
    StockDB.adjustQty(item.stockId, -item.qty, 'inDukaan');
  });

  showToast(t('billing.success'), 'success');
  clearBill();
}

function clearBill() {
  billItems = [];
  renderBillItems();
}

/* ═══════════════════════════════════════════════════ */
/*  STOCK MANAGER                                      */
/* ═══════════════════════════════════════════════════ */
let stockFilter = 'all';

function loadStock() {
  renderStockTable();
}

function setStockFilter(f) {
  stockFilter = f;
  document.querySelectorAll('[id^="filter-"]').forEach(btn => {
    btn.className = btn.id === `filter-${f}` ? 'btn btn-primary' : 'btn btn-ghost';
  });
  renderStockTable();
}

function renderStockTable() {
  const tbody  = document.getElementById('stock-table-body');
  const badge  = document.getElementById('stock-count-badge');
  const search = (document.getElementById('stock-search')?.value || '').toLowerCase();

  let items = StockDB.getAll();

  // Filter by location
  if (stockFilter === 'godown') items = items.filter(i => i.inGodown > 0);
  if (stockFilter === 'dukaan') items = items.filter(i => i.inDukaan > 0);
  if (stockFilter === 'low')    items = items.filter(i => StockDB.getStatus(i) !== 'ok');

  // Search
  if (search) items = items.filter(i =>
    i.name.toLowerCase().includes(search) ||
    i.category.toLowerCase().includes(search) ||
    (i.location || '').toLowerCase().includes(search)
  );

  if (badge) badge.textContent = `${items.length} items`;

  if (!tbody) return;
  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:40px;">No items found.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(item => {
    const status = StockDB.getStatus(item);
    const badgeCls = { ok: 'badge-green', low: 'badge-orange', out: 'badge-red' }[status];
    const badgeTxt = { ok: t('stock.status.ok'), low: t('stock.status.low'), out: t('stock.status.out') }[status];

    return `
      <tr>
        <td>
          <div class="fw-600 text-primary">${item.name}</div>
          <div class="fs-xs text-muted">${item.location || '-'}</div>
        </td>
        <td><span class="badge badge-violet">${item.category}</span></td>
        <td>
          <div class="qty-control">
            <button class="qty-btn minus" onclick="quickAdjust('${item.id}', -1)">−</button>
            <div class="qty-val">
              <div style="font-size:13px;font-weight:700;">${item.inGodown || 0} + ${item.inDukaan || 0}</div>
              <div style="font-size:10px;color:var(--text-muted);">${item.unit}</div>
            </div>
            <button class="qty-btn plus" onclick="quickAdjust('${item.id}', 1)">+</button>
          </div>
        </td>
        <td class="text-muted">${fmtRupee(item.buyPrice)}</td>
        <td class="text-gold fw-600">${fmtRupee(item.sellPrice)}</td>
        <td class="text-muted fs-xs">${item.location || '-'}</td>
        <td><span class="badge ${badgeCls}">${badgeTxt}</span></td>
        <td>
          <div style="display:flex;gap:4px;">
            <button class="btn btn-ghost btn-icon" onclick="editItem('${item.id}')" data-tooltip="Edit item" style="font-size:13px;">✏️</button>
            <button class="btn btn-danger btn-icon" onclick="deleteItem('${item.id}')" data-tooltip="Delete item" style="font-size:13px;">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function quickAdjust(id, delta) {
  StockDB.adjustQty(id, delta, 'inGodown');
  renderStockTable();
  showToast(t('stock.qty.update'), 'success');
}

function openAddItemModal() { openModal('modal-add-item'); }

function saveNewItem() {
  const name   = document.getElementById('ni-name')?.value.trim();
  const cat    = document.getElementById('ni-cat')?.value;
  const unit   = document.getElementById('ni-unit')?.value;
  const godown = parseInt(document.getElementById('ni-godown-qty')?.value) || 0;
  const dukaan = parseInt(document.getElementById('ni-dukaan-qty')?.value) || 0;
  const buy    = parseFloat(document.getElementById('ni-buy')?.value) || 0;
  const sell   = parseFloat(document.getElementById('ni-sell')?.value) || 0;
  const loc    = document.getElementById('ni-location')?.value.trim();
  const reorder= parseInt(document.getElementById('ni-reorder')?.value) || 5;

  if (!name) { showToast('Item name is required!', 'warning'); return; }

  StockDB.add({ name, category: cat, unit, inGodown: godown, inDukaan: dukaan, qty: godown + dukaan, buyPrice: buy, sellPrice: sell, location: loc, reorderAt: reorder });
  closeModal('modal-add-item');
  renderStockTable();
  showToast('New item added!', 'success');

  // Reset
  ['ni-name','ni-location'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['ni-godown-qty','ni-dukaan-qty','ni-buy','ni-sell','ni-reorder'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function deleteItem(id) {
  if (!confirm('Delete this item? This cannot be undone.')) return;
  StockDB.delete(id);
  renderStockTable();
  showToast('Item deleted.', 'info');
}

function editItem(id) {
  // Simple: open add modal pre-filled
  const item = StockDB.getById(id);
  if (!item) return;
  openModal('modal-add-item');
  setTimeout(() => {
    const set = (elId, val) => { const el = document.getElementById(elId); if (el) el.value = val; };
    set('ni-name', item.name); set('ni-cat', item.category); set('ni-unit', item.unit);
    set('ni-godown-qty', item.inGodown); set('ni-dukaan-qty', item.inDukaan);
    set('ni-buy', item.buyPrice); set('ni-sell', item.sellPrice);
    set('ni-location', item.location); set('ni-reorder', item.reorderAt);
    // Override save to update instead of add
    document.querySelector('#modal-add-item .btn-primary').onclick = () => {
      StockDB.update(id, {
        name: document.getElementById('ni-name').value,
        inGodown: parseInt(document.getElementById('ni-godown-qty').value)||0,
        inDukaan: parseInt(document.getElementById('ni-dukaan-qty').value)||0,
        qty: (parseInt(document.getElementById('ni-godown-qty').value)||0)+(parseInt(document.getElementById('ni-dukaan-qty').value)||0),
        buyPrice: parseFloat(document.getElementById('ni-buy').value)||0,
        sellPrice: parseFloat(document.getElementById('ni-sell').value)||0,
        location: document.getElementById('ni-location').value,
        reorderAt: parseInt(document.getElementById('ni-reorder').value)||5,
      });
      closeModal('modal-add-item');
      renderStockTable();
      showToast('Item updated!', 'success');
      document.querySelector('#modal-add-item .btn-primary').onclick = saveNewItem;
    };
  }, 100);
}

function openWastageModal() {
  const sel = document.getElementById('waste-item-select');
  if (sel) {
    sel.innerHTML = StockDB.getAll().map(i => `<option value="${i.id}">${i.name} (${i.qty} ${i.unit})</option>`).join('');
    sel.onchange = () => updateWastePreview();
  }
  const qtyInput = document.getElementById('waste-qty-input');
  if (qtyInput) qtyInput.oninput = updateWastePreview;
  openModal('modal-wastage');
}

function updateWastePreview() {
  const sel  = document.getElementById('waste-item-select');
  const qty  = parseFloat(document.getElementById('waste-qty-input')?.value) || 0;
  const item = sel ? StockDB.getById(sel.value) : null;
  const prev = document.getElementById('waste-loss-preview');
  const est  = document.getElementById('waste-loss-est');
  if (item && prev && est) {
    prev.style.display = '';
    est.textContent = fmtRupee(qty * item.buyPrice);
  }
}

function saveWastage() {
  const sel    = document.getElementById('waste-item-select');
  const qty    = parseFloat(document.getElementById('waste-qty-input')?.value) || 0;
  const reason = document.getElementById('waste-reason')?.value || 'Not specified';
  const item   = sel ? StockDB.getById(sel.value) : null;
  if (!item || qty <= 0) { showToast('Select item and enter quantity!', 'warning'); return; }

  WastageDB.add({ item: item.name, meters: qty, costPerMeter: item.buyPrice, totalLoss: qty * item.buyPrice, reason, stockItemId: item.id });
  closeModal('modal-wastage');
  renderStockTable();
  showToast('Wastage logged and stock updated!', 'warning');
}

function openTransferModal() {
  const sel = document.getElementById('transfer-item-select');
  if (sel) {
    sel.innerHTML = StockDB.getAll().filter(i => i.inGodown > 0).map(i => `<option value="${i.id}">${i.name} (Godown: ${i.inGodown} ${i.unit})</option>`).join('');
    sel.onchange = updateTransferPreview;
    updateTransferPreview();
  }
  openModal('modal-transfer');
}

function updateTransferPreview() {
  const sel  = document.getElementById('transfer-item-select');
  const item = sel ? StockDB.getById(sel.value) : null;
  const prev = document.getElementById('transfer-preview');
  if (item && prev) {
    prev.style.display = '';
    document.getElementById('tp-godown').textContent = `${item.inGodown} ${item.unit}`;
    document.getElementById('tp-dukaan').textContent = `${item.inDukaan} ${item.unit}`;
  }
}

function saveTransfer() {
  const sel  = document.getElementById('transfer-item-select');
  const qty  = parseInt(document.getElementById('transfer-qty')?.value) || 0;
  const item = sel ? StockDB.getById(sel.value) : null;
  if (!item || qty <= 0)             { showToast('Enter a valid quantity!', 'warning'); return; }
  if (qty > (item.inGodown || 0))    { showToast('Not enough Godown stock!', 'error'); return; }

  StockDB.adjustQty(item.id, -qty, 'inGodown');
  StockDB.adjustQty(item.id,  qty, 'inDukaan');
  closeModal('modal-transfer');
  renderStockTable();
  showToast(`${qty} ${item.unit} transferred to Dukaan!`, 'success');
}

/* ═══════════════════════════════════════════════════ */
/*  SUPPLIER HUB                                       */
/* ═══════════════════════════════════════════════════ */
function loadSupplier() {
  renderSupplierMetrics();
  renderSupplierCards();
  renderOrderPipeline();
  setTimeout(() => {
    renderOrderHistoryChart('chart-order-history');
    renderSupplierSpendChart('chart-supplier-spend');
  }, 100);
}

function renderSupplierMetrics() {
  const grid = document.getElementById('supplier-metrics');
  if (!grid) return;
  const active   = OrderDB.getActive().length;
  const monthSpd = OrderDB.getMonthSpend();
  const totalSpd = OrderDB.getTotalSpend();
  const vyaCount = SupplierDB.getAll().length;

  grid.innerHTML = `
    ${metricCard('mc-violet', '🤝', vyaCount, 'Total Vyapaari', 'Partners')}
    ${metricCard('mc-gold',   '🟠', active, 'Active Orders', 'Pending + Transit')}
    ${metricCard('mc-cyan',   '💸', fmtRupee(monthSpd), 'This Month Purchase', 'Khareedi')}
    ${metricCard('mc-red',    '📊', fmtRupee(totalSpd), 'Total Spend (All Time)', 'All orders')}
  `;
}

function renderSupplierCards() {
  const container = document.getElementById('supplier-cards');
  if (!container) return;
  const suppliers = SupplierDB.getAll();

  if (suppliers.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🤝</div><div class="empty-text">No Vyapaaris added yet.</div></div>`;
    return;
  }

  container.innerHTML = suppliers.map(s => `
    <div class="glass-card supplier-card">
      <div class="supplier-name">${s.name}</div>
      <div class="supplier-meta">📍 ${s.city} · 🧵 ${s.specialty}</div>
      <div class="supplier-meta" style="color:var(--text-muted);font-size:11px;">GSTIN: ${s.gstin || 'N/A'}</div>
      <div class="supplier-actions">
        <a href="https://wa.me/91${s.phone}?text=Namaste%20${encodeURIComponent(s.name)}%2C%20Lakshmi%20Textile%20mein%20se%20baat%20kar%20rahe%20hain.%20Hume%20${encodeURIComponent(s.specialty)}%20ke%20liye%20order%20karna%20hai.%20Kripya%20confirm%20karein.%20Dhanyawad!"
           target="_blank" class="btn btn-emerald" style="padding:7px 12px;font-size:12px;text-decoration:none;">
          📱 WhatsApp
        </a>
        <button class="btn btn-primary" onclick="openNewOrderModal('${s.id}')" style="padding:7px 12px;font-size:12px;" data-i18n="supplier.new.order">📝 Order</button>
        <button class="btn btn-danger btn-icon" onclick="deleteSupplier('${s.id}')" style="font-size:12px;">🗑️</button>
      </div>
    </div>
  `).join('');
}

function deleteSupplier(id) {
  if (!confirm('Remove this Vyapaari?')) return;
  SupplierDB.delete(id);
  renderSupplierCards();
  showToast('Vyapaari removed.', 'info');
}

function renderOrderPipeline() {
  const orders = OrderDB.getAll();
  const pending   = orders.filter(o => o.status === 'pending');
  const transit   = orders.filter(o => o.status === 'transit');
  const delivered = orders.filter(o => o.status === 'delivered').slice(0, 5);

  const renderCard = (o) => `
    <div class="order-card">
      <div class="order-card-title">${o.item}</div>
      <div class="order-card-sub">
        🤝 ${o.supplierName}<br/>
        📦 ${o.qty} ${o.unit} · ${fmtRupee(o.totalCost)}<br/>
        📅 Ordered: ${fmtDate(o.orderDate)}
        ${o.deliveredDate ? `<br/>✅ Delivered: ${fmtDate(o.deliveredDate)}` : ''}
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${o.status === 'pending' ? `<button class="btn btn-cyan" style="padding:5px 10px;font-size:11px;" onclick="updateOrderStatus('${o.id}','transit')">🚚 Mark Transit</button>` : ''}
        ${o.status !== 'delivered' ? `<button class="btn btn-emerald" style="padding:5px 10px;font-size:11px;" onclick="receiveOrder('${o.id}')">✅ Maal Mila</button>` : ''}
      </div>
    </div>
  `;

  const emptyCard = (msg) => `<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:20px;">${msg}</div>`;

  document.getElementById('pipeline-pending').innerHTML   = pending.length   ? pending.map(renderCard).join('')   : emptyCard('No pending orders');
  document.getElementById('pipeline-transit').innerHTML   = transit.length   ? transit.map(renderCard).join('')   : emptyCard('Nothing in transit');
  document.getElementById('pipeline-delivered').innerHTML = delivered.length ? delivered.map(renderCard).join('') : emptyCard('No deliveries yet');
}

function updateOrderStatus(id, status) {
  OrderDB.updateStatus(id, status);
  renderOrderPipeline();
  showToast('Order status updated!', 'info');
}

function receiveOrder(id) {
  OrderDB.receiveStock(id);
  renderOrderPipeline();
  renderStockTable();
  showToast('Stock received and added to Godown!', 'success');
}

function openNewOrderModal(supplierId) {
  const sel = document.getElementById('order-supplier-select');
  if (sel) {
    const suppliers = SupplierDB.getAll();
    sel.innerHTML = suppliers.map(s => `<option value="${s.id}" ${s.id === supplierId ? 'selected' : ''}>${s.name} — ${s.city}</option>`).join('');
  }
  // Live total estimate
  ['order-qty','order-cost'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = updateOrderTotal;
  });
  // Set default date (+7 days)
  const dateEl = document.getElementById('order-date');
  if (dateEl) {
    const d = new Date(); d.setDate(d.getDate() + 7);
    dateEl.value = d.toISOString().split('T')[0];
  }
  openModal('modal-new-order');
}

function updateOrderTotal() {
  const qty  = parseFloat(document.getElementById('order-qty')?.value) || 0;
  const cost = parseFloat(document.getElementById('order-cost')?.value) || 0;
  const el   = document.getElementById('order-total-est');
  if (el) el.textContent = fmtRupee(qty * cost);
}

function saveNewOrder() {
  const supplierId = document.getElementById('order-supplier-select')?.value;
  const itemName   = document.getElementById('order-item-name')?.value.trim();
  const qty        = parseFloat(document.getElementById('order-qty')?.value) || 0;
  const unit       = document.getElementById('order-unit')?.value;
  const cost       = parseFloat(document.getElementById('order-cost')?.value) || 0;
  const expDate    = document.getElementById('order-date')?.value;

  if (!supplierId || !itemName || qty <= 0) { showToast('Fill all required fields!', 'warning'); return; }

  const supplier = SupplierDB.getById(supplierId);
  OrderDB.add({ supplierId, supplierName: supplier?.name || '', item: itemName, qty, unit, costPerUnit: cost, totalCost: qty * cost, expectedDate: expDate });

  closeModal('modal-new-order');
  loadSupplier();
  showToast('Khareedi Order placed!', 'success');

  // Reset
  ['order-item-name','order-qty','order-cost'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function openAddSupplierModal() { openModal('modal-add-supplier'); }

function saveNewSupplier() {
  const name     = document.getElementById('ns-name')?.value.trim();
  const city     = document.getElementById('ns-city')?.value.trim();
  const phone    = document.getElementById('ns-phone')?.value.trim();
  const email    = document.getElementById('ns-email')?.value.trim();
  const specialty= document.getElementById('ns-specialty')?.value.trim();
  const gstin    = document.getElementById('ns-gstin')?.value.trim();

  if (!name || !phone) { showToast('Name and phone are required!', 'warning'); return; }
  SupplierDB.add({ name, city, phone, email, specialty, gstin });
  closeModal('modal-add-supplier');
  renderSupplierCards();
  showToast('Vyapaari added!', 'success');

  ['ns-name','ns-city','ns-phone','ns-email','ns-specialty','ns-gstin'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

/* ═══════════════════════════════════════════════════ */
/*  REPORTS                                            */
/* ═══════════════════════════════════════════════════ */
function loadReports() {
  renderReportMetrics();
  renderWastageTable();
  setTimeout(() => {
    renderSalesExpenseChart('chart-sales-expense-report');
    renderProfitBarChart('chart-profit-bar');
  }, 100);
}

function renderReportMetrics() {
  const grid = document.getElementById('report-metrics');
  if (!grid) return;
  const totalRev = SalesDB.getTotalRevenue();
  const netPrf   = SalesDB.getNetProfit();
  const totalSpd = OrderDB.getTotalSpend();
  const wasteL   = WastageDB.getTotalLoss();

  grid.innerHTML = `
    ${metricCard('mc-cyan',   '📈', fmtRupee(totalRev), 'Total Revenue',       'All time')}
    ${metricCard('mc-green',  '💰', fmtRupee(netPrf),   'Net Profit',          'Estimated')}
    ${metricCard('mc-gold',   '📦', fmtRupee(totalSpd), 'Total Purchases',     'All Khareedi')}
    ${metricCard('mc-red',    '⚠️', fmtRupee(wasteL),  'Total Wastage Loss',  'All time')}
  `;

  const badge = document.getElementById('wastage-total-badge');
  if (badge) badge.textContent = `${fmtRupee(wasteL)} total loss`;
}

function renderWastageTable() {
  const tbody = document.getElementById('wastage-table-body');
  if (!tbody) return;
  const wastage = WastageDB.getAll();

  if (wastage.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:30px;">No wastage recorded.</td></tr>`;
    return;
  }

  tbody.innerHTML = wastage.map(w => `
    <tr>
      <td>${fmtDate(w.date)}</td>
      <td class="text-primary fw-600">${w.item}</td>
      <td>${w.meters || w.qty || '-'}</td>
      <td>${fmtRupee(w.costPerMeter)}</td>
      <td class="text-red fw-700">${fmtRupee(w.totalLoss)}</td>
      <td class="text-muted fs-xs">${w.reason || '-'}</td>
    </tr>
  `).join('');
}

/* ─── STARTUP ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Check if already logged in (session exists)
  if (isLoggedIn()) {
    loadApp();
  } else {
    initPinPad();
  }
  applyTranslations();
  updateLangButtons();
});
