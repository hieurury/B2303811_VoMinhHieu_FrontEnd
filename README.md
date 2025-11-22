# BÁO CÁO MÔN CT449 - CONTACTBOOK FRONTEND

## Giới Thiệu Dự Án

Dự án **ContactBook Frontend** là ứng dụng quản lý danh bạ liên hệ được xây dựng với Vue.js 3 và Naive UI. Ứng dụng cung cấp giao diện người dùng thân thiện, hỗ trợ đa ngôn ngữ (Tiếng Anh/Tiếng Việt) và chế độ Dark/Light mode.

## Các Chức Năng Chính

### 1. Quản Lý Liên Hệ
- **Thêm liên hệ mới**: Tạo liên hệ với thông tin đầy đủ (tên, số điện thoại, email, địa chỉ)
- **Xem danh sách liên hệ**: Hiển thị tất cả liên hệ đã lưu
- **Xem chi tiết liên hệ**: Xem thông tin chi tiết của từng liên hệ
- **Chỉnh sửa liên hệ**: Cập nhật thông tin liên hệ
- **Xóa liên hệ**: Xóa một hoặc tất cả liên hệ

### 2. Tìm Kiếm & Lọc
- **Tìm kiếm liên hệ**: Tìm kiếm theo tên, số điện thoại, email, địa chỉ
- **Lọc theo danh mục**: 
  - Tất cả liên hệ
  - Liên hệ yêu thích

### 3. Yêu Thích
- **Đánh dấu yêu thích**: Đánh dấu liên hệ quan trọng
- **Quản lý danh sách yêu thích**: Xem và quản lý các liên hệ yêu thích

### 4. Validation
- Kiểm tra định dạng số điện thoại
- Kiểm tra định dạng email
- Kiểm tra các trường bắt buộc

### 5. Giao Diện
- **Dark/Light Mode**: Chuyển đổi giữa chế độ sáng/tối
- **Đa ngôn ngữ**: Hỗ trợ Tiếng Anh và Tiếng Việt
- **Responsive**: Tương thích với mọi kích thước màn hình

## Các Trang Hiện Tại

### 1. **HomePage** (`/`)
- Hiển thị danh sách tất cả liên hệ
- Tìm kiếm liên hệ
- Phân loại theo tabs (Tất cả / Yêu thích)
- Xóa tất cả liên hệ
- Drawer hiển thị chi tiết và chỉnh sửa liên hệ

### 2. **AddContactPage** (`/add-contact`)
- Form thêm liên hệ mới
- Validation dữ liệu đầu vào
- Chuyển hướng về trang chủ sau khi thêm thành công

### 3. **ErrorPage** (`/404`)
- Trang báo lỗi 404
- Nút quay lại trang trước
- Nút về trang chủ

### 4. **MainLayout**
- Layout chính của ứng dụng
- Header với logo và các nút điều khiển
- Nút chuyển đổi ngôn ngữ
- Nút chuyển đổi Dark/Light mode
- Navigation menu

## Các Công Nghệ Sử Dụng

### Frontend Framework
- **Vue.js 3.5.22**: Framework JavaScript hiện đại với Composition API
- **Vite 7.1.7**: Build tool nhanh và hiệu quả

### UI Library & Styling
- **Naive UI 2.43.1**: Component library chuyên nghiệp cho Vue 3
- **TailwindCSS 4.1.17**: Utility-first CSS framework
- **Font Awesome**: Thư viện icon

### Routing
- **Vue Router 4.6.3**: Official router cho Vue.js

### HTTP Client
- **Axios 1.13.2**: Promise-based HTTP client

### State Management
- **Custom Hooks**: 
  - `useDark.js`: Quản lý Dark/Light mode
  - `useLang.js`: Quản lý đa ngôn ngữ
  - `useSize.js`: Quản lý responsive size

### API Services
- **apiContact.js**: Tập trung các API calls để quản lý liên hệ

## Cấu Trúc Thư Mục

```
contact-books/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom composition hooks
│   │   ├── useDark.js
│   │   ├── useLang.js
│   │   └── useSize.js
│   ├── router/         # Route configuration
│   │   └── index.js
│   ├── services/       # API services
│   │   └── apiContact.js
│   ├── views/          # Page components
│   │   ├── layouts/
│   │   │   └── MainLayout.vue
│   │   └── page/
│   │       ├── AddContactPage.vue
│   │       ├── HomePage.vue
│   │       └── ErrorPage.vue
│   ├── App.vue         # Root component
│   ├── main.js         # Entry point
│   └── style.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```


## API Endpoints

Ứng dụng kết nối với Backend API thông qua các endpoints sau:

- `POST /contacts/create` - Tạo liên hệ mới
- `GET /contacts` - Lấy danh sách tất cả liên hệ
- `GET /contacts/:id` - Lấy thông tin chi tiết liên hệ
- `PUT /contacts/update/:id` - Cập nhật thông tin liên hệ
- `DELETE /contacts/delete/:id` - Xóa một liên hệ
- `DELETE /contacts/delete/all` - Xóa tất cả liên hệ

## 👨‍💻 Thông Tin

- **Môn học**: CT449 - Phát triển ứng dụng web
- **Sinh viên**: Võ Minh Hiếu
- **MSSV**: B2303811
- **Repository**: [B2303811_VoMinhHieu_FrontEnd](https://github.com/hieurury/B2303811_VoMinhHieu_FrontEnd)
