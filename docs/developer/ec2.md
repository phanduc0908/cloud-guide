# EC2 instance
> Chúng ta sẽ làm quên với nhưng services:
  - Amazon Elastic Compute Cloud (Amazon EC2)
  - Amazon Lightsail
  - AWS Elastic Beanstalk
  - Amazon Elastic Container Service (Amazon ECS)
  - Amazon Elastic Container Service for Kubernetes (Amazon EKS)
  - AWS Lambda
  - Elastic Block Store (EBS)
  - Elastic Load Balancing (ELB)
  - Auto Scaling Group (ASG)
::: tip Connect EC2 from git bash
  <code>
    ssh -i “ec2-key-pair-name.pem” ec2-user@ec2-public-ip-address
  </code>
  <br>
  Copy file from local to EC2
  <br>
  <code>
    chmod 400 file_pem
    scp -i file_name.pem test.txt ec2-user@54.238.227.150:/home/ec2-user
  </code>
:::
## Pricing for EC2
> AWS cùng cấp 4 option để trả phí với EC2
  - On-demand
  - Spot instances
  - Reserved instances
  - Dedicated hosts
### 1. On-demand
Tùy theo cấu hình EC2 mình chọn, AWS sẽ tính tiền dựa trên những lựa chọn của mình
- Charged tiền theo giờ sử dụng
- Option đắt tiền nhất
### 2. Spot instances
Bạn sẽ bid (đấu thầu) giá **max_price** mà mình muốn trả, pot instance sẽ có **current_price** và current_price này sẽ thay đổi theo thời gian
::: warning AWS sẽ lấy lại spot instance của bạn khi
**max_price** < **current_price**
:::
- Dùng cho những ứng dụng flexible, có thể bị interrupted
### 3. Reserved instances (Đặt cược trước tiền)
Khi bạn chạy những ứng dụng lâu bền, AWS cung cấp reserved instance. 
Bạn có thể trả trước tiền (1 phần, hoặc trả tất), hoặc commit sử dụng lâu dài.
Khi đó AWS sẽ discount giá
### 4. Dedicated hosts
Là thuê luôn phần cứng của AWS
<br>
Keyword gặp trong exam: **compliance requirement** and **use you existing server-bound software licenses**

## EBS
Là network drive, nên có thể attach, detach với 1 EC2 instance