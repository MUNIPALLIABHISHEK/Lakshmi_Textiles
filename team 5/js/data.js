/* =====================================================
   LAKSHMI TEXTILE — LOCAL DATA LAYER
   All CRUD operations via localStorage
   Pre-seeded with sample Indian textile data
   ===================================================== */

const DB_KEYS = {
  STOCK:     'lt_stock',
  SALES:     'lt_sales',
  SUPPLIERS: 'lt_suppliers',
  ORDERS:    'lt_orders',
  SETTINGS:  'lt_settings',
  WASTAGE:   'lt_wastage',
};

/* ─── SEED DATA ─── */
const SEED_STOCK = [
  { id: 's1',  name: 'Banarasi Silk Saree - Red',      category: 'Saree',        qty: 24,  unit: 'pcs',    buyPrice: 1800, sellPrice: 2800, location: 'Godown-A/Rack-1', inGodown: 20, inDukaan: 4,  reorderAt: 5  },
  { id: 's2',  name: 'Kanjivaram Silk Saree - Green',  category: 'Saree',        qty: 18,  unit: 'pcs',    buyPrice: 3200, sellPrice: 4800, location: 'Godown-A/Rack-1', inGodown: 14, inDukaan: 4,  reorderAt: 4  },
  { id: 's3',  name: 'Cotton Saree - Blue Border',     category: 'Saree',        qty: 42,  unit: 'pcs',    buyPrice:  650, sellPrice:  950, location: 'Godown-A/Rack-2', inGodown: 36, inDukaan: 6,  reorderAt: 8  },
  { id: 's4',  name: 'Chiffon Saree - Pink',           category: 'Saree',        qty: 6,   unit: 'pcs',    buyPrice:  900, sellPrice: 1400, location: 'Dukaan/Rack-1',  inGodown: 2,  inDukaan: 4,  reorderAt: 6  },
  { id: 's5',  name: 'Cotton Than - White (Plain)',    category: 'Fabric Than',  qty: 320, unit: 'meters',  buyPrice:   80, sellPrice:  130, location: 'Godown-B/Rack-1', inGodown: 280,inDukaan: 40, reorderAt: 50 },
  { id: 's6',  name: 'Silk Fabric Than - Cream',       category: 'Fabric Than',  qty: 145, unit: 'meters',  buyPrice:  220, sellPrice:  380, location: 'Godown-B/Rack-2', inGodown: 120,inDukaan: 25, reorderAt: 30 },
  { id: 's7',  name: 'Linen Shirting - Blue Check',    category: 'Fabric Than',  qty: 85,  unit: 'meters',  buyPrice:  150, sellPrice:  250, location: 'Godown-B/Rack-3', inGodown: 70, inDukaan: 15, reorderAt: 20 },
  { id: 's8',  name: 'Polyester Suiting - Black',      category: 'Fabric Than',  qty: 200, unit: 'meters',  buyPrice:  120, sellPrice:  190, location: 'Godown-B/Rack-3', inGodown: 170,inDukaan: 30, reorderAt: 40 },
  { id: 's9',  name: 'Kurta Material - Khadi',         category: 'Kurta',        qty: 38,  unit: 'pcs',    buyPrice:  280, sellPrice:  450, location: 'Godown-C/Rack-1', inGodown: 30, inDukaan: 8,  reorderAt: 10 },
  { id: 's10', name: 'Kurti Set - Floral Print',       category: 'Kurti',        qty: 55,  unit: 'pcs',    buyPrice:  350, sellPrice:  580, location: 'Godown-C/Rack-1', inGodown: 45, inDukaan: 10, reorderAt: 12 },
  { id: 's11', name: 'Dhoti - White (5 Meters)',       category: 'Dhoti/Lungi',  qty: 3,   unit: 'pcs',    buyPrice:  180, sellPrice:  280, location: 'Godown-C/Rack-2', inGodown: 1,  inDukaan: 2,  reorderAt: 10 },
  { id: 's12', name: 'Lungi - Checked Pattern',        category: 'Dhoti/Lungi',  qty: 28,  unit: 'pcs',    buyPrice:  120, sellPrice:  190, location: 'Godown-C/Rack-2', inGodown: 22, inDukaan: 6,  reorderAt: 8  },
  { id: 's13', name: 'Silk Dupatta - Magenta',         category: 'Dupatta',      qty: 22,  unit: 'pcs',    buyPrice:  400, sellPrice:  650, location: 'Dukaan/Rack-2',  inGodown: 10, inDukaan: 12, reorderAt: 5  },
  { id: 's14', name: 'Dress Material - Georgette',     category: 'Dress Material',qty: 16,  unit: 'pcs',    buyPrice:  550, sellPrice:  890, location: 'Godown-A/Rack-3', inGodown: 12, inDukaan: 4,  reorderAt: 5  },
  { id: 's15', name: 'Tailoring Thread - Black',       category: 'Accessories',  qty: 0,   unit: 'pcs',    buyPrice:   12, sellPrice:   22, location: 'Dukaan/Counter', inGodown: 0,  inDukaan: 0,  reorderAt: 10 },
];

