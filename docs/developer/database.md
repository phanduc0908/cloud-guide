# Database on AWS
## AWS RDS
  - Viết tắt của Relational Database Service
  - Là dịch vụ quản lý Database sử dụng SQL
  - Types:
    + Postgres
    + MySQL
    + MariaDB
    + Microsoft SQL Server
    + Aurora (DB của AWS)

  - RDS backup
    + Tự động backup:
      Daily full backup
      Transaction log được back-up bởi RDS mỗi 5'
      => có thể restore lại data
      Dữ liệu sẽ được dữ lại(retention) 7 ngày (có thể tăng lên tối đa là 35 ngày)
    + DB snapshots:
      Thực hiện bởi user
      Retention tùy ý 10 ngày, 1 tháng, 6 tháng ...

  - RDS Storage Auto Scaling
    + Tự động gia tăng storage của RDS DB instance
    + Bạn có thể set **Maximum Storage Threshold**
    + Phù hợp cho ứng dụng không biết trước workload


## RDS Read Replicas vs Multiple AZ
### Read Replicas

![Read](https://cacoo.com/diagrams/2XNdewVsgellO3x8-1506D.png)

Scaling việc read. Read replicas cho phép bạn tạo 1 hoặc nhiều bản copies của DB instance trong chung region hoặc khác region. Handle việc bạn có 1 RDS database phải tiếp nhận nhiều request,RDS instance sẽ **ASYNC replicated** các bản sao khác
- Up to 5 Read Replicas, mỗi Read Replicas có 1 DNS enpoind khác nhau.
- Cross AZ, hoặc cross Region
- Read Replicas có thể promotes thành own DB
- Application cần thay đổi connection string để connect được read replicas

**Use case**
- Business reporting hoặc data warehouse, chúng ta sẽ tạo ra bản sao từ DB production, sau đó thực hiện query để analy
**Cost**
- Nếu trong cùng 1 region thì giá sẽ free
- Nếu cross AZ ở khác region thì AWS sẽ tính phí của bạn

### RDS Multi AZ (Disaster Recovery)
![](https://miro.medium.com/max/1200/1*Tpg2Xo1fIMX-Cz5tzeOZ1g.png)
RDS Multi AZ cung cấp khả năng sẵn sàng cho DB của bạn trong 1 Region. Dữ liệu sẽ được **SYNC replicated** tới các standby insatnce ở AZ khác

Ví dụ: DB instance chính của bạn ở AZs ap-northeast-1a, standby insatnce ở ap-northeast-1d

NOTES:
- SYNC replication
- Sử dụng chung 1 DNS endpoint
- Không sử dụng cho scaling

- Read Replicas có thể setup như là Multi AZ cho Disaster Recovery

### RDS From single AZ to Multi AZ
![](https://miro.medium.com/max/668/1*ewojRDRfLgZW7loOtSR0TQ.png)
- Zero downtime
- Chỉ cần click "modify"
- Các hoạt động:
  + Tạo 1 snapshot
  + DB mới được restored từ snapshot sang AZ mới
  + Synchronyze giữa 2 DB

## RDS Security - Encryption
### Encryption of Data at Rest
Có thể hiểu là encrypt khi tạo DB lần đầu tiên
- Trong khi tạo RDS lần đầu tiên, bạn có thể enable option (xử dụng KMS)
- un-encryption DB => Snapshot => copy snapshot as encrypted => Tạo DB từ snapshot
- **Nếu master KHÔNG được encrypt thì read replicas cũng KHÔNG được encrypt**

### Encryption of Data in Transit
Ecrypt khi giao tiếp giữa DB và Application bằng cách sử dụng SSL/TLS

### Access controll
Sử dụng IAM để quản lý việc truy cập Database Resource của bạn


## Amazon Aurora
Là công nghệ AWS phát triển được tương thích với MySQL và PostgreSQL
- Cả Postgres và MySQL đều được support bởi Aurora DB (Có nghĩa là driver vẫn hoạt động nếu Aurora là Postgres hay MySQL database)
- Aurora là "AWS Cloud optimized", được cho rằng x5 performance so với MySQL trên RDS, x3 Postgres
- Aurora tự động scal storage, bạn không cần phải lo nghĩ đến việc monitor storage
- Aurora có 15 replicas (MySQL có 5)
- Cost cao hơn RDS ~20%

### Aurora High Availability và Read Scaling
![](https://docs.aws.amazon.com/zh_tw/AmazonRDS/latest/AuroraUserGuide/images/AuroraArch001.png)
- 6 bản copies dữ liệu của bạn cross 3 AZ
- 1 Aurora instance take write (master)
- Tự động phục hội < 30s nếu master bị lỗi hay có vấn đề
- Master + upto 15 replicas (for read)
- Hỗ trợ cross Region

### Aurora DB Cluster
![](https://miro.medium.com/max/1100/1*2_cCgfIV0fuBIDSNTcMmQg.png)
Như hình vẽ:
- Cluster volume là 1 "Shared storage volume" có thể expand từ 10G => 64TB
- Cluster endpoint (Writer enpoint) point đến master
- Read enpoint point đến connection Load Balancing các Replicas

### Aurora security
Tương tự với RDS

### Aurora advanced concepts
#### Aurora Replicas - Auto scaling
![](https://image.slidesharecdn.com/trainingaws-module8-rdsauroraelasticache-210907145521/95/training-aws-module-8-rds-aurora-elasticache-21-638.jpg?cb=1631026831)

Khi có nhiều request đến Reader Endpoint dẫm đến việc DB instance tăng CPU usage, do đó cần setup Replicas Auto Scaling. Read Endpoint cũng sẽ tự động extend để cover Replicas mới

#### Aurora Replicas - Custom Endpoint
![](https://www.icode9.com/i/l/?n=20&i=blog/364241/202108/364241-20210802210955333-624922716.png)

Ví dụ như trên hình vẽ, chúng ta có thể tạo ra 2 Custom Endpoint cho DB.rc3 và DB.rc5. Khi request cần cấu hình cao sẽ dùng endpoint của DB.rc5 nếu thấp hơn thì sẽ dùng endpoint của DB.rc3.
#### Aurora Replicas - Serverless
- Tự động scaling dự trên lượng sử dụng thực tế
- Phù hợp với ứng dụng không thường xuyên, hoặc không biết trước được workload
- Không cần có plan về capacity
- Giá cả trả theo giây sử dụng

#### Aurora Replicas - Multi-Master
- Trong trường hợp bạn muốn ngay lập tức chuyển đổi dự phòng (failover) cho writer node (HA)
- Các Read Replicas tự động promote lên Master

#### Global Aurora
![](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/images/aurora-global-databases-conceptual-illo.png)
- **Aurora Cross Region Read Replicas**
  + Hữu ích cho Disaster Recovery (DR)
- Aurora Global Database
  + 1 primary Region (read/write)
  + Up to 5 secondary (**read-only**) region, replication lag < 1s
  + Up to 16 Read Replicas/ mỗi secondary region
  + Giảm thiểu độ trễ
  + Khi có vấn đề ở Primary region, tự động promote region khác với RTO < 1minutes (Recovery Time Objective)


## Amazon ElasticCache
- Elasticache là dịch vụ bộ nhớ đệm được quản lý dành cho Redis và Memcached
- Giúp giảm thiểu thời gian load dữ liệu, vì load từ cache chắc chắn sẽ nhanh hơn
![](https://d1.awsstatic.com/Getting%20Started/Boosting%20Database%20Performance/image001.0660c8da047acc2702ca49a548d4721101f7dd38.png)

### Phân biệt Redis (Remote Dictionary Server) và Memcached
- REDIS:
  + Read Replicas để scale việc đọc, high avaiability
  + có tính năng Backup và restore
- MEMCACHED:
  + Multi-node cho việc phân vùng data, cho phép mở rộng thêm dữ liệu khi nhu cầu tăng lên
  + Memcache không có tính persis. Tức là một khi xóa là xóa hẳn, không có backup
  + Multi-thread