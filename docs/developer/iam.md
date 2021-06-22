# Identify and Access Management

::: tip
Mỗi tổ chức sử dụng IT service đều có nhiều resources, projects... 
Tuy nhiên không phải ai cũng có thể truy cập được tất cả ngoại trừ người có quyền cao nhất.
Ví dụ phòng kế toán không thể xem thông tin được thông tin của phòng IT.
Chính vì vậy cần có concept để giới hạn role của mỗi phòng/ban chỉ được đảm nhiệm một nhiệm vụ nhất định
:::
AWS IAM thiết kế để quản lý users, groups, roles, policies để quản lý truy cập AWS resources. IAM có 2 nhiệm vụ chính:
  - **Authentication**: Xác thực người dùng
  - **Authorization**: Phân quyền người dùng

## AWS root user
Khi tạo tài khoản AWS lần đầu tiên, thì đó cũng là root user.
Khi dùng email và password được gọi là "**root account credentials**"\
Root account có quyền cao nhất bao gồm cả thông tin billing
::: warning
AWS recommended hạn chế dùng root account hàng ngày, thay vì đó tạo các IAM user tùy thuộc vào role của nó
:::
