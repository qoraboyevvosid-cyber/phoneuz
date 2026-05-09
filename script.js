// ===== SOZLAMALAR =====
const TELEGRAM_TOKEN = '8462199964:AAEDg89jkJYWHhZ-Wd9qdLz_hCYzX1BgXdw';
const ADMIN_ID = '7578121895';
const ADMIN_PASSWORD = '1610';
const DISCOUNT_CODES = { 'PHONEUZ5':5, 'SALE50':50, 'VIP15':15 };

// ===== DEFAULT MAHSULOTLAR =====
const defaultProducts = [
  { id:1, brand:'Apple', name:'iPhone 15 Pro', emoji:'📱', image:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg', price:14500000, category:'apple', isNew:true, specs:{Xotira:'256 GB',RAM:'8 GB',Kamera:'48 MP',Batareya:'3274 mAh',Ekran:'6.1"'} },
  { id:2, brand:'Apple', name:'iPhone 14', emoji:'📱', image:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg', price:10200000, category:'apple', isNew:false, specs:{Xotira:'128 GB',RAM:'6 GB',Kamera:'12 MP',Batareya:'3279 mAh',Ekran:'6.1"'} },
  { id:3, brand:'Apple', name:'iPhone 15 Plus', emoji:'📱', image:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg', price:13800000, category:'apple', isNew:true, specs:{Xotira:'256 GB',RAM:'6 GB',Kamera:'48 MP',Batareya:'4383 mAh',Ekran:'6.7"'} },
  { id:4, brand:'Samsung', name:'Galaxy S24 Ultra', emoji:'📲', image:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-1.jpg', price:16000000, category:'samsung', isNew:true, specs:{Xotira:'512 GB',RAM:'12 GB',Kamera:'200 MP',Batareya:'5000 mAh',Ekran:'6.8"'} },
  { id:5, brand:'Samsung', name:'Galaxy A55', emoji:'📲', image:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-1.jpg', price:5400000, category:'samsung', isNew:true, specs:{Xotira:'128 GB',RAM:'8 GB',Kamera:'50 MP',Batareya:'5000 mAh',Ekran:'6.6"'} },
  { id:6, brand:'Samsung', name:'Galaxy S23', emoji:'📲', image:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-1.jpg', price:9800000, category:'samsung', isNew:false, specs:{Xotira:'256 GB',RAM:'8 GB',Kamera:'50 MP',Batareya:'3900 mAh',Ekran:'6.1"'} },
  { id:7, brand:'Xiaomi', name:'Redmi Note 13 Pro', emoji:'🔴', image:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-1.jpg', price:4200000, category:'xiaomi', isNew:true, specs:{Xotira:'256 GB',RAM:'8 GB',Kamera:'200 MP',Batareya:'5100 mAh',Ekran:'6.67"'} },
  { id:8, brand:'Xiaomi', name:'Xiaomi 14', emoji:'🔴', image:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-1.jpg', price:11500000, category:'xiaomi', isNew:true, specs:{Xotira:'512 GB',RAM:'12 GB',Kamera:'50 MP',Batareya:'4610 mAh',Ekran:'6.36"'} },
  { id:9, brand:'Xiaomi', name:'POCO X6 Pro', emoji:'🔴', image:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x6-pro-1.jpg', price:5800000, category:'xiaomi', isNew:false, specs:{Xotira:'256 GB',RAM:'12 GB',Kamera:'64 MP',Batareya:'5000 mAh',Ekran:'6.67"'} },
  { id:10, brand:'Realme', name:'Realme 12 Pro+', emoji:'🟡', image:'https://fdn2.gsmarena.com/vv/pics/realme/realme-12-pro-plus-1.jpg', price:4800000, category:'realme', isNew:true, specs:{Xotira:'256 GB',RAM:'12 GB',Kamera:'50 MP',Batareya:'5000 mAh',Ekran:'6.7"'} },
  { id:11, brand:'Realme', name:'Realme GT 6', emoji:'🟡', image:'https://fdn2.gsmarena.com/vv/pics/realme/realme-gt6-1.jpg', price:7200000, category:'realme', isNew:true, specs:{Xotira:'256 GB',RAM:'16 GB',Kamera:'50 MP',Batareya:'5500 mAh',Ekran:'6.78"'} },
  { id:12, brand:'Samsung', name:'Galaxy A35', emoji:'📲', image:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a35-1.jpg', price:3900000, category:'samsung', isNew:false, specs:{Xotira:'128 GB',RAM:'6 GB',Kamera:'50 MP',Batareya:'5000 mAh',Ekran:'6.6"'} },
];

// ===== LOCALSTORAGE =====
function loadProducts() {
  try {
    const s = localStorage.getItem('phoneuz_products');
    if (s) return JSON.parse(s);
    localStorage.setItem('phoneuz_products', JSON.stringify(defaultProducts));
    return defaultProducts;
  } catch(e) { return defaultProducts; }
}
function saveProducts() {
  try { localStorage.setItem('phoneuz_products', JSON.stringify(products)); } catch(e) {}
}
function loadOrders() {
  try { const s = localStorage.getItem('phoneuz_orders'); return s ? JSON.parse(s) : []; } catch(e) { return []; }
}
function saveOrders() {
  try { localStorage.setItem('phoneuz_orders', JSON.stringify(orders)); } catch(e) {}
}

// ===== HOLAT =====
let products = loadProducts();
let orders = loadOrders();
let cart = [], wishlist = [];
let currentFilter = 'all', currentSort = 'default', currentSearch = '';
let appliedDiscount = 0;
let filteredProducts = [...products];

// ===== YORDAMCHI =====
function fmt(p) { return p.toLocaleString('uz-UZ') + ' so\'m'; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function toggleTheme() {
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('themeBtn').textContent = dark ? '◐' : '◑';
  showToast(dark ? '☀️ Kunduzgi rejim' : '🌙 Tungi rejim');
}

// ===== QIDIRUV =====
function searchProducts() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase().trim();
  applyFilterSort();
}

// ===== FILTER & SORT =====
function filterProducts(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilterSort();
}

function sortProducts() {
  currentSort = document.getElementById('sortSelect').value;
  applyFilterSort();
}

function applyFilterSort() {
  filteredProducts = products.filter(p => {
    const mc = currentFilter === 'all' || p.category === currentFilter;
    const ms = !currentSearch ||
      p.name.toLowerCase().includes(currentSearch) ||
      p.brand.toLowerCase().includes(currentSearch);
    return mc && ms;
  });
  if (currentSort === 'price-asc') filteredProducts.sort((a,b) => a.price-b.price);
  else if (currentSort === 'price-desc') filteredProducts.sort((a,b) => b.price-a.price);
  else if (currentSort === 'name-asc') filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
  renderProducts();
}

// ===== RENDER =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const cnt = document.getElementById('productCount');
  grid.innerHTML = '';
  if (cnt) cnt.textContent = filteredProducts.length + ' ta mahsulot';

  if (!filteredProducts.length) {
    grid.innerHTML = `<div class="no-results"><div class="n-ico">🔍</div><h3>Topilmadi</h3><p>Boshqa so'z bilan qidiring</p></div>`;
    return;
  }

  filteredProducts.forEach((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    const inWish = wishlist.includes(p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML = `
      <div class="p-img" onclick="openProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}"
          onerror="this.style.display='none';this.parentElement.innerHTML+='<span style=font-size:64px>${p.emoji}</span>'"
          style="width:100%;height:100%;object-fit:cover">
        <button class="wish-btn ${inWish?'active':''}"
          onclick="event.stopPropagation();toggleWishlistItem(${p.id})">
          ${inWish?'❤️':'🤍'}
        </button>
      </div>
      <div class="p-body">
        ${p.isNew?'<span class="badge-new">YANGI</span>':''}
        <div class="p-brand">${p.brand}</div>
        <div class="p-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div class="p-specs">${Object.entries(p.specs).slice(0,2).map(([k,v])=>`${k}: ${v}`).join(' · ')}</div>
        <div class="p-price">${fmt(p.price)}</div>
        <div class="p-footer">
          <button class="btn-detail" onclick="openProduct(${p.id})">Batafsil</button>
          <button class="btn-cart ${inCart?'added':''}" id="cb${p.id}" onclick="addToCart(${p.id})">
            ${inCart?'✓ Qo\'shildi':'+ Savatga'}
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== SAVAT =====
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const ex = cart.find(c => c.id === id);
  if (ex) ex.qty++; else cart.push({...p, qty:1});
  updateCartUI();
  const btn = document.getElementById('cb'+id);
  if (btn) { btn.textContent = '✓ Qo\'shildi'; btn.classList.add('added'); }
  showToast('🛒 Savatga qo\'shildi!');
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI(); renderProducts();
}

function changeQty(id, d) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) removeFromCart(id); else updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s,c) => s+c.qty, 0);
  document.getElementById('cartCount').textContent = total;
  const itemsEl = document.getElementById('cartItems');
  const footEl = document.getElementById('cartFooter');

  if (!cart.length) {
    itemsEl.innerHTML = `<div class="empty-box"><div class="e-ico">⊡</div><p>Savat bo'sh</p></div>`;
    footEl.style.display = 'none';
    appliedDiscount = 0;
    document.getElementById('discountMsg').textContent = '';
    document.getElementById('discountInput').value = '';
    return;
  }

  footEl.style.display = 'block';
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" onerror="this.style.display='none'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        <button class="rm-btn" onclick="removeFromCart(${item.id})">🗑</button>
      </div>
    </div>`).join('');

  const sub = cart.reduce((s,c) => s+c.price*c.qty, 0);
  const disc = Math.round(sub * appliedDiscount / 100);
  document.getElementById('cartTotal').textContent = fmt(sub);
  const dl = document.getElementById('discountLine');
  const fl = document.getElementById('finalLine');
  if (appliedDiscount > 0) {
    dl.style.display = 'flex';
    document.getElementById('discountAmount').textContent = '−' + fmt(disc);
    fl.style.display = 'flex';
    document.getElementById('finalTotal').textContent = fmt(sub - disc);
  } else { dl.style.display='none'; fl.style.display='none'; }
}

function toggleCart() {
  const sb = document.getElementById('cartSidebar');
  const ov = document.getElementById('cartOverlay');
  const open = sb.classList.contains('open');
  if (open) { sb.classList.remove('open'); ov.style.display='none'; }
  else { sb.classList.add('open'); ov.style.display='block'; }
}

// ===== CHEGIRMA =====
function applyDiscount() {
  const code = document.getElementById('discountInput').value.trim().toUpperCase();
  const msg = document.getElementById('discountMsg');
  if (!code) { msg.innerHTML = '<span class="disc-err">Kod kiriting!</span>'; return; }
  if (DISCOUNT_CODES[code]) {
    appliedDiscount = DISCOUNT_CODES[code];
    msg.innerHTML = `<span class="disc-ok">✅ ${appliedDiscount}% chegirma!</span>`;
    updateCartUI(); showToast(`🎉 ${appliedDiscount}% chegirma!`);
  } else {
    appliedDiscount = 0;
    msg.innerHTML = '<span class="disc-err">❌ Kod noto\'g\'ri</span>';
    updateCartUI();
  }
}

// ===== SEVIMLILAR =====
function toggleWishlistItem(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    showToast('💔 Sevimlilardan olib tashlandi');
  } else {
    wishlist.push(id);
    showToast('❤️ Sevimlilarga qo\'shildi!');
  }
  updateWishBadge(); renderProducts(); renderWishlist();
}

function updateWishBadge() {
  const b = document.getElementById('wishlistCount');
  b.style.display = wishlist.length ? 'flex' : 'none';
  b.textContent = wishlist.length;
}

function toggleWishlist() {
  const sec = document.getElementById('wishlistSection');
  if (sec.classList.contains('visible')) { sec.classList.remove('visible'); return; }
  renderWishlist();
  sec.classList.add('visible');
  sec.scrollIntoView({ behavior:'smooth', block:'start' });
}

function closeWishlist() {
  document.getElementById('wishlistSection').classList.remove('visible');
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  if (!wishlist.length) {
    grid.innerHTML = `<div class="no-results"><div class="n-ico">❤️</div><h3>Sevimlilar bo'sh</h3></div>`;
    return;
  }
  grid.innerHTML = '';
  products.filter(p => wishlist.includes(p.id)).forEach((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML = `
      <div class="p-img" onclick="openProduct(${p.id})">
        <img src="${p.image}" onerror="this.style.display='none'"
          style="width:100%;height:100%;object-fit:cover">
        <button class="wish-btn active"
          onclick="event.stopPropagation();toggleWishlistItem(${p.id})">❤️</button>
      </div>
      <div class="p-body">
        <div class="p-brand">${p.brand}</div>
        <div class="p-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div class="p-price">${fmt(p.price)}</div>
        <div class="p-footer">
          <button class="btn-detail" onclick="openProduct(${p.id})">Batafsil</button>
          <button class="btn-cart ${inCart?'added':''}" onclick="addToCart(${p.id})">
            ${inCart?'✓ Qo\'shildi':'+ Savatga'}
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== PRODUCT DETAIL =====
function openProduct(id) {
  const p = products.find(x => x.id === id);
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalImg').innerHTML = `
    <img src="${p.image}" style="width:100%;height:100%;object-fit:cover"
      onerror="this.parentElement.textContent='${p.emoji}'">`;
  document.getElementById('modalPrice').textContent = fmt(p.price);
  document.getElementById('modalBadges').innerHTML = p.isNew ? '<span class="badge-new">YANGI</span>' : '';
  document.getElementById('modalSpecs').innerHTML = Object.entries(p.specs).map(([k,v]) =>
    `<div class="spec-row"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`
  ).join('');
  const cb = document.getElementById('modalCartBtn');
  const inCart = cart.find(c => c.id === id);
  cb.textContent = inCart ? '✓ Savatda bor' : '+ Savatga qo\'shish';
  cb.onclick = () => { addToCart(id); cb.textContent = '✓ Savatga qo\'shildi'; };
  const wb = document.getElementById('modalWishBtn');
  wb.textContent = wishlist.includes(id) ? '❤️ Sevimlilardan olib tashlash' : '🤍 Sevimlilarga qo\'shish';
  wb.onclick = () => {
    toggleWishlistItem(id);
    wb.textContent = wishlist.includes(id) ? '❤️ Sevimlilardan olib tashlash' : '🤍 Sevimlilarga qo\'shish';
  };
  document.getElementById('productOverlay').style.display = 'flex';
}
function closeProduct() { document.getElementById('productOverlay').style.display = 'none'; }

// ===== CHECKOUT =====
function openCheckout() {
  toggleCart();
  const sub = cart.reduce((s,c) => s+c.price*c.qty, 0);
  const disc = Math.round(sub * appliedDiscount / 100);
  let html = cart.map(item =>
    `<div class="os-item"><span>${item.name} × ${item.qty}</span><span>${fmt(item.price*item.qty)}</span></div>`
  ).join('');
  if (appliedDiscount > 0)
    html += `<div class="os-disc"><span>Chegirma (${appliedDiscount}%)</span><span>−${fmt(disc)}</span></div>`;
  html += `<div class="os-total"><span>Jami</span><span>${fmt(sub-disc)}</span></div>`;
  document.getElementById('orderSummary').innerHTML = html;
  document.getElementById('checkoutOverlay').style.display = 'flex';
}
function closeCheckout() { document.getElementById('checkoutOverlay').style.display = 'none'; }

async function placeOrder() {
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.querySelector('input[name="pay"]:checked')?.value || 'cash';
  if (!name || !phone || !address) { showToast('⚠️ Barcha maydonlarni to\'ldiring!'); return; }

  const payN = { cash:'Naqd pul', card:'Karta', payme:'Payme', click:'Click' };
  const sub = cart.reduce((s,c) => s+c.price*c.qty, 0);
  const disc = Math.round(sub * appliedDiscount / 100);
  const final = sub - disc;
  const items = cart.map(c => `• ${c.name} × ${c.qty} — ${fmt(c.price*c.qty)}`).join('\n');
  const dLine = appliedDiscount > 0 ? `\n🏷 Chegirma (${appliedDiscount}%): −${fmt(disc)}` : '';
  const text = `🛒 YANGI BUYURTMA!\n\n👤 ${name}\n📞 ${phone}\n📍 ${address}\n💳 ${payN[payment]}${dLine}\n\n📦 Mahsulotlar:\n${items}\n\n💰 Jami: ${fmt(final)}`;

  const btn = document.getElementById('orderBtn');
  btn.textContent = '⏳ Yuborilmoqda...'; btn.disabled = true;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id:ADMIN_ID, text })
    });
  } catch(e) {}

  orders.unshift({
    name, phone, address, payment: payN[payment],
    items: cart.map(c=>`${c.name} × ${c.qty}`).join(', '),
    total: fmt(final),
    time: new Date().toLocaleString('uz-UZ')
  });
  saveOrders();

  btn.textContent = '✓ Tasdiqlash'; btn.disabled = false;
  closeCheckout();
  cart = []; appliedDiscount = 0;
  updateCartUI(); renderProducts();
  document.getElementById('successOverlay').style.display = 'flex';
  ['fullName','phone','address'].forEach(id => document.getElementById(id).value = '');
}
function closeSuccess() { document.getElementById('successOverlay').style.display = 'none'; }

// ===== ADMIN =====
function openAdmin() {
  const pwd = prompt('🔐 Admin paroli:');
  if (pwd === null) return;
  if (pwd !== ADMIN_PASSWORD) { showToast('❌ Parol noto\'g\'ri!'); return; }
  renderAdminOrders(); renderAdminProducts();
  document.getElementById('adminOverlay').style.display = 'flex';
}
function closeAdmin() { document.getElementById('adminOverlay').style.display = 'none'; }

function switchTab(name, btn) {
  document.querySelectorAll('.a-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.a-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab'+name).classList.add('active');
}

function renderAdminOrders() {
  const el = document.getElementById('ordersList');
  if (!orders.length) { el.innerHTML = '<p class="no-orders">📋 Hali buyurtma yo\'q</p>'; return; }
  el.innerHTML = orders.map(o => `
    <div class="order-card">
      <div class="oc-head">
        <span class="oc-name">👤 ${o.name} — ${o.phone}</span>
        <span class="oc-time">${o.time}</span>
      </div>
      <div class="oc-items">📦 ${o.items}</div>
      <div class="oc-items">📍 ${o.address} · 💳 ${o.payment}</div>
      <div class="oc-total">💰 ${o.total}</div>
    </div>`).join('');
}

function renderAdminProducts() {
  const el = document.getElementById('adminProductList');
  el.innerHTML = products.map(p => `
    <div class="ap-row">
      <div class="ap-thumb">
        <img src="${p.image}" onerror="this.style.display='none';this.parentElement.textContent='${p.emoji}'">
      </div>
      <div class="ap-info">
        <div class="ap-name">${p.brand} ${p.name}</div>
        <div class="ap-price">${fmt(p.price)}</div>
      </div>
      <button class="btn-del" onclick="deleteProduct(${p.id})">🗑</button>
    </div>`).join('');
}

function deleteProduct(id) {
  if (!confirm('O\'chirishni tasdiqlaysizmi?')) return;
  products = products.filter(p => p.id !== id);
  filteredProducts = filteredProducts.filter(p => p.id !== id);
  saveProducts(); renderProducts(); renderAdminProducts();
  showToast('🗑 Mahsulot o\'chirildi');
}

function addProduct() {
  const brand = document.getElementById('newBrand').value;
  const name = document.getElementById('newName').value.trim();
  const price = parseInt(document.getElementById('newPrice').value);
  const image = document.getElementById('newImage').value.trim();
  const storage = document.getElementById('newStorage').value.trim();
  const ram = document.getElementById('newRam').value.trim();
  const camera = document.getElementById('newCamera').value.trim();
  const battery = document.getElementById('newBattery').value.trim();
  const isNew = document.getElementById('newIsNew').checked;
  if (!name || !price) { showToast('⚠️ Nom va narx kiriting!'); return; }
  const emojis = { apple:'📱', samsung:'📲', xiaomi:'🔴', realme:'🟡' };
  const np = {
    id: Date.now(),
    brand: brand.charAt(0).toUpperCase() + brand.slice(1),
    name, emoji: emojis[brand]||'📱', image, price,
    category: brand, isNew,
    specs: { Xotira:storage||'—', RAM:ram||'—', Kamera:camera||'—', Batareya:battery||'—' }
  };
  products.unshift(np);
  saveProducts(); applyFilterSort(); renderAdminProducts();
  showToast('✅ Mahsulot qo\'shildi!');
  ['newName','newPrice','newImage','newStorage','newRam','newCamera','newBattery']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('newIsNew').checked = false;
}

function clearOrders() {
  if (!confirm('Barcha buyurtmalarni o\'chirasizmi?')) return;
  orders = []; saveOrders(); renderAdminOrders();
  showToast('🗑 Buyurtmalar tozalandi');
}

function resetProducts() {
  if (!confirm('Mahsulotlarni asl holatga qaytarasizmi?')) return;
  products = [...defaultProducts];
  saveProducts(); applyFilterSort(); renderAdminProducts();
  showToast('✅ Mahsulotlar tiklandi!');
}

// ===== MAXFIY KOMBINATSIYA (Logo 5x) =====
let tapCount = 0, tapTimer;
document.addEventListener('click', e => {
  if (e.target.closest('.logo')) {
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => tapCount = 0, 2000);
    if (tapCount >= 5) { tapCount = 0; openAdmin(); }
  }
});

// ===== MODAL YOPISH =====
['checkoutOverlay','productOverlay','successOverlay','adminOverlay'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { if (e.target === el) el.style.display = 'none'; });
});

// Header scroll
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.style.boxShadow = scrollY > 10 ? '0 2px 20px rgba(0,0,0,.08)' : 'none';
});

// ===== START =====
renderProducts();
