(() => {
  'use strict';

  const STORE_KEY = 'BNH_DEMO_v2';
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const money = (n) => new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND',maximumFractionDigits:0}).format(n);
  const esc = (s='') => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const initial = () => ({ cart:{}, orders:[], wish:[] });
  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return { ...initial(), ...saved, cart: saved.cart || {}, orders: saved.orders || [], wish: saved.wish || [] };
    } catch {
      return initial();
    }
  };

  let state = load();
  let filters = { category: 'all', q: '', sort: 'featured' };
  let toastTimer;
  let lastRoute = '';

  const save = () => localStorage.setItem(STORE_KEY, JSON.stringify(state));
  const byId = (id) => PRODUCTS.find(p => p.id === id);
  const bySlug = (slug) => PRODUCTS.find(p => p.slug === slug);
  const route = () => location.hash.replace(/^#\/?/,'') || '/';
  const routeParts = () => route().split('?')[0].split('/').filter(Boolean);
  const routeQuery = () => new URLSearchParams((location.hash.split('?')[1] || ''));
  const cartEntries = () => Object.entries(state.cart).map(([id,qty]) => ({ product: byId(id), qty: Number(qty) })).filter(x => x.product && x.qty > 0);
  const cartCount = () => cartEntries().reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = () => cartEntries().reduce((sum, item) => sum + item.product.price * item.qty, 0);

  function showToast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2200);
  }

  function syncCounts() {
    $('#cart-count').textContent = cartCount();
  }

  function openLayer(selector) {
    closeLayers();
    const el = $(selector);
    if (!el) return;
    el.hidden = false;
    $('#overlay').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLayers() {
    ['#cart-panel','#mobile-panel','#search-modal'].forEach(sel => {
      const el = $(sel);
      if (el) el.hidden = true;
    });
    $('#overlay').hidden = true;
    document.body.style.overflow = '';
  }

  function productCard(product) {
    const second = product.gallery?.find(src => src !== product.image);
    const isSmallOriginal = /\/hd\/(?:cat_|grid[A-C]_)/.test(product.image);
    return `
      <article class="product-card ${isSmallOriginal ? 'source-small' : 'source-large'}">
        <div class="product-media">
          <a class="product-thumb" href="#/product/${product.slug}" aria-label="Xem chi tiết ${esc(product.name)}">
            <img class="product-img-main" src="${product.image}" alt="${esc(product.name)}" loading="lazy" decoding="async">
            ${second ? `<img class="product-img-alt" src="${second}" alt="Góc chụp khác của ${esc(product.name)}" loading="lazy" decoding="async" aria-hidden="true">` : ''}
            <span class="product-badge">${esc(product.badge)}</span>
            <span class="product-hover-hint">Khám phá sản phẩm ${icon('arrow')}</span>
          </a>
          <button type="button" class="product-quick-overlay" data-action="quick" data-id="${product.id}" aria-label="Xem nhanh ${esc(product.name)}">Xem nhanh ${icon('search')}</button>
        </div>
        <div class="product-info">
          <div>
            <div class="product-category">${esc(categoryLabel(product.category))}</div>
            <a class="product-title" href="#/product/${product.slug}">${esc(product.name)}</a>
            <p class="product-text">${esc(product.short)}</p>
          </div>
          <div class="product-bottom">
            <div class="product-price-wrap"><strong class="product-price">${money(product.price)}</strong><small>Giá demo</small></div>
            <div class="product-actions">
              <button class="mini-btn" data-action="quick" data-id="${product.id}" aria-label="Xem nhanh ${esc(product.name)}">Xem nhanh</button>
              <button class="mini-btn solid" data-action="add-cart" data-id="${product.id}" aria-label="Thêm ${esc(product.name)} vào giỏ">${icon('bag')}</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function categoryLabel(id) {
    return CATEGORIES.find(c => c.id === id)?.name || 'Sản phẩm';
  }

  function sectionTitle(kicker, title, intro='', action='') {
    return `
      <div class="section-title">
        <div>
          <span class="kicker">${kicker}</span>
          <h2>${title}</h2>
          ${intro ? `<p>${intro}</p>` : ''}
        </div>
        ${action}
      </div>
    `;
  }

  function homePage() {
    const best = PRODUCTS.filter(p => p.featured).slice(0,4);
    const collections = [
      { id:'giang-sinh', title:'Giáng sinh', text:'Bộ sưu tập ấm áp với sắc đỏ lễ hội.', image:'assets/media/products/hd/christmas-group.webp' },
      { id:'meo-xinh', title:'Mèo xinh', text:'Đồ gốm đáng yêu, trẻ trung, dễ tặng.', image:'assets/media/products/hd/cat_1_3.webp' },
      { id:'ban-an-hang-ngay', title:'Bàn ăn hằng ngày', text:'Những món gốm nhẹ nhàng để dùng mỗi ngày.', image:'assets/media/products/hd/gridA_1_2.webp' }
    ];

    return `
      <section class="hero container">
        <div class="hero-copy">
          <span class="kicker">Gốm Bách Ngân Hỷ</span>
          <h1 class="hero-title">
  <span class="hero-green">Gốm</span>
  <span class="hero-red">có gu,</span>
  <span class="hero-green">nhà</span>
  <span class="hero-red">có chất.</span>
</h1>
          <p>Khám phá những chiếc cốc, bộ đĩa và vật dụng bằng gốm mang sắc màu riêng. Chọn một món cho căn bếp hoặc một món quà nhỏ thật ý nghĩa.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/shop">Mua sắm ngay ${icon('arrow')}</a>
            <a class="btn btn-outline" href="#/story">Xem câu chuyện</a>
          </div>
          <p class="hero-subnote">Bộ sưu tập gốm · Cốc, đĩa và quà tặng thủ công</p>
        </div>
        <div class="hero-media" aria-label="Hình ảnh bộ sưu tập gốm">
          <div class="hero-slides">
            <img class="hero-slide active" src="assets/media/products/hd/hero-christmas.webp" alt="Bộ sưu tập gốm Giáng sinh" fetchpriority="high">
            <img class="hero-slide" src="assets/media/products/hd/penguin-trio.webp" alt="Nhóm ly gốm hình Penguin" loading="lazy">
            <img class="hero-slide" src="assets/media/products/hd/mugs-stack.webp" alt="Bộ cốc gốm họa tiết Giáng sinh" loading="lazy">
          </div>
          <div class="hero-slide-controls" aria-label="Chuyển ảnh bộ sưu tập">
            <button class="hero-dot active" type="button" data-action="hero-slide" data-index="0" aria-label="Ảnh bộ gốm thứ nhất" aria-pressed="true"></button>
            <button class="hero-dot" type="button" data-action="hero-slide" data-index="1" aria-label="Ảnh bộ gốm thứ hai" aria-pressed="false"></button>
            <button class="hero-dot" type="button" data-action="hero-slide" data-index="2" aria-label="Ảnh bộ gốm thứ ba" aria-pressed="false"></button>
          </div>
        </div>
      </section>

      <section class="section container">
        ${sectionTitle('Bộ sưu tập', 'Khám phá theo nhu cầu', 'Gợi ý nhanh theo nhóm sản phẩm nổi bật của thương hiệu.')}
        <div class="collection-grid">
          ${collections.map(c => `
            <a class="collection-card" href="#/shop?category=${c.id}">
              <img src="${c.image}" alt="${esc(c.title)}" loading="lazy" decoding="async">
              <div class="collection-card__body">
                <h3>${esc(c.title)}</h3>
                <p>${esc(c.text)}</p>
                <span>Xem sản phẩm ${icon('arrow')}</span>
              </div>
            </a>`).join('')}
        </div>
      </section>

      <section class="section container">
        ${sectionTitle('Nổi bật', 'Sản phẩm được quan tâm nhiều', '', `<a class="section-link" href="#/shop">Xem tất cả ${icon('arrow')}</a>`)}
        <div class="product-grid">${best.map(productCard).join('')}</div>
      </section>

      <section class="section container editorial">
        <div class="editorial-copy">
          <span class="kicker">Gốm & những khoảnh khắc nhỏ</span>
          <h2>Một chút sắc màu<br>cho bàn ăn mỗi ngày.</h2>
          <p>Những món gốm với họa tiết riêng, dễ kết hợp cùng bộ sưu tập của bạn. Từ một chiếc cốc xinh đến bộ bàn ăn đồng điệu, mọi góc nhỏ đều có câu chuyện.</p>
          <a class="btn btn-primary" href="#/gifts">Xem gợi ý quà tặng ${icon('arrow')}</a>
        </div>
        <div class="editorial-stack">
          <img src="assets/media/products/hd/mugs-stack.webp" alt="Ly gốm chụp cận cảnh">
          <img src="assets/media/products/hd/gridA_1_2.webp" alt="Bộ bàn ăn xanh">
        </div>
      </section>

      <section class="section container newsletter-box">
        <div>
          <span class="kicker">Theo dõi thương hiệu</span>
          <h2>Khám phá những bộ gốm mới</h2>
          <p>Xem hình ảnh và nội dung cập nhật trên các kênh chính thức của Bách Ngân Hỷ.</p>
        </div>
        <a class="btn btn-primary" href="https://www.instagram.com/bachnganhy/" target="_blank" rel="noopener">Xem Instagram ${icon('arrow')}</a>
      </section>
    `;
  }

  function shopPage() {
    return `
      <section class="page-hero container narrow">
        <span class="kicker">Cửa hàng</span>
        <h1>Sản phẩm gốm</h1>
        <p>Danh mục được sắp xếp theo nhu cầu mua sắm: bộ sưu tập lễ hội, quà tặng và đồ dùng hằng ngày.</p>
      </section>

      <section class="container">
        <div class="shop-controls">
          <div class="chip-row">
            ${CATEGORIES.map(cat => `<button class="chip ${filters.category===cat.id?'active':''}" data-filter-category="${cat.id}">${cat.name}</button>`).join('')}
          </div>
          <div class="shop-toolbar">
            <label class="toolbar-search"><input id="shop-search" type="search" value="${esc(filters.q)}" placeholder="Tìm tên sản phẩm..."></label>
            <select id="shop-sort">
              <option value="featured" ${filters.sort==='featured'?'selected':''}>Ưu tiên nổi bật</option>
              <option value="price-asc" ${filters.sort==='price-asc'?'selected':''}>Giá tăng dần</option>
              <option value="price-desc" ${filters.sort==='price-desc'?'selected':''}>Giá giảm dần</option>
              <option value="name" ${filters.sort==='name'?'selected':''}>Tên A-Z</option>
            </select>
          </div>
        </div>
        <div class="product-grid" id="shop-grid">${filteredProducts().map(productCard).join('')}</div>
      </section>
    `;
  }

  function filteredProducts() {
    const keyword = normalize(filters.q);
    let items = PRODUCTS.filter(p => (filters.category === 'all' || p.category === filters.category) && normalize(p.name + ' ' + p.short).includes(keyword));
    switch(filters.sort) {
      case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
      case 'name': items.sort((a,b)=>a.name.localeCompare(b.name,'vi')); break;
      default: items.sort((a,b)=>Number(b.featured)-Number(a.featured));
    }
    return items;
  }

  function productPage(slug) {
    const p = bySlug(slug);
    if (!p) return emptyPage('Không tìm thấy sản phẩm', 'Sản phẩm bạn chọn không tồn tại trong bản demo này.');
    const related = PRODUCTS.filter(item => item.category === p.category && item.id !== p.id).slice(0,4);

    return `
      <section class="container product-detail">
        <div class="gallery-main">
          <button class="detail-image-button ${/\/hd\/(?:cat_|grid[A-C]_)/.test(p.image) ? 'low-resolution-original' : ''}" type="button" data-action="image-zoom" aria-label="Mở ảnh lớn ${esc(p.name)}"><img id="detail-image" src="${p.gallery?.[0] || p.image}" alt="${esc(p.name)}"><span>Di chuột để soi · Nhấn để mở lớn ↗</span></button>
          <div class="thumbs">${(p.gallery || [p.image]).map((img, index) => `<button class="thumb ${index===0?'active':''}" data-action="thumb" data-image="${img}"><img src="${img}" alt="${esc(p.name)}"></button>`).join('')}</div>
        </div>
        <div class="detail-copy">
          <span class="kicker">${esc(categoryLabel(p.category))}</span>
          <h1>${esc(p.name)}</h1>
          <div class="detail-price">${money(p.price)}</div>
          <p class="detail-short">${esc(p.short)}</p>
          <div class="detail-meta">
            <div><strong>Chất liệu</strong><span>Gốm thủ công</span></div>
            <div><strong>Phù hợp</strong><span>Dùng hằng ngày / quà tặng</span></div>
            <div><strong>Ghi chú</strong><span>Giá mô phỏng cho đồ án</span></div>
          </div>
          <p class="detail-body">${esc(p.detail)}</p>
          <div class="detail-actions">
            <button class="btn btn-primary" data-action="add-cart" data-id="${p.id}">Thêm vào giỏ ${icon('bag')}</button>
            <button class="btn btn-outline" data-action="quick" data-id="${p.id}">Xem nhanh</button>
          </div>
        </div>
      </section>

      <section class="section container">
        ${sectionTitle('Cùng bộ sưu tập', 'Bạn có thể thích thêm', '', `<a class="section-link" href="#/shop?category=${p.category}">Xem bộ sưu tập ${icon('arrow')}</a>`)}
        <div class="product-grid">${related.map(productCard).join('')}</div>
      </section>
    `;
  }

  function giftsPage() {
    const picks = PRODUCTS.filter(p => ['qua-tang','giang-sinh','meo-xinh'].includes(p.category)).slice(0,6);
    return `
      <section class="page-hero container narrow">
        <span class="kicker">Gợi ý quà tặng</span>
        <h1>Những món gốm dễ tặng, dễ gây thiện cảm</h1>
        <p>Ưu tiên các sản phẩm có hình ảnh bắt mắt, dễ phối thành set và mang cảm giác ấm áp.</p>
      </section>
      <section class="container gift-banner">
        <div>
          <h2>Set quà nên có gì?</h2>
          <ul>
            <li>Một món chính nổi bật: cốc, set ly hoặc bộ đĩa.</li>
            <li>Tông màu đồng bộ để nhìn sang hơn khi đóng gói.</li>
            <li>Thiệp viết tay và hộp quà tối giản.</li>
          </ul>
        </div>
        <img src="assets/media/products/hd/gridB_3_1.webp" alt="Cốc hoa đỏ làm quà tặng">
      </section>
      <section class="section container"><div class="product-grid">${picks.map(productCard).join('')}</div></section>
    `;
  }

  function storyPage() {
    return `
      <section class="page-hero container narrow">
        <span class="kicker">Câu chuyện thương hiệu</span>
        <h1>Bách Ngân Hỷ và định hướng thương mại điện tử</h1>
        <p>Website demo này mô phỏng kênh bán hàng mới, song song với Facebook và các nền tảng mạng xã hội hiện có.</p>
      </section>
      <section class="story-layout container">
        <div class="story-card">
          <h3>Mục tiêu của website</h3>
          <p>Tạo kênh bán chính chủ, chuẩn hơn về hình ảnh, dễ gom sản phẩm theo bộ sưu tập và nâng trải nghiệm mua hàng so với bán qua inbox.</p>
        </div>
        <div class="story-card">
          <h3>Vai trò trong chiến lược</h3>
          <p>Website giúp xây dựng niềm tin thương hiệu, làm trung tâm nội dung, hỗ trợ SEO, remarketing và liên kết với Threads, Instagram, TikTok.</p>
        </div>
        <div class="story-card">
          <h3>Điểm nhấn thiết kế</h3>
          <p>Bố cục tối giản, nhiều khoảng trắng, font sang, tông đỏ – xanh lá và hình ảnh sản phẩm thật để gợi cảm giác thủ công, ấm áp.</p>
        </div>
      </section>
    `;
  }

  function helpPage() {
    const items = [
      ['Đây có phải website chính thức của shop không?', 'Không. Đây là website demo phục vụ đồ án học thuật, dùng hình ảnh người dùng cung cấp từ các kênh thương hiệu.'],
      ['Giá trên web có phải giá bán chính thức không?', 'Không. Giá trên các sản phẩm được thiết lập để mô phỏng trải nghiệm mua sắm, không đại diện bảng giá chính thức.'],
      ['Đơn hàng có được gửi thật đến shop không?', 'Không. Đơn demo chỉ được lưu trên trình duyệt của thiết bị đang dùng.'],
      ['Khi sản phẩm gốm bị vỡ trong quá trình giao thì sao?', 'Vui lòng liên hệ trực tiếp với shop để được hướng dẫn và xác nhận chính sách đang áp dụng. Không có giao hàng thật từ website demo.']
    ];
    return `
      <section class="page-hero container narrow"><span class="kicker">Hỗ trợ</span><h1>Câu hỏi thường gặp</h1><p>Chạm hoặc nhấn Enter vào từng câu hỏi để mở / đóng nội dung.</p></section>
      <section class="faq-list container">
        ${items.map(([question,answer])=>`<details class="faq-item"><summary>${esc(question)}<span aria-hidden="true">${icon('plus')}</span></summary><p>${esc(answer)}</p></details>`).join('')}
      </section>
    `;
  }

  function checkoutPage() {
    const items = cartEntries();
    if (!items.length) return emptyPage('Giỏ hàng đang trống', 'Hãy chọn vài sản phẩm trước khi thử thanh toán demo.', '<a class="btn btn-primary" href="#/shop">Đi mua sắm</a>');

    return `
      <section class="page-hero container narrow">
        <span class="kicker">Thanh toán demo</span>
        <h1>Thông tin đặt hàng</h1>
        <p>Chức năng này chỉ dùng để minh họa quy trình đặt hàng trên website.</p>
      </section>
      <section class="checkout-layout container">
        <form id="checkout-form" class="checkout-form">
          <div class="field-grid">
            <label><span>Họ và tên *</span><input name="fullname" required></label>
            <label><span>Số điện thoại *</span><input name="phone" required pattern="0[0-9]{9}" placeholder="0900000000"></label>
          </div>
          <div class="field-grid">
            <label><span>Email</span><input name="email" type="email"></label>
            <label><span>Tỉnh / Thành phố *</span><input name="city" required></label>
          </div>
          <label><span>Địa chỉ *</span><input name="address" required></label>
          <label><span>Ghi chú</span><textarea name="notes" rows="4"></textarea></label>
          <div class="radio-group">
            <label><input type="radio" name="payment" value="COD" checked> Thanh toán khi nhận hàng</label>
            <label><input type="radio" name="payment" value="Chuyển khoản"> Chuyển khoản sau xác nhận</label>
          </div>
          <label class="consent"><input type="checkbox" name="consent" required> Tôi hiểu đây là đơn hàng demo, không gửi thật đến shop.</label>
          <button class="btn btn-primary" type="submit">Tạo đơn demo ${icon('arrow')}</button>
        </form>
        <aside class="checkout-summary">
          <h3>Tóm tắt đơn</h3>
          ${items.map(({product, qty}) => `<div class="summary-row"><span>${esc(product.name)} × ${qty}</span><strong>${money(product.price * qty)}</strong></div>`).join('')}
          <div class="summary-total"><span>Tạm tính</span><strong>${money(cartTotal())}</strong></div>
          <p class="muted">Phí vận chuyển và chi phí gói quà sẽ được xác nhận sau trong tình huống thực tế.</p>
        </aside>
      </section>
    `;
  }

  function ordersPage() {
    const orders = [...state.orders].reverse();
    return `
      <section class="page-hero container narrow">
        <span class="kicker">Đơn hàng demo</span>
        <h1>Lịch sử đơn trên thiết bị này</h1>
      </section>
      <section class="container orders-list">
        ${orders.length ? orders.map(order => `
          <article class="order-card">
            <div class="order-top">
              <div>
                <span class="kicker">${esc(order.id)}</span>
                <h3>${esc(order.customer.name)}</h3>
                <p>${esc(order.date)}</p>
              </div>
              <strong>${money(order.total)}</strong>
            </div>
            <p>${order.items.map(item => `${item.qty} × ${byId(item.id)?.name || item.id}`).join(' · ')}</p>
            <p>${esc(order.customer.city)} · ${esc(order.payment)}</p>
            <button class="mini-btn" data-action="delete-order" data-id="${order.id}">Xóa đơn</button>
          </article>
        `).join('') : `<div class="empty-box"><h3>Chưa có đơn nào.</h3><p>Thử tạo đơn demo để kiểm tra luồng mua hàng.</p></div>`}
      </section>
    `;
  }

  function successPage(id) {
    const order = state.orders.find(o => o.id === id);
    return emptyPage('Tạo đơn demo thành công', order ? `Mã đơn của bạn là ${order.id}. Dữ liệu hiện chỉ lưu trên trình duyệt này.` : 'Đơn hàng demo đã được lưu.', '<a class="btn btn-primary" href="#/orders">Xem đơn hàng demo</a>');
  }

  function emptyPage(title, text, action='') {
    return `<section class="empty-state container narrow"><h1>${title}</h1><p>${text}</p>${action}</section>`;
  }

  function render() {
    const app = $('#app');
    const previousRoute = lastRoute;
    pauseHeroCarousel();
    closeLayers();
    if ($('#quick-dialog').open) $('#quick-dialog').close();
    const parts = routeParts();
    if (parts[0] === 'shop' && lastRoute !== route()) {
      filters.category = routeQuery().get('category') || 'all';
    }
    lastRoute = route();
    syncCounts();

    if (!parts.length) {
      app.innerHTML = homePage();
      setupReveal();
      initHeroCarousel();
      if (previousRoute !== route()) window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    switch(parts[0]) {
      case 'shop': app.innerHTML = shopPage(); break;
      case 'product': app.innerHTML = productPage(parts[1]); break;
      case 'gifts': app.innerHTML = giftsPage(); break;
      case 'story': app.innerHTML = storyPage(); break;
      case 'help': app.innerHTML = helpPage(); break;
      case 'checkout': app.innerHTML = checkoutPage(); break;
      case 'orders': app.innerHTML = ordersPage(); break;
      case 'success': app.innerHTML = successPage(parts[1]); break;
      default: app.innerHTML = emptyPage('Trang không tồn tại', 'Hãy quay lại trang chủ hoặc thử chọn một liên kết khác.', '<a class="btn btn-primary" href="#/">Về trang chủ</a>');
    }
    syncCounts();
    setupReveal();
    if (previousRoute !== route()) window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderCart() {
    const body = $('#cart-panel-body');
    const footer = $('#cart-panel-footer');
    const items = cartEntries();

    if (!items.length) {
      body.innerHTML = `<div class="empty-box"><h3>Giỏ hàng trống</h3><p>Thêm vài sản phẩm để thử luồng mua hàng demo.</p></div>`;
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = items.map(({product, qty}) => `
      <article class="cart-item">
        <img src="${product.image}" alt="${esc(product.name)}">
        <div>
          <h4>${esc(product.name)}</h4>
          <p>${money(product.price)}</p>
          <div class="qty-box">
            <button data-action="minus-cart" data-id="${product.id}">${icon('minus')}</button>
            <span>${qty}</span>
            <button data-action="plus-cart" data-id="${product.id}">${icon('plus')}</button>
            <button class="text-btn" data-action="remove-cart" data-id="${product.id}">Xóa</button>
          </div>
        </div>
      </article>
    `).join('');

    footer.innerHTML = `
      <div class="summary-total"><span>Tạm tính</span><strong>${money(cartTotal())}</strong></div>
      <a class="btn btn-primary block" href="#/checkout">Thanh toán demo ${icon('arrow')}</a>
    `;
  }

  let heroTimer;
  let currentHero = 0;
  function showHeroSlide(index) {
    const images = $$('.hero-slide');
    const dots = $$('.hero-dot');
    if (!images.length) return;
    currentHero = ((index % images.length) + images.length) % images.length;
    images.forEach((node,i) => node.classList.toggle('active',i===currentHero));
    dots.forEach((node,i) => {
      node.classList.toggle('active',i===currentHero);
      node.setAttribute('aria-pressed',String(i===currentHero));
    });
  }
  function pauseHeroCarousel() { clearInterval(heroTimer); heroTimer = undefined; }
  function startHeroCarousel() {
    pauseHeroCarousel();
    if (!$('.hero-slides') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    heroTimer = window.setInterval(() => showHeroSlide(currentHero + 1), 5000);
  }
  function initHeroCarousel() { currentHero=0; startHeroCarousel(); }

  let revealObserver;
  function setupReveal() {
    if (revealObserver) revealObserver.disconnect();
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: .06, rootMargin:'0px 0px 60px 0px'});
    $$('.section, .product-card, .collection-card, .editorial, .page-hero, .hero').forEach(el => {
      el.classList.add('reveal-ready');
      revealObserver.observe(el);
    });
  }

  function openQuick(productId) {
    const p = byId(productId);
    if (!p) return;
    $('#quick-body').innerHTML = `
      <div class="quick-layout">
        <img src="${p.image}" alt="${esc(p.name)}">
        <div>
          <span class="kicker">${esc(categoryLabel(p.category))}</span>
          <h2>${esc(p.name)}</h2>
          <div class="detail-price">${money(p.price)}</div>
          <p>${esc(p.short)}</p>
          <div class="detail-actions">
            <button class="btn btn-primary" data-action="add-cart" data-id="${p.id}">Thêm vào giỏ</button>
            <a class="btn btn-outline" href="#/product/${p.slug}">Xem chi tiết</a>
          </div>
        </div>
      </div>
    `;
    $('#quick-dialog').showModal();
  }

  function updateSearchResults(query='') {
    const q = normalize(query);
    const box = $('#search-results');
    if (!q) {
      box.innerHTML = `<p class="muted">Gợi ý: cốc, mèo, penguin, quà tặng, gingham...</p>`;
      return;
    }
    const items = PRODUCTS.filter(p => normalize(p.name + ' ' + p.short + ' ' + categoryLabel(p.category)).includes(q)).slice(0,8);
    box.innerHTML = items.length ? items.map(p => `
      <a class="search-item" href="#/product/${p.slug}">
        <img src="${p.image}" alt="${esc(p.name)}">
        <span><strong>${esc(p.name)}</strong><small>${money(p.price)}</small></span>
      </a>`).join('') : `<p class="muted">Không tìm thấy sản phẩm phù hợp.</p>`;
  }

  function openImageZoom(src, alt) {
    const dlg=$('#image-dialog');
    if (!dlg) return;
    $('#zoom-image').src=src;
    $('#zoom-image').alt=alt;
    dlg.showModal();
  }

  function normalize(str='') {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  }

  function addCart(id, qty=1) {
    state.cart[id] = Math.min(99, (Number(state.cart[id]) || 0) + qty);
    save();
    syncCounts();
    renderCart();
    showToast('Đã thêm vào giỏ hàng');
  }

  function changeCart(id, diff) {
    const next = (Number(state.cart[id]) || 0) + diff;
    if (next <= 0) delete state.cart[id];
    else state.cart[id] = next;
    save();
    syncCounts();
    renderCart();
  }

  document.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const id = actionEl.dataset.id;

    if (action === 'mobile-open') openLayer('#mobile-panel');
    if (action === 'search-open') { openLayer('#search-modal'); $('#global-search').focus(); updateSearchResults(''); }
    if (action === 'cart-open') { renderCart(); openLayer('#cart-panel'); }
    if (action === 'close-all') closeLayers();
    if (action === 'add-cart') {
      const fromQuick = $('#quick-dialog').open;
      addCart(id, 1);
      if (fromQuick) { $('#quick-dialog').close(); renderCart(); openLayer('#cart-panel'); }
    }
    if (action === 'quick') openQuick(id);
    if (action === 'quick-close' && $('#quick-dialog').open) $('#quick-dialog').close();
    if (action === 'image-close' && $('#image-dialog').open) $('#image-dialog').close();
    if (action === 'plus-cart') changeCart(id, 1);
    if (action === 'minus-cart') changeCart(id, -1);
    if (action === 'remove-cart') { delete state.cart[id]; save(); syncCounts(); renderCart(); }
    if (action === 'delete-order') { state.orders = state.orders.filter(o => o.id !== id); save(); render(); showToast('Đã xóa đơn demo'); }
    if (action === 'image-zoom') { const img=$('#detail-image'); if(img) openImageZoom(img.src,img.alt); }
    if (action === 'hero-slide') { showHeroSlide(Number(actionEl.dataset.index)); startHeroCarousel(); }
    if (action === 'thumb') {
      const image = actionEl.dataset.image;
      $('#detail-image').src = image;
      $$('.thumb').forEach(btn => btn.classList.toggle('active', btn === actionEl));
    }
  });

  document.addEventListener('click', (e) => {
    const catBtn = e.target.closest('[data-filter-category]');
    if (!catBtn) return;
    filters.category = catBtn.dataset.filterCategory;
    render();
  });

  // Progressive enhancement: detail image follows pointer (mouse/stylus), never traps touch.
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const target = event.target.closest('.detail-image-button');
    if (!target) return;
    const bounds = target.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, (event.clientX - bounds.left) / bounds.width * 100));
    const y = Math.min(100, Math.max(0, (event.clientY - bounds.top) / bounds.height * 100));
    target.style.setProperty('--zoom-x', `${x}%`);
    target.style.setProperty('--zoom-y', `${y}%`);
    target.classList.add('is-zooming');
  }, { passive: true });
  document.addEventListener('pointerout', event => {
    const target=event.target.closest('.detail-image-button');
    if (target && !target.contains(event.relatedTarget)) target.classList.remove('is-zooming');
  });
  document.addEventListener('pointerenter', e => { if(e.target.matches?.('.hero-media')) pauseHeroCarousel(); }, true);
  document.addEventListener('pointerleave', e => { if(e.target.matches?.('.hero-media')) startHeroCarousel(); }, true);

  // If an asset is unavailable, show a clear fallback rather than a broken image icon.
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallbackShown) return;
    img.dataset.fallbackShown='1';
    img.src='assets/media/products/image-unavailable.svg';
    img.alt='Ảnh sản phẩm đang được cập nhật';
  }, true);

  document.addEventListener('input', (e) => {
    if (e.target.id === 'global-search') updateSearchResults(e.target.value);
    if (e.target.id === 'shop-search') {
      filters.q = e.target.value;
      $('#shop-grid').innerHTML = filteredProducts().map(productCard).join('') || `<div class="empty-box"><h3>Không có kết quả phù hợp.</h3></div>`;
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'shop-sort') {
      filters.sort = e.target.value;
      $('#shop-grid').innerHTML = filteredProducts().map(productCard).join('');
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id !== 'checkout-form') return;
    e.preventDefault();
    const form = e.target;
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const order = {
      id: 'DEMO-' + String(Date.now()).slice(-8),
      date: new Intl.DateTimeFormat('vi-VN',{dateStyle:'medium', timeStyle:'short'}).format(new Date()),
      customer: {
        name: String(fd.get('fullname') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        city: String(fd.get('city') || '').trim(),
        address: String(fd.get('address') || '').trim(),
        notes: String(fd.get('notes') || '').trim()
      },
      payment: String(fd.get('payment') || 'COD'),
      items: cartEntries().map(({product, qty}) => ({ id: product.id, qty })),
      total: cartTotal()
    };

    state.orders.push(order);
    state.cart = {};
    save();
    syncCounts();
    location.hash = `#/success/${order.id}`;
  });


  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (!link) return;
    closeLayers();
    if ($('#quick-dialog').open) $('#quick-dialog').close();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openLayer('#search-modal');
      $('#global-search').focus();
      updateSearchResults('');
    }
    if (e.key === 'Escape') {
      closeLayers();
      if ($('#quick-dialog').open) $('#quick-dialog').close();
      if ($('#image-dialog').open) $('#image-dialog').close();
    }
  });

  $('#overlay').addEventListener('click', closeLayers);
  $('#image-dialog').addEventListener('click', e => { if(e.target === $('#image-dialog')) $('#image-dialog').close(); });
  $('#quick-dialog').addEventListener('click', (e) => {
    if (e.target === $('#quick-dialog')) $('#quick-dialog').close();
  });
  window.addEventListener('hashchange', render);
  window.addEventListener('scroll', () => {
    $('#site-header')?.classList.toggle('is-scrolled', window.scrollY > 15);
  }, {passive:true});

  syncCounts();
  render();
})();
