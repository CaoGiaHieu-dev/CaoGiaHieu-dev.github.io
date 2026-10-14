# Cao Gia Hiếu — Flutter Developer Portfolio

Personal portfolio and open-source registry showcase of **Cao Gia Hiếu** ([@CaoGiaHieu-dev](https://github.com/CaoGiaHieu-dev)), Flutter Developer and Pub.dev author from Vietnam.

Live website: **[https://caogiahieu-dev.github.io](https://caogiahieu-dev.github.io)**

---

## 🚀 Tính năng nổi bật

- **Angular 21 Zoneless Architecture**: Tối ưu hóa hiệu năng và tốc độ tải trang bằng signal-based reactive state, không phụ thuộc Zone.js.
- **Hỗ trợ Đa ngôn ngữ (i18n)**: Chuyển đổi mượt mà giữa Tiếng Việt (VI) và English (EN), đồng bộ với ngôn ngữ trình duyệt và lưu trữ cục bộ.
- **Dark / Light Theme Toggle**: Giao diện tối sang trọng và giao diện sáng thanh lịch, tự động phát hiện `prefers-color-scheme`.
- **Hiển thị 3 Package chính thức trên Pub.dev**:
  1. `dynamic_logger` (^0.5.0) — Thư viện ghi log có cấu trúc và hiệu năng cao.
  2. `http_security_pinning` (^2.0.0) — Ghim chứng chỉ SSL/TLS SPKI SHA-256 chống tấn công Man-in-the-Middle.
  3. `refresh_sticky` (^0.1.2) — Thành phần thanh trạng thái cuộn dính mượt mà 120 FPS.
- **Kiến trúc Monorepo**: Chi tiết mẫu kiến trúc `flutter-monorepo-codebase` với Dart Pub Workspaces và Clean Architecture.
- **Open Source Contributions**: Tổng hợp các đóng góp trực tiếp vào hệ sinh thái Flutter Google.
- **SEO & Social Share Previews**: Open Graph 1200x630 vector preview banner, Twitter card và dữ liệu cấu trúc Schema.org JSON-LD.

---

## 🛠️ Hướng dẫn phát triển cục bộ (Local Development)

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển (Dev server)
npm run dev
# hoặc
npm start

# Mở trình duyệt tại http://localhost:3000
```

---

## 📦 Hướng dẫn Deploy lên GitHub Pages (Tự động 100%)

Dự án đã được tích hợp sẵn quy trình **GitHub Actions** tự động tại `.github/workflows/deploy.yml`.

### Cách kích hoạt trên GitHub:
1. Đẩy toàn bộ mã nguồn lên nhánh `main` (hoặc `master`) của repository `CaoGiaHieu-dev.github.io`:
   ```bash
   git add .
   git commit -m "feat: complete portfolio app with dark/light theme and github pages workflow"
   git push origin main
   ```
2. Trên giao diện GitHub của repository:
   - Vào **Settings** ➔ **Pages** (ở cột bên trái).
   - Tại mục **Build and deployment** ➔ **Source**: Chọn **`GitHub Actions`** (thay vì *Deploy from a branch*).
3. GitHub Actions sẽ tự động kích hoạt workflow `Deploy Angular App to GitHub Pages`, chạy build và triển khai trang web trực tiếp tại **`https://caogiahieu-dev.github.io`**.