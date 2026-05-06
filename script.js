// ===== SOZLAMALAR =====
const TELEGRAM_TOKEN = '8462199964:AAFXAQfVo5u8Zu9L_LmuY4AZ2iHCbkaBEvo';
const ADMIN_ID = '7578121895';

// Chegirma kodlari
const DISCOUNT_CODES = {
  'PHONEUZ5': 5,
  'SALE10': 10,
  'VIP15': 15,
};

// ===== MAHSULOTLAR =====
let products = [
  {
    id: 1, brand: 'Apple', name: 'iPhone 15 Pro', emoji: '📱',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
    price: 14500000, category: 'apple', isNew: true,
    specs: { Xotira: '256 GB', RAM: '8 GB', Kamera: '48 MP', Batareya: '3274 mAh', Ekran: '6.1"' }
  },
  {
    id: 2, brand: 'Apple', name: 'iPhone 14', emoji: '📱',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg',
    price: 10200000, category: 'apple', isNew: false,
    specs: { Xotira: '128 GB', RAM: '6 GB', Kamera: '12 MP', Batareya: '3279 mAh', Ekran: '6.1"' }
  },
  {
    id: 3, brand: 'Apple', name: 'iPhone 15 Plus', emoji: '📱',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg',
    price: 13800000, category: 'apple', isNew: true,
    specs: { Xotira: '256 GB', RAM: '6 GB', Kamera: '48 MP', Batareya: '4383 mAh', Ekran: '6.7"' }
  },
  {
    id: 4, brand: 'Samsung', name: 'Galaxy S24 Ultra', emoji: '📲',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-1.jpg',
    price: 16000000, category: 'samsung', isNew: true,
    specs: { Xotira: '512 GB', RAM: '12 GB', Kamera: '200 MP', Batareya: '5000 mAh', Ekran: '6.8"' }
  },
  {
    id: 5, brand: 'Samsung', name: 'Galaxy A55', emoji: '📲',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-1.jpg',
    price: 5400000, category: 'samsung', isNew: true,
    specs: { Xotira: '128 GB', RAM: '8 GB', Kamera: '50 MP', Batareya: '5000 mAh', Ekran: '6.6"' }
  },
  {
    id: 6, brand: 'Samsung', name: 'Galaxy S23', emoji: '📲',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-1.jpg',
    price: 9800000, category: 'samsung', isNew: false,
    specs: { Xotira: '256 GB', RAM: '8 GB', Kamera: '50 MP', Batareya: '3900 mAh', Ekran: '6.1"' }
  },
  {
    id: 7, brand: 'Xiaomi', name: 'Redmi Note 13 Pro', emoji: '🔴',
    image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-1.jpg',
    price: 4200000, category: 'xiaomi', isNew: true,
    specs: { Xotira: '256 GB', RAM: '8 GB', Kamera: '200 MP', Batareya: '5100 mAh', Ekran: '6.67"' }
  },
  {
    id: 8, brand: 'Xiaomi', name: 'Xiaomi 14', emoji: '🔴',
    image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-1.jpg',
    price: 11500000, category: 'xiaomi', isNew: true,
    specs: { Xotira: '512 GB', RAM: '12 GB', Kamera: '50 MP', Batareya: '4610 mAh', Ekran: '6.36"' }
  },
  {
    id: 9, brand: 'Xiaomi', name: 'POCO X6 Pro', emoji: '🔴',
    image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x6-pro-1.jpg',
    price: 5800000, category: 'xiaomi', isNew: false,
    specs: { Xotira: '256 GB', RAM: '12 GB', Kamera: '64 MP', Batareya: '5000 mAh', Ekran: '6.67"' }
  },
  {
    id: 10, brand: 'Realme', name: 'Realme 12 Pro+', emoji: '🟡',
    image: 'https://fdn2.gsmarena.com/vv/pics/realme/realme-12-pro-plus-1.jpg',
    price: 4800000, category: 'realme', isNew: true,
    specs: { Xotira: '256 GB', RAM: '12 GB', Kamera: '50 MP', Batareya: '5000 mAh', Ekran: '6.7"' }
  },
  {
    id: 11, brand: 'Realme', name: 'Realme GT 6', emoji: '🟡',
    image: 'https://fdn2.gsmarena.com/vv/pics/realme/realme-gt6-1.jpg',
    price: 7200000, category: 'realme', isNew: true,
    specs: { Xotira: '256 GB', RAM: '16 GB', Kamera: '50 MP', Batareya: '5500 mAh', Ekran: '6.78"' }
  },
  {
    id: 12, brand: 'Samsung', name: 'Galaxy A35', emoji: '📲',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a35-1.jpg',
    price: 3900000, category: 'samsung', isNew: false,
    specs: { Xotira: '128 GB', RAM: '6 GB', Kamera: '50 MP', Batareya: '5000 mAh', Ekran: '6.6"' }
  },
];

