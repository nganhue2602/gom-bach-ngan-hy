# GỐM BÁCH NGÂN HỶ — WEBSITE DEMO NÂNG CẤP LAB

Đây là trang web mô phỏng phục vụ đồ án **Chiến lược kinh doanh TMĐT**, viết bằng **HTML + CSS + JavaScript DOM thuần**. Không phải website chính thức, không nhận đơn hoặc thanh toán thật.

## 1. Cập nhật lên GitHub Pages qua GitHub Desktop

1. **Giải nén** ZIP mã nguồn cập nhật.
2. Trong GitHub Desktop chọn repository **`gom-bach-ngan-hy`** → **Repository → Show in Explorer**.
3. **Copy tất cả các file và thư mục nằm BÊN TRONG thư mục vừa giải nén** vào thư mục repository đó. Nếu Windows hỏi thay thế `index.html`, `styles.css`, `app.js`, `products.js`, `README.md`, hãy chọn **Replace the files in the destination**.
4. Giữ nguyên đường dẫn ảnh: `assets/media/products/hd/`. Không đặt `index.html` trong thư mục con.
5. Trở lại GitHub Desktop, phần Changes phải hiện file mới và file đã sửa. Nhập Summary: **`Improve image quality and Lab hover effects`**.
6. Nhấn **Commit to main**, tiếp theo **Push origin**.
7. Xem trang: https://nganhue2602.github.io/gom-bach-ngan-hy/#/ (nhấn **Ctrl+F5** nếu vẫn thấy nội dung cũ).

**Lưu ý:** Không cần tạo repository mới, không cần bật GitHub Pages lại. Các file ảnh gốc cũ có thể tiếp tục nằm trong repository, nhưng website mới ưu tiên dùng ảnh WebP đã xử lý ở `assets/media/products/hd/`.

## 2. Tính năng trải nghiệm

- Hover trên thẻ sản phẩm: ảnh phóng to nhẹ, chuyển sang ảnh khác nếu có gallery, hiện **Xem nhanh**.
- Nút **Xem nhanh** mở hộp thoại có tên, hình và giá demo. Thêm vào giỏ từ hộp thoại sẽ đóng Quick View và mở giỏ.
- Trang chi tiết: di chuột trên ảnh để soi với **zoom theo vị trí con trỏ**; nhấp ảnh để mở lớn; nhấp thumbnail để đổi ảnh.
- Carousel ảnh hero tự chuyển sau 5 giây, tạm dừng khi rê chuột lên, có nút chọn ảnh; tắt tự chuyển nếu người dùng bật Reduce motion.
- Menu responsive; hover navigation underline; tìm kiếm toàn cục và tìm trong shop; tìm kiếm nhanh bằng **Ctrl+K / Cmd+K**.
- Lọc bộ sưu tập, sắp xếp giá, tìm theo tên, quick add, tăng/giảm/xóa giỏ.
- Checkout **demo** và lịch sử đơn lưu trên trình duyệt. Không gửi dữ liệu đến shop.
- FAQ mở/đóng nội dung với thẻ `details`; chuyển động xuất hiện khi cuộn trang; trạng thái `:focus-visible` để dùng bàn phím.
- Mobile không phụ thuộc hover; giữ ảnh và các nút rõ ràng, không tràn ngang ở màn 390 px.

## 3. Giới hạn về hình ảnh

Ảnh sản phẩm được xử lý từ chính ảnh người dùng đã cung cấp, không phải ảnh bịa hoặc thay họa tiết gốm. Một số ảnh gốc là **ảnh ghép đã bị cắt thành ô khoảng 240×240 px**. Chúng đã được nội suy Lanczos và làm nét nhẹ để xem êm hơn, nhưng không thể tái tạo chi tiết thật đã mất. Để sắc nét tối đa khi zoom, cần xin shop **ảnh gốc riêng từng sản phẩm từ 1000–1600 px trở lên** rồi thay theo đường dẫn trong `products.js`.

## 4. Mã nguồn

- `index.html`: layout, header, footer, dialogs.
- `styles.css`: màu đỏ–xanh lá, responsive, `:hover`, `:focus-visible`, transition, transform, zoom.
- `products.js`: danh mục sản phẩm và đường dẫn ảnh.
- `app.js`: DOM events, hiển thị trang, Quick View, giỏ hàng, tìm kiếm, carousel, zoom.
- `assets/media/products/hd/`: ảnh đã tối ưu WebP.
- `assets/media/products/image-unavailable.svg`: ảnh thay thế có thông báo khi đường dẫn bị sai.
- `KY_THUAT_LAB_AP_DUNG.md`: giải thích cho phần trình bày với giảng viên.

## 5. Ghi chú học thuật

Tên và giá sản phẩm trong demo dùng để minh họa chức năng, **không phải thông tin bán hàng chính thức do shop xác nhận**. Nội dung đặt hàng, vận chuyển, trả tiền đều mô phỏng. Không dùng website để nhận thông tin khách hàng thật.
