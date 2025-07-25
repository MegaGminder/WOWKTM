# AWS Variables for WoWKTM Marketplace

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "wowktm"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "wowktm.com"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "wowktm_admin"
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "instance_type" {
  description = "EC2 instance type for Elastic Beanstalk"
  type        = string
  default     = "t3.medium"
}

variable "min_size" {
  description = "Minimum number of instances in Auto Scaling group"
  type        = number
  default     = 1
}

variable "max_size" {
  description = "Maximum number of instances in Auto Scaling group"
  type        = number
  default     = 4
}

variable "notification_email" {
  description = "Email for notifications"
  type        = string
  default     = "admin@wowktm.com"
}

# Local variables
locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
