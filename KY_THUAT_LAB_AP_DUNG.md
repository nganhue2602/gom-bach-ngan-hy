# KỸ THUẬT HTML / CSS / JAVASCRIPT TỪ LAB ĐƯỢC ỨNG DỤNG

| Kiến thức lab | Cách sử dụng trên website | Nơi xem |
|---|---|---|
| CSS `:hover` | Card nổi lên, bóng đổ, ảnh zoom, ảnh thứ hai xuất hiện, Quick View hiện trên ảnh | `styles.css`: `.product-card:hover` và `.product-img-alt` |
| CSS `:focus-visible`, `:focus-within` | Hiệu ứng khi dùng Tab, người dùng bàn phím vẫn xem nhanh và chọn danh mục được | `styles.css`: `:where(...):focus-visible`, `.product-card:focus-within` |
| CSS `transform`, `transition` | Phóng to/nhấc card, đổi ảnh mượt, nhấn button co nhẹ, navigation underline | `styles.css` |
| CSS Grid/Flexbox | Bố cục cửa hàng, gallery, giỏ, footer; tự đổi số cột theo viewport | `styles.css`: `.product-grid`, `.collection-grid`, media queries |
| DOM + sự kiện `click` | Thêm giỏ, tăng giảm số lượng, Quick View, mở menu, chọn ảnh, modal zoom | `app.js`: `document.addEventListener('click', ...)` |
| DOM + sự kiện `input`/`change` | Lọc và tìm theo chữ, sắp xếp theo giá | `app.js`: các event listener `input`, `change` |
| DOM + `classList` | Ẩn/hiện carousel, active thumbnails, trạng thái focus/zoom, reveal | `app.js`: `classList.toggle`, `.add`, `.remove` |
| Hiển thị / ẩn nội dung (Lab jQuery) | Quick View, mobile menu, giỏ và FAQ accordion; sử dụng JS DOM thuần và `<details>` để tránh phụ thuộc CDN | `app.js`, `index.html` |
| Sử dụng mảng và template literal | Tự sinh card từ mảng `PRODUCTS`, `filter`, `map`, `sort` | `products.js`, `app.js` |
| Responsive | Desktop / tablet / mobile, không ẩn chức năng quan trọng trên thiết bị cảm ứng | `styles.css`: `@media` |
| Tôn trọng khả năng tiếp cận | Focus rõ ràng, nút có `aria-label`, tôn trọng `prefers-reduced-motion` | `index.html`, `styles.css`, `app.js` |

**Điểm cần nói rõ khi thuyết trình:** Website dùng **JavaScript DOM thuần** để thực hiện các hành vi tương đương phần thực hành jQuery như `.show()/.hide()`, `.on()`, thao tác class và đổi ảnh. Không sử dụng thư viện jQuery; mục tiêu là giữ website GitHub Pages độc lập với CDN.