const SEED_SUPPLIERS = [
  { id: 'v1', name: 'Ramesh Fabrics',      city: 'Surat, Gujarat',      phone: '9876543210', email: 'ramesh@surat.com',    specialty: 'Silk & Synthetic Fabrics', gstin: '24ABCDE1234F1Z5' },
  { id: 'v2', name: 'Kavitha Silk House',  city: 'Kanchipuram, Tamil Nadu', phone: '9823456789', email: 'kavitha@silk.com', specialty: 'Kanjivaram & Pure Silk',  gstin: '33FGHIJ5678K2Z6' },
  { id: 'v3', name: 'Mehta Cotton Co.',    city: 'Ahmedabad, Gujarat',  phone: '9812345678', email: 'mehta@cotton.com',    specialty: 'Cotton Thans & Linen',     gstin: '24LMNOP9012L3Z7' },
  { id: 'v4', name: 'Deccan Handlooms',    city: 'Hyderabad, Telangana',phone: '9901234567', email: 'deccan@handloom.com', specialty: 'Ikkat & Pochampally',      gstin: '36QRSTU3456M4Z8' },
  { id: 'v5', name: 'Mumbai Dress Materials', city: 'Mumbai, Maharashtra', phone: '9934567890', email: 'mumbai@dress.com', specialty: 'Dress Materials & Kurtis', gstin: '27VWXYZ7890N5Z9' },
];

const SEED_ORDERS = [
  { id: 'o1', supplierId: 'v1', supplierName: 'Ramesh Fabrics',    item: 'Silk Fabric Than - Cream', qty: 100, unit: 'meters', costPerUnit: 210, totalCost: 21000, status: 'transit',   orderDate: '2026-06-15', expectedDate: '2026-06-22', stockItemId: 's6' },
  { id: 'o2', supplierId: 'v3', supplierName: 'Mehta Cotton Co.',  item: 'Cotton Than - White',       qty: 200, unit: 'meters', costPerUnit:  78, totalCost: 15600, status: 'pending',   orderDate: '2026-06-18', expectedDate: '2026-06-25', stockItemId: 's5' },
  { id: 'o3', supplierId: 'v4', supplierName: 'Deccan Handlooms',  item: 'Dhoti - White (5 Meters)',  qty:  50, unit: 'pcs',    costPerUnit: 175, totalCost:  8750, status: 'pending',   orderDate: '2026-06-19', expectedDate: '2026-06-28', stockItemId: 's11'},
  { id: 'o4', supplierId: 'v2', supplierName: 'Kavitha Silk House',item: 'Kanjivaram Silk Saree',     qty:  20, unit: 'pcs',    costPerUnit:3100, totalCost: 62000, status: 'delivered', orderDate: '2026-06-01', expectedDate: '2026-06-10', stockItemId: 's2', deliveredDate: '2026-06-09' },
  { id: 'o5', supplierId: 'v5', supplierName: 'Mumbai Dress Materials', item: 'Dress Material - Georgette', qty: 30, unit: 'pcs', costPerUnit: 530, totalCost: 15900, status: 'delivered', orderDate: '2026-05-28', expectedDate: '2026-06-05', stockItemId: 's14', deliveredDate: '2026-06-04' },
];

