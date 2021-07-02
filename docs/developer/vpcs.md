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

## Security
::: tip
  - Amazon cung cấp 2 features để bảo mật(network security) và theo dõi(monitoring)
  - **Security group and NACL** dùng cho network security, **Flow logs** cho network monitoring
  - **Security group** hoạt động như firewall level của EC2
  - **NACL - Network Access Control Lists** hoạt động như firewall level của subnet
  - **Flow logs** cung cấp thông tin về network traffic
:::
<img :src="('/images/security-diagram.png')" alt="VPC security">

### Security group
::: tip Notes
- Mỗi security group cps tối đa 50 rules inbound vad outbound
- Tối đa có 5 security group được attach cho 1 instance
- Một security group có thể attach cho nhiều hơn 1 EC2 instance
- Trong trường hợp nhiều rule tương đồng apply cho EC2 instance thì rule nào rộng hơn sẽ được apply. Ví du:
  + Rule 1: cho phép giao tiếp trên TCP port 22 từ IP: 10.115.53.222
  + Rule 2: cho phép giao tiếp trên TCP port 22 từ mợi nơi (0.0.0.0)
  + => Rule 2 (Cho phép truy cập từ mọi nơi) sẽ được apply
- Khi 1 rule nào được thay đổi, ngay lập tức được apply real-time
- Mặc định, khi security group mới được tạo, nó sẽ **block tất cả incomming communication** và **cho phép tất cả outgoing communication**
- Chỉ có thể allow rule, không thể denied rule
- **Stateful**, có nghĩa là những traffic được allowed ở inbound thì cũng tự động được allowed ở outbound. Vì thế ko cần đặt outbound rule nến rule đó đã được định nghĩa ở inbound
:::
### Network ACLs (NACLs)
::: tip Notes
- Mỗi subnet trong VPC được liên kết với ít nhất 1 NACLs, mặc định khi tạo mới VPC sẽ tự động tạo 1 NACLs
- VPC, NACLs mặc định sẽ allow tất cả traffic inbound và outbound
- Bạn cũng có thể tạo 1 custome NACLs, nhưng mặc định nó sẽ block tất cả inbound/outbound cho đến khi thêm rule mới
- NACL có thế gán tới nhiều subnet, tuy nhiên 1 subnet chỉ có thể được gán bởi 1 NACL ở 1 thời điểm. Khi bạn gán với 1 NACL mới, những cái cũ sẽ bị gỡ bỏ.
- Một network ACL chứa 1 danh sách các quy tắc được đánh số. Bắt đầu bởi rule có số nhỏ nhất, để xác định lưu lượng mạng đươc cho phép ra vào. Số lớn nhất mà bạn có thể sử dụng cho 1 rule là **32766**
- NACL phân biệt rõ inbound, outbound rule. Ban có thể allow hay denied rule
-  **Stateless**, có nghĩa là những traffic được allowed ở inbound thì KHÔNG tự động được allowed ở outbound
:::
### Comparison Security group vs NACL
<img :src="('/images/compare-nacl-sg.png')" alt="VPC security">

### Flow logs
::: danger Review lai
Xem lại
:::

## VPC networking components
### ENI (Elastic Network Intefaces)
::: tip
- ENI đại diện như 1 card mạng ảo (*virtual network card*)
- Thuộc tính chính của ENI:
  + 1 primary private IPv4 trong range IP của VPC/subnet
  + 1 hay nhiều secondary private IPv4 trong range IP của VPC/subnet
  + 1 Elastic IP address (IPv4) per private IPv4 address
  + 1 public IPv4 address
  + 1 hay nhiều IPv6 addresses
  + 1 hay nhiều security group
  + 1 MAC address (Media Access Control)
:::
> Khi 1 instance EC2 được tạo trong VPC, nó sẽ tự động tạo 1 Network Interface và attach vào EC2. NI(Network interface) default này là *primate network interface*, và ko thể detach NI này. Tuy nhiên, bạn có thể tạo thêm 1 NI khác được gọi là *secondary network interfaces*, NI này có thể detach hay atach vào instance khác
### Route table
> *Route tables* chứa những rules giúp định tuyến network traffic
- Mỗi VPC cần có 1 Route table, nó không thể bị xóa đi, chỉ có thể modify
### IGW (Internet Getway)
> **Internet Getway** giúp EC2 instances có thể giao tiếp ra ngoài internet
::: tip
- Nếu 1 subnet được liên kết với route table và routed đến 1 IGW thì đó là *public subnet*
- Ngược lại, nếu 1 subnet được liên kết trong route table và không routed đến IGW thì đó là *private subnet*
:::
### Egress-only IGW
::: tip
- Chỉ làm việc với IPv6
- Cho phép resource connect ra bên ngoài internet, nhưng prevent bên ngoài internet connect với resource bên trong subnet hay VPC
:::
<img :src="('/images/egress-only-igw.png')" alt="egress-only">

## NAT (Network Address Translation)
::: tip Cở chế hoạt động
Khi các resources trong private subnet muốn request ra bên ngoài internet(VD: npm install package), **NAT** sẽ thay đổi IP private của tài nguyên thành IP của mình và request ra ngoài internet. Khi có response NAT sẽ gửi lại response cho private IP của resource tương ứng. Đó là cách để resources trong private subnet có thể giao tiếp ra bên ngoài internet
:::
Có 2 kiểu NAT devices:
- **NAT getway**: được quản lý bởi AWS
- **NAT instance**: Tự mình tạo trên EC2 instance, gọi là NAT instance
NAT devices không support IPv6, vì vậy nếu bạn cần dùng IPv6 cho EC2 instance, bạn cần dùng egress-only IGW
### NAT getway
> NAT gateway dùng để instances trong private subnet có thể connect với services bên ngoài VPC, nhưng ko tạo kết nối giữa instances và services đó
Khi tạo mới NAT getway có 2 loại kết nối:
- **Public(default)**: 
  + Có thể connect ra bên ngoài internet
  + Phải allocated Elastic IP
- **Private**: 
  + Có thể connect với VPC khác, không thể connect internet. Nếu IGW attach vào *private NAT* thì connection đó cũng sẽ bị drop
  + Không cần allocated Elastic IP
### NAT instance
- Là instance giống EC2
### Comparison NAT instance and NAT getway
::: tip
NAT getway được managed bởi AWS, vì vậy được recommended sử dụng hơn là NAT instance (managed bởi bạn). NAT getway better avaiability và bandwidth cao hơn NAT instance (vì NAT instance còn dựa vào EC2 type)
:::