// ===== HOLAT =====
let cart = [];
let wishlist = [];
let orders = [];
let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';
let appliedDiscount = 0;
let filteredProducts = [...products];

// ===== YORDAMCHI FUNKSIYALAR =====
function formatPrice(p) {
  return p.toLocaleString('uz-UZ') + ' so\'m';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeBtn').textContent = isDark ? '🌙' : '☀️';
  showToast(isDark ? '☀️ Kunduzgi rejim' : '🌙 Tungi rejim');
}

// ===== QIDIRUV =====
function searchProducts() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase().trim();
  applyFilterSort();
}

// ===== FILTER & SORT =====
function filterProducts(category, btn) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilterSort();
}

function sortProducts() {
  currentSort = document.getElementById('sortSelect').value;
  applyFilterSort();
}

function applyFilterSort() {
  filteredProducts = products.filter(p => {
    const matchCat = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = !currentSearch ||
      p.name.toLowerCase().includes(currentSearch) ||
      p.brand.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });

  if (currentSort === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name-asc') filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts();
}

// ===== MAHSULOTLARNI CHIQARISH =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  grid.innerHTML = '';

  if (countEl) countEl.textContent = filteredProducts.length + ' ta mahsulot';

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="icon">🔍</div>
        <h3>Topilmadi</h3>
        <p>Boshqa kalit so'z bilan qidiring</p>
      </div>`;
    return;
  }

  filteredProducts.forEach((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    const inWish = wishlist.includes(p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML = `
      <div class="product-img" onclick="openProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}"
          onerror="this.style.display='none';this.parentElement.innerHTML+='${p.emoji}'"
          style="width:100%;height:100%;object-fit:cover">
        <button class="wish-btn ${inWish ? 'active' : ''}"
          onclick="event.stopPropagation();toggleWishlistItem(${p.id})"
          title="Sevimlilarga qo'shish">
          ${inWish ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-body">
        <div>
          ${p.isNew ? '<span class="badge-new">YANGI</span>' : ''}
        </div>
        <div class="product-brand">${p.brand}</div>
        <div class="product-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div class="product-specs">
          ${Object.entries(p.specs).slice(0,2).map(([k,v])=>`${k}: ${v}`).join(' · ')}
        </div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-footer">
          <button class="btn-detail" onclick="openProduct(${p.id})">Batafsil</button>
          <button class="btn-cart ${inCart ? 'added' : ''}"
            id="cartBtn${p.id}" onclick="addToCart(${p.id})">
            ${inCart ? '✓ Qo\'shildi' : '+ Savatga'}
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== SAVAT =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  const btn = document.getElementById('cartBtn' + id);
  if (btn) { btn.textContent = '✓ Qo\'shildi'; btn.classList.add('added'); }
  showToast('🛒 Savatga qo\'shildi!');
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
  renderProducts();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = total;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="empty-state"><div style="font-size:48px">🛒</div><p>Savat bo'sh</p></div>`;
    footerEl.style.display = 'none';
    appliedDiscount = 0;
    document.getElementById('discountMsg').textContent = '';
    document.getElementById('discountInput').value = '';
    return;
  }

  footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.style.display='none'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        <button class="rm-btn" onclick="removeFromCart(${item.id})">🗑</button>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = Math.round(subtotal * appliedDiscount / 100);
  const final = subtotal - discount;

  document.getElementById('cartTotal').textContent = formatPrice(subtotal);

  const discountLine = document.getElementById('discountLine');
  const finalLine = document.getElementById('finalLine');

  if (appliedDiscount > 0) {
    discountLine.style.display = 'flex';
    document.getElementById('discountAmount').textContent = '−' + formatPrice(discount);
    finalLine.style.display = 'flex';
    document.getElementById('finalTotal').textContent = formatPrice(final);
  } else {
    discountLine.style.display = 'none';
    finalLine.style.display = 'none';
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) { sidebar.classList.remove('open'); overlay.style.display = 'none'; }
  else { sidebar.classList.add('open'); overlay.style.display = 'block'; }
}