const SEED_SALES = [
  { id: 'sl1', date: '2026-06-19', items: [{ name: 'Kanjivaram Silk Saree - Green', qty: 2, unit: 'pcs', unitPrice: 4800 }], subtotal: 9600, gst: 480, total: 10080, stockItemId: 's2' },
  { id: 'sl2', date: '2026-06-18', items: [{ name: 'Cotton Than - White (Plain)', qty: 10, unit: 'meters', unitPrice: 130 }], subtotal: 1300, gst: 65, total: 1365, stockItemId: 's5' },
  { id: 'sl3', date: '2026-06-17', items: [{ name: 'Banarasi Silk Saree - Red', qty: 3, unit: 'pcs', unitPrice: 2800 }], subtotal: 8400, gst: 420, total: 8820, stockItemId: 's1' },
  { id: 'sl4', date: '2026-06-16', items: [{ name: 'Kurti Set - Floral Print', qty: 5, unit: 'pcs', unitPrice: 580 }], subtotal: 2900, gst: 145, total: 3045, stockItemId: 's10' },
  { id: 'sl5', date: '2026-06-15', items: [{ name: 'Silk Fabric Than - Cream', qty: 8, unit: 'meters', unitPrice: 380 }], subtotal: 3040, gst: 152, total: 3192, stockItemId: 's6' },
  { id: 'sl6', date: '2026-06-14', items: [{ name: 'Linen Shirting - Blue Check', qty: 15, unit: 'meters', unitPrice: 250 }], subtotal: 3750, gst: 188, total: 3938, stockItemId: 's7' },
  { id: 'sl7', date: '2026-06-13', items: [{ name: 'Cotton Saree - Blue Border', qty: 4, unit: 'pcs', unitPrice: 950 }], subtotal: 3800, gst: 190, total: 3990, stockItemId: 's3' },
  { id: 'sl8', date: '2026-06-12', items: [{ name: 'Kurta Material - Khadi', qty: 6, unit: 'pcs', unitPrice: 450 }], subtotal: 2700, gst: 135, total: 2835, stockItemId: 's9' },
  { id: 'sl9', date: '2026-06-11', items: [{ name: 'Silk Dupatta - Magenta', qty: 3, unit: 'pcs', unitPrice: 650 }], subtotal: 1950, gst: 98, total: 2048, stockItemId: 's13' },
  { id: 'sl10',date: '2026-06-10', items: [{ name: 'Banarasi Silk Saree - Red', qty: 2, unit: 'pcs', unitPrice: 2800 }], subtotal: 5600, gst: 280, total: 5880, stockItemId: 's1' },
];

const SEED_WASTAGE = [
  { id: 'w1', date: '2026-06-10', item: 'Cotton Than - White (Plain)', meters: 3, costPerMeter: 80, totalLoss: 240, reason: 'Soiled during transport' },
  { id: 'w2', date: '2026-06-05', item: 'Silk Fabric Than - Cream',   meters: 1.5, costPerMeter: 220, totalLoss: 330, reason: 'Cut-off ends' },
];

const SEED_SETTINGS = {
  shopName: 'Lakshmi Textile',
  ownerName: 'Suresh Babu',
  monthlyTarget: 200000,
  gstRate: 5,
  currency: '₹',
};

/* ─── DATA INITIALIZATION ─── */
function initData() {
  if (!localStorage.getItem(DB_KEYS.STOCK))     localStorage.setItem(DB_KEYS.STOCK,     JSON.stringify(SEED_STOCK));
  if (!localStorage.getItem(DB_KEYS.SUPPLIERS)) localStorage.setItem(DB_KEYS.SUPPLIERS, JSON.stringify(SEED_SUPPLIERS));
  if (!localStorage.getItem(DB_KEYS.ORDERS))    localStorage.setItem(DB_KEYS.ORDERS,    JSON.stringify(SEED_ORDERS));
  if (!localStorage.getItem(DB_KEYS.SALES))     localStorage.setItem(DB_KEYS.SALES,     JSON.stringify(SEED_SALES));
  if (!localStorage.getItem(DB_KEYS.WASTAGE))   localStorage.setItem(DB_KEYS.WASTAGE,   JSON.stringify(SEED_WASTAGE));
  if (!localStorage.getItem(DB_KEYS.SETTINGS))  localStorage.setItem(DB_KEYS.SETTINGS,  JSON.stringify(SEED_SETTINGS));
}

