# WoWKTM Marketplace - AWS Deployment Guide

## Prerequisites

Before deploying WoWKTM to AWS, ensure you have the following:

1. **AWS Account**: An active AWS account with appropriate permissions
2. **AWS CLI**: Installed and configured with your credentials
3. **Terraform**: Version 1.0 or higher installed
4. **Node.js**: Version 16 or higher for frontend build
5. **Java**: Version 17 or higher for backend build
6. **Maven**: For building the Spring Boot application

## Quick Start Deployment

### 1. Configure AWS Credentials

```powershell
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, region (us-east-1), and output format (json).

### 2. Set Environment Variables

```powershell
$env:TF_VAR_domain_name = "your-domain.com"
$env:TF_VAR_notification_email = "your-email@domain.com"
```

### 3. Run Deployment Script

```powershell
.\deploy.ps1
```

This script will:
- Validate prerequisites
- Deploy infrastructure using Terraform
- Build and deploy the backend to Elastic Beanstalk
- Build and deploy the frontend to S3/CloudFront

## Manual Deployment Steps

### 1. Deploy Infrastructure

```powershell
cd wowktm\infrastructure\aws
terraform init
terraform plan -var="db_password=YourSecurePassword123!"
terraform apply -var="db_password=YourSecurePassword123!"
```

### 2. Deploy Backend

```powershell
cd ..\..\backend
.\mvnw clean package
aws s3 cp target/wowktm-backend-0.0.1-SNAPSHOT.jar s3://your-logs-bucket/deployments/app.jar
```

### 3. Deploy Frontend

```powershell
cd ..\frontend
npm ci
npm run build
aws s3 sync dist/ s3://your-frontend-bucket/
```

## Architecture Overview

The deployment creates the following AWS resources:

### Core Infrastructure
- **VPC**: Custom VPC with public and private subnets
- **Security Groups**: Properly configured security groups
- **NAT Gateway**: For private subnet internet access

### Application Hosting
- **Elastic Beanstalk**: Java application hosting for the backend
- **S3 + CloudFront**: Static website hosting for the frontend
- **Application Load Balancer**: Automatic scaling and health checks

### Database
- **RDS MySQL**: Managed database with automated backups
- **Enhanced Monitoring**: Performance insights enabled

### Authentication
- **Amazon Cognito**: User authentication and authorization
- **User Pool**: For user management
- **Identity Pool**: For AWS resource access

### Storage
- **S3 Buckets**: 
  - Frontend hosting
  - Asset storage (images, files)
  - Application logs

### Monitoring & Security
- **CloudWatch**: Logging and monitoring
- **Enhanced Security**: VPC, Security Groups, Encryption

## Environment Variables

The following environment variables are configured automatically:

### Backend Environment Variables
- `SERVER_PORT`: 5000
- `SPRING_PROFILES_ACTIVE`: prod
- `DB_HOST`: RDS endpoint
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `AWS_REGION`: AWS region
- `S3_ASSETS_BUCKET`: Assets bucket name

### Frontend Environment Variables
Create a `.env.production` file:

```env
VITE_API_BASE_URL=https://your-backend-url.elasticbeanstalk.com/api
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
VITE_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_S3_ASSETS_BUCKET=your-assets-bucket
```

## Post-Deployment Configuration

### 1. Custom Domain Setup

1. **Purchase/Configure Domain**: Register your domain or configure DNS
2. **SSL Certificate**: Request certificate in AWS Certificate Manager
3. **Update CloudFront**: Add custom domain and SSL certificate
4. **DNS Configuration**: Point your domain to CloudFront

### 2. Production Settings

1. **Database Security**: Rotate database password regularly
2. **Cognito Configuration**: Update callback URLs with your domain
3. **CORS Settings**: Update allowed origins in backend
4. **Monitoring**: Set up CloudWatch alarms and notifications

### 3. Security Hardening

1. **IAM Policies**: Review and restrict IAM permissions
2. **Security Groups**: Audit security group rules
3. **VPC**: Configure VPC Flow Logs
4. **Encryption**: Ensure all data is encrypted at rest and in transit

## Monitoring and Maintenance

### Health Checks
- Elastic Beanstalk provides application health monitoring
- RDS has automated monitoring and alerting
- CloudFront provides real-time metrics

### Logging
- Application logs are streamed to CloudWatch
- Access logs are stored in S3
- Database logs are available in RDS console

### Backups
- RDS automated backups (7-day retention)
- S3 versioning enabled for assets
- Regular database snapshots recommended

## Scaling Configuration

### Auto Scaling Settings
- **Minimum Instances**: 1
- **Maximum Instances**: 4
- **Instance Type**: t3.medium (adjustable)
- **Scaling Triggers**: CPU utilization, network traffic

### Database Scaling
- **Storage**: Auto-scaling enabled (20GB to 100GB)
- **Compute**: Vertical scaling available
- **Read Replicas**: Can be added for read-heavy workloads

## Cost Optimization

### Current Configuration Costs (Estimated)
- **Elastic Beanstalk**: ~$30-60/month (t3.medium instances)
- **RDS**: ~$15-25/month (db.t3.micro)
- **S3**: ~$5-10/month (depending on usage)
- **CloudFront**: ~$1-5/month (first 1TB free)
- **NAT Gateway**: ~$32/month
- **Total**: ~$80-130/month

### Cost Optimization Tips
1. Use Reserved Instances for predictable workloads
2. Enable S3 Intelligent Tiering
3. Set up S3 lifecycle policies
4. Monitor and optimize instance sizes
5. Use Spot Instances for development environments

## Troubleshooting

### Common Issues
1. **Deployment Failed**: Check AWS credentials and permissions
2. **Database Connection**: Verify security groups and RDS settings
3. **Frontend Not Loading**: Check S3 bucket policy and CloudFront
4. **API Errors**: Check Elastic Beanstalk logs in CloudWatch

### Support Resources
- AWS Documentation
- Terraform Documentation
- Spring Boot Documentation
- React/Vite Documentation

## Security Considerations

### Data Protection
- All data encrypted at rest
- SSL/TLS for data in transit
- Database credentials stored securely
- Regular security updates

### Access Control
- IAM roles with least privilege
- Cognito for user authentication
- VPC for network isolation
- Security groups for firewall rules

### Compliance
- GDPR considerations for user data
- PCI DSS for payment processing
- Regular security audits recommended

## Next Steps After Deployment

1. **Test Everything**: Thoroughly test all functionality
2. **Performance Tuning**: Monitor and optimize performance
3. **Backup Strategy**: Implement comprehensive backup procedures
4. **Monitoring Setup**: Configure alerts and notifications
5. **Documentation**: Update operational procedures
6. **Team Training**: Ensure team knows how to manage the infrastructure

For support or questions, refer to the AWS documentation or contact your DevOps team.