// ===== CHEGIRMA =====
function applyDiscount() {
  const code = document.getElementById('discountInput').value.trim().toUpperCase();
  const msgEl = document.getElementById('discountMsg');

  if (!code) {
    msgEl.innerHTML = '<span class="discount-err">Kod kiriting!</span>';
    return;
  }

  if (DISCOUNT_CODES[code]) {
    appliedDiscount = DISCOUNT_CODES[code];
    msgEl.innerHTML = `<span class="discount-ok">✅ ${appliedDiscount}% chegirma qo'llandi!</span>`;
    updateCartUI();
    showToast(`🎉 ${appliedDiscount}% chegirma!`);
  } else {
    appliedDiscount = 0;
    msgEl.innerHTML = '<span class="discount-err">❌ Kod noto\'g\'ri</span>';
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
  updateWishlistBadge();
  renderProducts();
  renderWishlist();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistCount');
  if (wishlist.length > 0) {
    badge.style.display = 'flex';
    badge.textContent = wishlist.length;
  } else {
    badge.style.display = 'none';
  }
}

function toggleWishlist() {
  const sec = document.getElementById('wishlistSection');
  if (sec.classList.contains('visible')) {
    sec.classList.remove('visible');
  } else {
    renderWishlist();
    sec.classList.add('visible');
    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function closeWishlist() {
  document.getElementById('wishlistSection').classList.remove('visible');
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  if (wishlist.length === 0) {
    grid.innerHTML = `<div class="no-results"><div class="icon">❤️</div><h3>Sevimlilar bo'sh</h3><p>Mahsulotlarga ❤️ bosing</p></div>`;
    return;
  }
  const wishProducts = products.filter(p => wishlist.includes(p.id));
  grid.innerHTML = '';
  wishProducts.forEach((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML = `
      <div class="product-img" onclick="openProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}"
          onerror="this.style.display='none';this.parentElement.innerHTML+='${p.emoji}'"
          style="width:100%;height:100%;object-fit:cover">
        <button class="wish-btn active" onclick="event.stopPropagation();toggleWishlistItem(${p.id})">❤️</button>
      </div>
      <div class="product-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-footer">
          <button class="btn-detail" onclick="openProduct(${p.id})">Batafsil</button>
          <button class="btn-cart ${inCart ? 'added' : ''}" onclick="addToCart(${p.id})">
            ${inCart ? '✓ Qo\'shildi' : '+ Savatga'}
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== MAHSULOT DETAIL =====
function openProduct(id) {
  const p = products.find(x => x.id === id);
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalImg').innerHTML = `
    <img src="${p.image}" alt="${p.name}"
      style="width:100%;height:100%;object-fit:cover"
      onerror="this.parentElement.textContent='${p.emoji}'">`;
  document.getElementById('modalPrice').textContent = formatPrice(p.price);
  document.getElementById('modalBadges').innerHTML =
    (p.isNew ? '<span class="badge-new">YANGI</span>' : '');
  document.getElementById('modalSpecs').innerHTML =
    Object.entries(p.specs).map(([k, v]) =>
      `<div class="spec-row"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`
    ).join('');

  const cartBtn = document.getElementById('modalCartBtn');
  const inCart = cart.find(c => c.id === id);
  cartBtn.textContent = inCart ? '✓ Savatda bor' : '+ Savatga qo\'shish';
  cartBtn.onclick = () => { addToCart(id); cartBtn.textContent = '✓ Savatga qo\'shildi'; };

  const wishBtn = document.getElementById('modalWishBtn');
  const inWish = wishlist.includes(id);
  wishBtn.textContent = inWish ? '❤️ Sevimlilardan olib tashlash' : '🤍 Sevimlilarga qo\'shish';
  wishBtn.onclick = () => {
    toggleWishlistItem(id);
    const nowInWish = wishlist.includes(id);
    wishBtn.textContent = nowInWish ? '❤️ Sevimlilardan olib tashlash' : '🤍 Sevimlilarga qo\'shish';
  };

  document.getElementById('productOverlay').style.display = 'flex';
}

function closeProduct() {
  document.getElementById('productOverlay').style.display = 'none';
}

// ===== CHECKOUT =====
function openCheckout() {
  toggleCart();
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = Math.round(subtotal * appliedDiscount / 100);
  const final = subtotal - discount;

  let html = cart.map(item =>
    `<div class="order-sum-item"><span>${item.name} × ${item.qty}</span><span>${formatPrice(item.price * item.qty)}</span></div>`
  ).join('');

  if (appliedDiscount > 0) {
    html += `<div class="order-sum-discount"><span>Chegirma (${appliedDiscount}%)</span><span>−${formatPrice(discount)}</span></div>`;
  }

  html += `<div class="order-sum-total"><span>Jami</span><span>${formatPrice(final)}</span></div>`;
  document.getElementById('orderSummary').innerHTML = html;
  document.getElementById('checkoutOverlay').style.display = 'flex';
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').style.display = 'none';
}

async function placeOrder() {
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.querySelector('input[name="pay"]:checked')?.value || 'cash';

  if (!name || !phone || !address) {
    showToast('⚠️ Barcha maydonlarni to\'ldiring!');
    return;
  }

  const payNames = { cash: 'Naqd pul', card: 'Plastik karta', payme: 'Payme', click: 'Click' };
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = Math.round(subtotal * appliedDiscount / 100);
  const final = subtotal - discount;

  const items = cart.map(c => `• ${c.name} × ${c.qty} — ${formatPrice(c.price * c.qty)}`).join('\n');
  const discountLine = appliedDiscount > 0 ? `\n🏷 Chegirma (${appliedDiscount}%): −${formatPrice(discount)}` : '';

  const text = `🛒 YANGI BUYURTMA!\n\n👤 ${name}\n📞 ${phone}\n📍 ${address}\n💳 ${payNames[payment]}${discountLine}\n\n📦 Mahsulotlar:\n${items}\n\n💰 Jami: ${formatPrice(final)}`;

  const btn = document.getElementById('orderBtn');
  btn.textContent = '⏳ Yuborilmoqda...';
  btn.disabled = true;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: ADMIN_ID, text })
    });
  } catch(e) { console.error(e); }

  // Admin panel uchun saqlash
  orders.unshift({
    name, phone, address,
    payment: payNames[payment],
    items: cart.map(c => `${c.name} × ${c.qty}`).join(', '),
    total: formatPrice(final),
    time: new Date().toLocaleString('uz-UZ')
  });

  btn.textContent = '✅ Tasdiqlash';
  btn.disabled = false;

  closeCheckout();
  cart = [];
  appliedDiscount = 0;
  updateCartUI();
  renderProducts();
  document.getElementById('successOverlay').style.display = 'flex';
  document.getElementById('fullName').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('address').value = '';
}

function closeSuccess() {
  document.getElementById('successOverlay').style.display = 'none';
}

// ===== ADMIN PANEL =====
function openAdmin() {
  renderAdminOrders();
  renderAdminProducts();
  document.getElementById('adminOverlay').style.display = 'flex';
}

function closeAdmin() {
  document.getElementById('adminOverlay').style.display = 'none';
}

function switchTab(name, btn) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab' + name.charAt(0).toUpperCase() + name.slice(1)).classList.add('active');
}

function renderAdminOrders() {
  const el = document.getElementById('ordersList');
  if (orders.length === 0) {
    el.innerHTML = '<p class="no-orders">📋 Hali buyurtma yo\'q</p>';
    return;
  }
  el.innerHTML = orders.map(o => `
    <div class="order-card">
      <div class="order-card-header">
        <span class="order-card-name">👤 ${o.name} — ${o.phone}</span>
        <span class="order-card-time">${o.time}</span>
      </div>
      <div class="order-card-items">📦 ${o.items}</div>
      <div class="order-card-items">📍 ${o.address} · 💳 ${o.payment}</div>
      <div class="order-card-total">💰 ${o.total}</div>
    </div>`).join('');
}

function renderAdminProducts() {
  const el = document.getElementById('adminProductList');
  el.innerHTML = products.map(p => `
    <div class="admin-product-row">
      <div class="admin-product-thumb">
        <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.textContent='${p.emoji}'">
      </div>
      <div class="admin-product-info">
        <div class="admin-product-name">${p.brand} ${p.name}</div>
        <div class="admin-product-price">${formatPrice(p.price)}</div>
      </div>
      <button class="btn-del" onclick="deleteProduct(${p.id})">🗑 O'chirish</button>
    </div>`).join('');
}

function deleteProduct(id) {
  if (!confirm('Mahsulotni o\'chirishni tasdiqlaysizmi?')) return;
  products = products.filter(p => p.id !== id);
  filteredProducts = filteredProducts.filter(p => p.id !== id);
  renderProducts();
  renderAdminProducts();
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

  if (!name || !price) { showToast('⚠️ Nom va narxni kiriting!'); return; }

  const emojis = { apple: '📱', samsung: '📲', xiaomi: '🔴', realme: '🟡' };
  const newProduct = {
    id: Date.now(),
    brand: brand.charAt(0).toUpperCase() + brand.slice(1),
    name, emoji: emojis[brand] || '📱', image, price,
    category: brand, isNew,
    specs: {
      Xotira: storage || '—', RAM: ram || '—',
      Kamera: camera || '—', Batareya: battery || '—'
    }
  };

  products.unshift(newProduct);
  applyFilterSort();
  renderAdminProducts();
  showToast('✅ Mahsulot qo\'shildi!');

  // Formani tozalash
  ['newName','newPrice','newImage','newStorage','newRam','newCamera','newBattery']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('newIsNew').checked = false;
}

// ===== MODAL YOPISH =====
['checkoutOverlay','productOverlay','successOverlay','adminOverlay'].forEach(id => {
  document.getElementById(id).addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
    if (id === 'cartOverlay') toggleCart();
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.1)' : 'none';
});

// ===== ISHGA TUSHIRISH =====
renderProducts();