/* ─── GENERIC CRUD ─── */
function dbGet(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function dbSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function dbGetOne(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; }
  catch { return {}; }
}

function generateId(prefix = 'id') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

/* ─── STOCK CRUD ─── */
const StockDB = {
  getAll: ()      => dbGet(DB_KEYS.STOCK),
  save:   (items) => dbSet(DB_KEYS.STOCK, items),

  add(item) {
    const items = this.getAll();
    item.id = generateId('s');
    items.push(item);
    this.save(items);
    return item;
  },

  update(id, updates) {
    const items = this.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...updates }; this.save(items); }
    return items[idx];
  },

  delete(id) {
    const items = this.getAll().filter(i => i.id !== id);
    this.save(items);
  },

  getById: (id) => dbGet(DB_KEYS.STOCK).find(i => i.id === id),

  adjustQty(id, delta, location = 'inDukaan') {
    const items = this.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      items[idx][location] = Math.max(0, (items[idx][location] || 0) + delta);
      items[idx].qty = (items[idx].inGodown || 0) + (items[idx].inDukaan || 0);
      this.save(items);
    }
  },

  getStatus(item) {
    if (item.qty <= 0) return 'out';
    if (item.qty <= item.reorderAt) return 'low';
    return 'ok';
  },

  getLowStock() {
    return this.getAll().filter(i => this.getStatus(i) !== 'ok');
  }
};

