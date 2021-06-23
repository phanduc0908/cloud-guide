# Virtual private cloud
> Đầu tiên cần hiểu về một vài concepts về network :tada: :grin: :grin:
  - Khi 2 hay nhiều máy tính liên kết, giao tiếp với nhau được gọi là **network**
  - Resources trong network được chia nhỏ ra theo cách thành phần logic được gọi là **subnets**
  - **private subnet**
  - **public subnet**

## AWS VPC
> Môi trường mạng ảo riêng biệt, độc lập với môi trường Internet.\
  Dùng để quản lý resources AWS

::: tip Classless Inter-Domain Routing (CIDR)
- Khi tạo VPC, bạn cần cung cấp cho VPC 1 IP range, được gọi là **CIDR** (VD: 10.0.0.0/12)
- CIDR là 1 set IP tiêu chuẩn dùng để định danh, phân bố cho resource (VD: EC2)) trong network
- [Tool convert CIDR -> IP range](https://www.ipaddressguide.com/cidr)
:::

## Subnet
::: tip Notes
- Khi chia subnet, bạn cần xác định 1 unique CIDR cho subnet đó
- **CIDR subnet** phải là tập con của **CIDR VPC**
- Mỗi subnet phải nằm trong single AZ, **không** thể nằm rải rác ở multiple AZs
:::
### Private subnet
- Bất kỳ incomming traffic từ internet đều không thể access resources bên trong private subnet
- Ngược lại outgoing traffic từ private subnet ra ngoài internet đều không được. Traffict của private subnet được định tuyến thông qua **Network Address Translator (NAT)** getway
- Mỗi resource trong private subnet đều được assign cho 1 private IP, private IP này chỉ được dùng trong nội bộ VPC
- 1 **Route table** định tuyến traffic đến/đi subnet, nó xác định được subnet là private hay public bằng cách nó có đi qua **Internet Getway (IGW)** hay không?
### Public subnet
- Traffic có thể access được ra ngoài internet, và ngược lại
- Resources trong public subnet được assign public IP, và có thể truy cập từ bên ngoài internet
- Outgoing traffic KHÔNG định tuyến qua **NAT**, mà được định tuyến qua **IGW**
<img :src="('/images/vpc-subnet.png')" alt="VPC subnet">
> Bạn có thể thấy traffic của private subnet đi qua net-gw-xxx, còn traffic của public subnet đi qua igw-xxx

## IP addressing
> Amazon sử dụng IPv4 cho instance và VPC CIDR
### Private IP
- Khi mỗi instance launched Amazon dùng **Dynamic Host Configuration Protocol (DHCP)** để assign 1 private IP.
- Private IP chỉ dùng trong nội bộ
- Khi instance stopped hay terminated, Amazon sẽ thu hồi lại IP đó, và cấp phát lại khi instance được restart lại
### Public IP
- Khi EC2 launched, nó tự động được assign 1 puiblic IP và DNS để truy cập từ bên ngoài internet
- Khi instance stopped hay terminated, Amazon sẽ thu hồi lại IP đó, và cấp phát lại khi instance được restart lại
- Để public IP không bị thay đổi khi stop/start => Cần dùng **Elastic IP address**
### Elastic IP address
::: tip
- **Elastic IP address** là public IPv4 được allocate cho AWS account. Elastic IP có thể được assign hoặc release
- **Elastic IP address** mà ko assign cho instance nào| hoặc instance stopped, Amazon sẽ tính phí theo giờ vì lẵng phí. Amazon sẽ không tính phí nếu nó được assign cho instance running
- Không thể dùng chung 1 Elastic IP address ở regions khác nhau
:::
