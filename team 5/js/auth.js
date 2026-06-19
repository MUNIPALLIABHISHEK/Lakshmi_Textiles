/* =====================================================
   LAKSHMI TEXTILE — AUTH MODULE
   Role-based PIN login with session management
   ===================================================== */

const ROLES = {
  owner: {
    id: 'owner',
    labelKey: 'role.owner',
    icon: '👑',
    pin: '1234',
    tabs: ['dashboard', 'billing', 'stock', 'supplier', 'calculators', 'reports'],
    color: 'var(--accent-gold)',
  },
  sales: {
    id: 'sales',
    labelKey: 'role.sales',
    icon: '🏪',
    pin: '2222',
    tabs: ['billing', 'stock'],
    color: 'var(--accent-cyan)',
  },
  godown: {
    id: 'godown',
    labelKey: 'role.godown',
    icon: '📦',
    pin: '3333',
    tabs: ['stock', 'supplier'],
    color: 'var(--accent-emerald)',
  }
};

const SESSION_KEY = 'lt_session';

let currentRole = null;
let enteredPin   = '';
let selectedRole = 'owner';

/* ─── SESSION ─── */
function saveSession(roleId) {
  const session = { roleId, loginTime: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function getCurrentRole() {
  const sess = getSession();
  return sess ? ROLES[sess.roleId] : null;
}

function isLoggedIn() {
  return !!getSession();
}

/* ─── PIN PAD LOGIC ─── */
function initPinPad() {
  enteredPin = '';
  updatePinDisplay();

  // Role buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRole = btn.dataset.role;
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      enteredPin = '';
      updatePinDisplay();
    });
  });

  // PIN keys
  document.querySelectorAll('.pin-key').forEach(key => {
    key.addEventListener('click', () => {
      const val = key.dataset.val;
      if (val === 'clear') {
        enteredPin = '';
      } else if (val === 'back') {
        enteredPin = enteredPin.slice(0, -1);
      } else {
        if (enteredPin.length < 4) enteredPin += val;
      }
      updatePinDisplay();
      if (enteredPin.length === 4) {
        setTimeout(attemptLogin, 200);
      }
    });
  });

  // Set first role active
  const firstBtn = document.querySelector('.role-btn');
  if (firstBtn) firstBtn.classList.add('active');
}

function updatePinDisplay() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('filled', i < enteredPin.length);
  });
}

function attemptLogin() {
  const role = ROLES[selectedRole];
  if (!role) return;

  if (enteredPin === role.pin) {
    saveSession(selectedRole);
    currentRole = role;
    showToast(`Welcome, ${role.icon} ${role.id}!`, 'success');
    loadApp();
  } else {
    // Shake animation
    const pinDisp = document.querySelector('.pin-display');
    if (pinDisp) {
      pinDisp.style.animation = 'none';
      pinDisp.offsetHeight; // reflow
      pinDisp.style.animation = 'shake 0.4s ease';
    }
    showToast(t('login.error'), 'error');
    enteredPin = '';
    updatePinDisplay();
  }
}

/* ─── LOAD APP AFTER LOGIN ─── */
function loadApp() {
  const loginPage = document.getElementById('login-page');
  const appPage   = document.getElementById('app-page');
  if (loginPage) loginPage.style.display = 'none';
  if (appPage)   appPage.style.display   = 'block';
  initApp();
}

function logout() {
  clearSession();
  currentRole = null;
  const loginPage = document.getElementById('login-page');
  const appPage   = document.getElementById('app-page');
  if (appPage)   appPage.style.display   = 'none';
  if (loginPage) { loginPage.style.display = 'flex'; enteredPin = ''; updatePinDisplay(); }
}

/* ─── ROUTE GUARD ─── */
function guardNav(tabId) {
  const role = getCurrentRole();
  if (!role) return false;
  return role.tabs.includes(tabId);
}

/* Shake keyframe (injected dynamically) */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-8px); }
  40%     { transform: translateX(8px); }
  60%     { transform: translateX(-6px); }
  80%     { transform: translateX(6px); }
}
`;
document.head.appendChild(shakeStyle);
