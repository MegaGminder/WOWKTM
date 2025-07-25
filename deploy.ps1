# Deploy WoWKTM to AWS
# This script handles the complete deployment process

# Set variables
$PROJECT_NAME = "wowktm"
$ENVIRONMENT = "prod"
$AWS_REGION = "us-east-1"

Write-Host "Starting WoWKTM AWS Deployment..." -ForegroundColor Green

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check if AWS CLI is installed
try {
    aws --version | Out-Null
    Write-Host "✓ AWS CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ AWS CLI is not installed. Please install it first." -ForegroundColor Red
    exit 1
}

# Check if Terraform is installed
try {
    terraform --version | Out-Null
    Write-Host "✓ Terraform is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Terraform is not installed. Please install it first." -ForegroundColor Red
    exit 1
}

# Check AWS credentials
try {
    aws sts get-caller-identity | Out-Null
    Write-Host "✓ AWS credentials are configured" -ForegroundColor Green
} catch {
    Write-Host "✗ AWS credentials are not configured. Please run 'aws configure'" -ForegroundColor Red
    exit 1
}

# Navigate to infrastructure directory
Set-Location -Path "wowktm\infrastructure\aws"

# Initialize Terraform
Write-Host "Initializing Terraform..." -ForegroundColor Yellow
terraform init

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Terraform initialization failed" -ForegroundColor Red
    exit 1
}

# Plan Terraform deployment
Write-Host "Planning Terraform deployment..." -ForegroundColor Yellow

# Prompt for database password
$DB_PASSWORD = Read-Host -Prompt "Enter database password" -AsSecureString
$DB_PASSWORD_PLAIN = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($DB_PASSWORD))

terraform plan -var="db_password=$DB_PASSWORD_PLAIN"

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Terraform planning failed" -ForegroundColor Red
    exit 1
}

# Ask for confirmation
$confirmation = Read-Host "Do you want to proceed with the deployment? (yes/no)"
if ($confirmation -ne "yes") {
    Write-Host "Deployment cancelled" -ForegroundColor Yellow
    exit 0
}

# Apply Terraform configuration
Write-Host "Applying Terraform configuration..." -ForegroundColor Yellow
terraform apply -var="db_password=$DB_PASSWORD_PLAIN" -auto-approve

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Terraform apply failed" -ForegroundColor Red
    exit 1
}

# Get Terraform outputs
$outputs = terraform output -json | ConvertFrom-Json

Write-Host "Infrastructure deployed successfully!" -ForegroundColor Green
Write-Host "Backend URL: $($outputs.backend_url.value)" -ForegroundColor Cyan
Write-Host "Frontend URL: $($outputs.website_url.value)" -ForegroundColor Cyan
Write-Host "Database Endpoint: $($outputs.rds_endpoint.value)" -ForegroundColor Cyan

# Navigate back to project root
Set-Location -Path "..\..\..\"

# Build and deploy backend
Write-Host "Building and deploying backend..." -ForegroundColor Yellow

Set-Location -Path "wowktm\backend"

# Build the Spring Boot application
./mvnw clean package -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend build failed" -ForegroundColor Red
    exit 1
}

# Upload JAR to S3 for Elastic Beanstalk
$BACKEND_BUCKET = $outputs.logs_bucket_name.value
aws s3 cp target/wowktm-backend-0.0.1-SNAPSHOT.jar s3://$BACKEND_BUCKET/deployments/app.jar

# Deploy to Elastic Beanstalk
$EB_APP_NAME = "$PROJECT_NAME-$ENVIRONMENT"
$EB_ENV_NAME = "$PROJECT_NAME-$ENVIRONMENT"

aws elasticbeanstalk create-application-version `
    --application-name $EB_APP_NAME `
    --version-label "v$(Get-Date -Format 'yyyyMMdd-HHmmss')" `
    --source-bundle S3Bucket=$BACKEND_BUCKET,S3Key=deployments/app.jar

aws elasticbeanstalk update-environment `
    --environment-name $EB_ENV_NAME `
    --version-label "v$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host "Backend deployed successfully!" -ForegroundColor Green

# Navigate back to project root
Set-Location -Path "..\.."

# Build and deploy frontend
Write-Host "Building and deploying frontend..." -ForegroundColor Yellow

Set-Location -Path "wowktm\frontend"

# Install dependencies and build
npm ci
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Frontend build failed" -ForegroundColor Red
    exit 1
}

# Upload to S3
$FRONTEND_BUCKET = $outputs.frontend_bucket_name.value
aws s3 sync dist/ s3://$FRONTEND_BUCKET/ --delete

# Invalidate CloudFront cache
$CLOUDFRONT_ID = $outputs.cloudfront_distribution_id.value
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"

Write-Host "Frontend deployed successfully!" -ForegroundColor Green

# Navigate back to project root
Set-Location -Path "..\.."

Write-Host "🎉 WoWKTM deployment completed successfully!" -ForegroundColor Green
Write-Host "Your marketplace is now live at: $($outputs.website_url.value)" -ForegroundColor Cyan
Write-Host "Backend API is available at: $($outputs.backend_url.value)" -ForegroundColor Cyan

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Set up your custom domain and SSL certificate in AWS Certificate Manager" -ForegroundColor White
Write-Host "2. Update CloudFront distribution to use your custom domain" -ForegroundColor White
Write-Host "3. Configure your DNS to point to CloudFront" -ForegroundColor White
Write-Host "4. Set up monitoring and alerting in CloudWatch" -ForegroundColor White
Write-Host "5. Configure backup strategies for your database" -ForegroundColor White
