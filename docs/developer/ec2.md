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
  ssh -i “ec2-key-pair-name.pem” user@ec2-public-ip-address
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
### 3. Reserved instances

### 4. Dedicated hosts
