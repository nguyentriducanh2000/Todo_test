# Todo-Test
## Requirements analysis & giải quyết
- Requirements: Thiết kế 1 giao diện bao gồm: 
+ Hiển thị và cho phép chọn user
+ Bảng cho thông tin các task tương ứng với user, thể hiện những task đã/chưa hoàn thành, cho phép ấn hoàn thành.
+ Hiện thị số lượng task đã hoàn thành/ tổng số task.
-> thiết kế frontend từ những yêu cầu trên, gọi API phù hợp để lấy dữ liệu từ backend( đã có sẵn).
- Lựa chọn công nghệ / công cụ thực hiện:
+ ReactJS: 
    * Real-time interact:  thêm các tính năng như thêm, sửa, xóa công việc mà không cần phải tải lại trang.
    * Re-use: sử dụng lại các componant nhiều lần và linh hoạt
    * State Management: sử dụng state và props, cho phép quản lý và thay đổi trạng thái -> thay đổi giao diện thông qua trạng thái.
    * Virtual DOM: tối ưu hoá DOM, cập nhật nhanh chóng mà không ảnh hưởng đến các DOM khác.
    * Gần gũi, dễ sử dụng, nhiều thư viện...
+ Material-UI: thư viện UI phổ biến, có sẵn các thiết kế UI để sử dụng và tuỳ chỉnh.
+ Fetch API: phổ biến, sử dụng đơn giản và hiệu quả.

## Hướng dẫn cài đặt và sử dụng:
- Yêu cầu: cài đặt **Nodejs** và **npm**.
- Cài đặt:
+ tới thư mục chứa srccode và cài đặt các thư viện cần thiết, ở đây là MUI.
```javascript
    npm install @mui/material @mui/icons-material
```
+ khởi chạy project
```code
    npm start
```
+ Giao diện được hiển thị trên trình duyệt với đường dẫn http://localhost:3000 