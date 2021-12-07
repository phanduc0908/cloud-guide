# Introduction to AWS
> Giới thiệu về Amazon Web Service

## Accessing AWS services
> Hiện tại có 4 phương thức để truy cập những services của AWS
- **AWS Management Console**: Truy cập từ giao diện (website của AWS)
- **AWS Comand Line Interface(CLI)**
- **AWS Software Development Kits (SDKs)**: Kết hợp với các language khác để phát triển (NodeJS...)


## AWS global infrastructure
  > AWS cung cấp dịch vụ trên cơ sở hạ tầng toàn cầu của họ. Cần làm quen với 2 khái niệm là **Regions** và **Availability Zones (AZs)**
### Regions and AZs
  ::: tip Regions
  Mỗi **Regions** là collection của (min 2 AZs, max 6 AZs, **thường là 3**). Mỗi regions độc lập với các region khác để đảm bảo an toàn khi có thiên tai xảy ra.
  :::
  ![Regions](https://s3-us-west-1.amazonaws.com/corpinfowebsiteuploads/content/uploads/2016/04/25051531/AWS-Global-Infrastructure.jpg)
  ::: tip AZs
  AZs bào gồm 1 hoặc nhiều center riêng biệt, mỗi center có hệ thống điện, làm mát... Chúng được kết nối với nhau và kết nối với mạng với băng thông cao và độ trễ thấp.
  :::
  ![Regions](https://image.slidesharecdn.com/runningsharepointontheawscloudfinalv2-120712124336-phpapp02/95/slide-8-1024.jpg)
  Nên chọn region gần với bạn để giảm độ trễ (latency)

## Saas, Paas, and IaaS
::: tip Modeling
Common cloud computing
models are **Infrastructure as a Service (IaaS)**, **Platform as a Service (PaaS)**, and **Software as a Service (SaaS)**
:::
  - **IaaS**: Provider cung cấp cho bạn phần cứng ảo hóa. VD: AWS EC2, Google Compute Engine (GCE)...
  - **PaaS**: Provider cung cấp dịch vụ dưới dạng flatforms hay tool để phát triển application, bạn không cần quan tâm đến phần cứng, network...
  VD: AWS Elastic Beanstalk, Heroku
  - **SaaS**: Provider cung cấp software hoặc application. VD: Google Apps, Dropbox
  - **On-premises**: là mô hình phần mềm được cài đặt trên server của chính doanh nghiệp, giúp doanh nghiệp toàn quyền kiểm soát.