/* ─── SALES CRUD ─── */
const SalesDB = {
  getAll: ()      => dbGet(DB_KEYS.SALES),
  save:   (items) => dbSet(DB_KEYS.SALES, items),

  add(sale) {
    const items = this.getAll();
    sale.id = generateId('sl');
    sale.date = todayStr();
    items.unshift(sale);
    this.save(items);
    return sale;
  },

  getThisMonth() {
    const now = new Date();
    return this.getAll().filter(s => {
      const d = new Date(s.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  },

  getTotalRevenue() {
    return this.getAll().reduce((sum, s) => sum + (s.total || 0), 0);
  },

  getMonthRevenue() {
    return this.getThisMonth().reduce((sum, s) => sum + (s.total || 0), 0);
  },

  getNetProfit() {
    return this.getAll().reduce((sum, s) => {
      const profitPerSale = s.items.reduce((p, item) => {
        const stockItem = StockDB.getById(s.stockItemId);
        if (stockItem) {
          return p + ((item.unitPrice - stockItem.buyPrice) * item.qty);
        }
        return p + (item.unitPrice * item.qty * 0.3); // estimate 30% if no ref
      }, 0);
      return sum + profitPerSale;
    }, 0);
  },

  getMonthlySummary() {
    const sales = this.getAll();
    const months = {};
    sales.forEach(s => {
      const key = s.date.slice(0, 7); // YYYY-MM
      if (!months[key]) months[key] = 0;
      months[key] += s.total;
    });
    return months;
  }
};

/* ─── SUPPLIER CRUD ─── */
const SupplierDB = {
  getAll: ()      => dbGet(DB_KEYS.SUPPLIERS),
  save:   (items) => dbSet(DB_KEYS.SUPPLIERS, items),

  add(supplier) {
    const items = this.getAll();
    supplier.id = generateId('v');
    items.push(supplier);
    this.save(items);
    return supplier;
  },

  update(id, updates) {
    const items = this.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...updates }; this.save(items); }
  },

  delete(id) {
    const items = this.getAll().filter(i => i.id !== id);
    this.save(items);
  },

  getById: (id) => dbGet(DB_KEYS.SUPPLIERS).find(s => s.id === id),
};

/* ─── ORDERS CRUD ─── */
const OrderDB = {
  getAll: ()      => dbGet(DB_KEYS.ORDERS),
  save:   (items) => dbSet(DB_KEYS.ORDERS, items),

  add(order) {
    const items = this.getAll();
    order.id = generateId('o');
    order.orderDate = todayStr();
    order.status = 'pending';
    items.unshift(order);
    this.save(items);
    return order;
  },

  updateStatus(id, status) {
    const items = this.getAll();
    const idx = items.findIndex(o => o.id === id);
    if (idx !== -1) {
      items[idx].status = status;
      if (status === 'delivered') items[idx].deliveredDate = todayStr();
      this.save(items);
      return items[idx];
    }
    return null;
  },

  receiveStock(orderId) {
    const order = this.getAll().find(o => o.id === orderId);
    if (!order) return;
    this.updateStatus(orderId, 'delivered');
    if (order.stockItemId) {
      StockDB.adjustQty(order.stockItemId, order.qty, 'inGodown');
    }
  },

  getActive() {
    return this.getAll().filter(o => o.status !== 'delivered');
  },

  getTotalSpend() {
    return this.getAll().reduce((sum, o) => sum + (o.totalCost || 0), 0);
  },

  getMonthSpend() {
    const now = new Date();
    return this.getAll().filter(o => {
      const d = new Date(o.orderDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((sum, o) => sum + (o.totalCost || 0), 0);
  }
};

/* ─── WASTAGE CRUD ─── */
const WastageDB = {
  getAll: ()      => dbGet(DB_KEYS.WASTAGE),
  save:   (items) => dbSet(DB_KEYS.WASTAGE, items),

  add(entry) {
    const items = this.getAll();
    entry.id = generateId('w');
    entry.date = todayStr();
    items.unshift(entry);
    this.save(items);
    if (entry.stockItemId) {
      StockDB.adjustQty(entry.stockItemId, -Math.abs(entry.meters || entry.qty || 0), 'inGodown');
    }
    return entry;
  },

  getTotalLoss() {
    return this.getAll().reduce((sum, w) => sum + (w.totalLoss || 0), 0);
  }
};

/* ─── SETTINGS ─── */
const SettingsDB = {
  get:  ()       => dbGetOne(DB_KEYS.SETTINGS),
  save: (s)      => localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(s)),
  update(updates) { this.save({ ...this.get(), ...updates }); }
};

/* ─── COMPUTED METRICS ─── */
function getStockValue() {
  return StockDB.getAll().reduce((sum, item) => sum + (item.qty * item.buyPrice), 0);
}

function getCategoryBreakdown() {
  const breakdown = {};
  StockDB.getAll().forEach(item => {
    if (!breakdown[item.category]) breakdown[item.category] = 0;
    breakdown[item.category] += item.qty * item.buyPrice;
  });
  return breakdown;
}

function getSupplierSpend() {
  const spend = {};
  OrderDB.getAll().forEach(o => {
    if (!spend[o.supplierName]) spend[o.supplierName] = 0;
    spend[o.supplierName] += o.totalCost || 0;
  });
  return spend;
}

/* ─── BACKUP / RESTORE ─── */
function exportBackup() {
  const backup = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    stock:     StockDB.getAll(),
    sales:     SalesDB.getAll(),
    suppliers: SupplierDB.getAll(),
    orders:    OrderDB.getAll(),
    wastage:   WastageDB.getAll(),
    settings:  SettingsDB.get(),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lakshmi_textile_backup_${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Backup downloaded successfully!', 'success');
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.stock)     dbSet(DB_KEYS.STOCK,     data.stock);
      if (data.sales)     dbSet(DB_KEYS.SALES,     data.sales);
      if (data.suppliers) dbSet(DB_KEYS.SUPPLIERS, data.suppliers);
      if (data.orders)    dbSet(DB_KEYS.ORDERS,    data.orders);
      if (data.wastage)   dbSet(DB_KEYS.WASTAGE,   data.wastage);
      if (data.settings)  dbSet(DB_KEYS.SETTINGS,  data.settings);
      showToast('Backup restored successfully! Refreshing...', 'success');
      setTimeout(() => location.reload(), 1500);
    } catch {
      showToast('Invalid backup file!', 'error');
    }
  };
  reader.readAsText(file);
}

/* ─── TOAST NOTIFICATION SYSTEM ─── */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

/* ─── FORMAT HELPERS ─── */
function fmtRupee(n) {
  if (isNaN(n)) return '₹0';
  return '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function fmtNum(n, dec = 2) {
  if (isNaN(n)) return '0';
  return Number(n).toFixed(dec);
}

function fmtDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/* Initialize on load */
initData();
