# Hướng dẫn dùng ngrok để public link

## Bước 1: Cài đặt ngrok

### Cách 1: Tải trực tiếp (Windows)
1. Vào trang https://ngrok.com/download
2. Tải file `ngrok.exe` cho Windows
3. Giải nén vào thư mục bất kỳ (ví dụ: `C:\ngrok\`)
4. Thêm thư mục đó vào PATH hoặc dùng đường dẫn đầy đủ

### Cách 2: Dùng Chocolatey (nếu bạn có)
```powershell
choco install ngrok
```

### Cách 3: Dùng Scoop (nếu bạn có)
```powershell
scoop install ngrok
```

## Bước 2: Đăng ký tài khoản ngrok (FREE)

1. Vào https://dashboard.ngrok.com/signup
2. Đăng ký tài khoản miễn phí
3. Vào trang https://dashboard.ngrok.com/get-started/your-authtoken
4. Copy **authtoken** của bạn (dạng: `2abc123xyz...`)

## Bước 3: Kết nối ngrok với tài khoản

Mở PowerShell và chạy:
```powershell
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

Thay `YOUR_AUTHTOKEN_HERE` bằng token bạn vừa copy.

## Bước 4: Chạy Docker containers trước

Đảm bảo Docker containers đã chạy:
```powershell
docker compose up -d
```

Kiểm tra:
```powershell
docker ps
```

Phải thấy: mongo, backend1, backend2, client-frontend, admin-frontend

## Bước 5: Chạy ngrok để tạo tunnel

Mở PowerShell MỚI (giữ nguyên PowerShell cũ đang chạy Docker), chạy:
```powershell
ngrok http 80
```

Ngrok sẽ hiển thị:
```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:80
Forwarding   http://abc123.ngrok-free.app -> http://localhost:80
```

**Copy URL HTTPS** (ví dụ: `https://abc123.ngrok-free.app`)

## Bước 6: Sửa docker-compose.yml với URL ngrok

Sửa file `docker-compose.yml`:
- Thay `VITE_BACKEND_URL: http://localhost` thành URL ngrok HTTPS của bạn
- Làm cho cả `client-frontend` và `admin-frontend`

## Bước 7: Rebuild FE containers

```powershell
docker compose build client-frontend admin-frontend
docker compose up -d client-frontend admin-frontend
```

## Bước 8: Test

Mở trình duyệt và truy cập:
- FE User: `https://abc123.ngrok-free.app`
- FE Admin: `https://abc123.ngrok-free.app:81` (hoặc dùng ngrok riêng cho port 81)

---

## Lưu ý quan trọng:

1. **URL ngrok FREE sẽ thay đổi mỗi lần restart ngrok** (trừ khi bạn mua plan trả phí)
2. Mỗi lần URL ngrok thay đổi → phải rebuild FE lại
3. Ngrok FREE có giới hạn số lượng request/giờ
4. Để admin cũng có URL riêng, bạn có thể chạy thêm 1 ngrok tunnel cho port 81

## Giải pháp tốt hơn (tùy chọn):

Nếu muốn admin cũng có URL riêng, chạy ngrok thứ 2:
```powershell
# Terminal 1: ngrok cho client (port 80)
ngrok http 80

# Terminal 2: ngrok cho admin (port 81)
ngrok http 81
```

Rồi sửa docker-compose.yml:
- `client-frontend`: dùng URL ngrok của port 80
- `admin-frontend`: dùng URL ngrok của port 81

